const postService = require('../services/postService');

async function followUser(req, res) {
  const targetUserId = req.params.id;
  const { viewerId } = req.body;
  if (!viewerId) return res.status(400).json({ error: 'viewerId required' });
  postService.followUser(viewerId, targetUserId);
  res.status(204).send();
}

async function unfollowUser(req, res) {
  const targetUserId = req.params.id;
  const { viewerId } = req.body;
  if (!viewerId) return res.status(400).json({ error: 'viewerId required' });
  postService.unfollowUser(viewerId, targetUserId);
  res.status(204).send();
}

async function getFollowers(req, res) {
  const userId = req.params.id;
  const followers = postService.getFollowers(userId);
  res.json(followers);
}

async function getFollowing(req, res) {
  const userId = req.params.id;
  const following = postService.getFollowing(userId);
  res.json(following);
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
