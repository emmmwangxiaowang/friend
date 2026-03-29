const postService = require('../services/postService');

async function createPost(req, res) {
  const { text, images, audio, anonymous, tags, authorId } = req.body || {};
  const post = postService.createPost({ text, images, audio, anonymous, tags, authorId });
  res.status(201).json(post);
}

async function getPost(req, res) {
  const { id } = req.params;
  const post = postService.getPost(id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  // include basic metadata and counts
  res.json({ ...post, likesCount: post.likes.length, commentsCount: post.comments.length, },);
}

async function deletePost(req, res) {
  const { id } = req.params;
  const requesterUserId = req.body?.requesterId || null;
  const ok = postService.deletePost(id, requesterUserId);
  if (!ok) return res.status(403).json({ error: 'Not allowed to delete' });
  res.status(204).send();
}

async function likePost(req, res) {
  const { id } = req.params;
  const { userId } = req.body;
  const post = postService.likePost(id, userId);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json({ id: post.id, likes: post.likes.length });
}

async function unlikePost(req, res) {
  const { id } = req.params;
  const { userId } = req.body;
  const post = postService.unlikePost(id, userId);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json({ id: post.id, likes: post.likes.length });
}

async function addComment(req, res) {
  const { id } = req.params;
  const { userId, text } = req.body;
  const c = postService.addComment(id, { userId, text });
  if (!c) return res.status(404).json({ error: 'Post not found' });
  res.status(201).json(c);
}

async function getComments(req, res) {
  const { id } = req.params;
  const { page = 1, perPage = 10 } = req.query;
  const list = postService.getComments(id, Number(page), Number(perPage));
  res.json(list);
}

async function sharePost(req, res) {
  const { id } = req.params;
  const post = postService.sharePost(id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json({ id: post.id, shares: post.shares });
}

async function getFeed(req, res) {
  const { userId, type, topic } = req.query;
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 20);
  const feed = await postService.getFeed({ userId, type: type || 'following', topic, page, perPage });
  res.json(feed);
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
  getFeed,
};
