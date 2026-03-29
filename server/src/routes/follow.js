const express = require('express');
const followController = require('../controllers/followController');

const router = express.Router();

// Follow endpoints (using target user id in path, viewerId in body)
router.post('/api/users/:id/follow', followController.followUser);
router.delete('/api/users/:id/follow', followController.unfollowUser);
router.get('/api/users/:id/followers', followController.getFollowers);
router.get('/api/users/:id/following', followController.getFollowing);

module.exports = router;
