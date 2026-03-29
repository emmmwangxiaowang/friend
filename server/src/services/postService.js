const { generateId } = require('../utils/id');
const redisClient = require('../cache/redisClient');

// In-memory stores (fallback if no DB is wired up in tests)
const posts = []; // posts collection
const comments = []; // comments collection

// Simple follow store: map of followerId -> Set(followingUserIds)
const follows = new Map();

function _now() { return Date.now(); }

function createPost({ text, images = [], audio = null, anonymous = false, tags = [], authorId = null }) {
  const id = generateId('post');
  const post = {
    id,
    text,
    images,
    audio,
    anonymous: Boolean(anonymous),
    tags,
    authorId: anonymous ? null : authorId,
    createdAt: _now(),
    likes: [], // userIds
    shares: 0,
    comments: [], // comment IDs
  };
  posts.unshift(post);
  return post;
}

function getPost(id) {
  return posts.find(p => p.id === id) || null;
}

function deletePost(id, requesterUserId) {
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return false;
  const post = posts[idx];
  // Basic authorization check: allow delete if requester is author or anonymous with no author
  const isOwner = post.authorId === requesterUserId;
  if (!isOwner) return false;
  posts.splice(idx, 1);
  // remove related comments
  for (let i = comments.length - 1; i >= 0; i--) {
    if (comments[i].postId === id) comments.splice(i, 1);
  }
  return true;
}

function likePost(postId, userId) {
  const post = getPost(postId);
  if (!post) return null;
  if (!post.likes.includes(userId)) post.likes.push(userId);
  return post;
}

function unlikePost(postId, userId) {
  const post = getPost(postId);
  if (!post) return null;
  post.likes = post.likes.filter(id => id !== userId);
  return post;
}

function addComment(postId, { userId, text }) {
  const post = getPost(postId);
  if (!post) return null;
  const id = generateId('comment');
  const c = { id, postId, userId, text, createdAt: _now() };
  comments.unshift(c);
  post.comments.push(id);
  return c;
}

function getComments(postId, page = 1, perPage = 10) {
  const list = comments.filter(c => c.postId === postId).sort((a, b) => a.createdAt - b.createdAt);
  const start = (page - 1) * perPage;
  return list.slice(start, start + perPage);
}

function sharePost(postId) {
  const post = getPost(postId);
  if (!post) return null;
  post.shares += 1;
  return post;
}

function followUser(followerId, targetUserId) {
  if (!follows.has(followerId)) follows.set(followerId, new Set());
  follows.get(followerId).add(targetUserId);
  return true;
}

function unfollowUser(followerId, targetUserId) {
  if (!follows.has(followerId)) return false;
  follows.get(followerId).delete(targetUserId);
  return true;
}

function getFollowing(userId) {
  const set = follows.get(userId);
  return set ? Array.from(set) : [];
}

function getFollowers(userId) {
  const followersList = [];
  for (const [follower, followingSet] of follows.entries()) {
    if (followingSet.has(userId)) followersList.push(follower);
  }
  return followersList;
}

// Feed generation with recency + engagement scoring, with simple topic filter and following filter
function _computeScore(post) {
  const now = Date.now();
  const ageSec = Math.max(1, (now - post.createdAt) / 1000);
  const recency = Math.max(0, 1 - ageSec / 86400); // within 1 day gives ~1, decays with age
  const engagement = (post.likes.length || 0) * 1.0 + (post.comments.length || 0) * 1.5 + (post.shares || 0) * 0.5;
  return recency * 0.7 + Math.min(engagement / 10, 1) * 0.3; // normalized score 0-1
}

async function getFeed({ userId, type = 'following', topic, page = 1, perPage = 20 }) {
  // If following feed, try cache first
  const cacheKey = `feed:following:${userId}:page:${page}:perPage:${perPage}`;
  if (type === 'following' && userId) {
    const cached = await redisClient.get(cacheKey);
    if (cached) return cached;
  }

  let pool = [];
  if (type === 'following' && userId) {
    const following = new Set(getFollowing(userId));
    pool = posts.filter(p => following.has(p.authorId)).slice();
  } else if (type === 'topic' && topic) {
    pool = posts.filter(p => p.tags && p.tags.includes(topic));
  } else {
    // discovery/default: all posts
    pool = posts.slice();
  }

  // Topic filter fallback
  if (topic && pool.length > 0) {
    pool = pool.filter(p => p.tags && p.tags.includes(topic));
  }

  // Score and sort by score then recency
  const scored = pool.map(p => ({ post: p, score: _computeScore(p) }));
  scored.sort((a, b) => b.score - a.score || b.post.createdAt - a.post.createdAt);

  const start = (page - 1) * perPage;
  const pageSlice = scored.slice(start, start + perPage).map(x => x.post);

  if (type === 'following' && userId) {
    try {
      await redisClient.set(cacheKey, pageSlice, 60); // 60 seconds ttl
    } catch (_) {
      // ignore cache writes
    }
  }

  return pageSlice;
}

module.exports = {
  createPost,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getComments,
  sharePost,
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  getFeed,
};
