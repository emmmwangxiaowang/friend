const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Posts
router.post('/api/posts', postController.createPost);
router.get('/api/posts', postController.getFeed);
router.get('/api/posts/:id', postController.getPost);
router.delete('/api/posts/:id', postController.deletePost);

// Engagement
router.post('/api/posts/:id/like', postController.likePost);
router.delete('/api/posts/:id/like', postController.unlikePost);
router.post('/api/posts/:id/comments', postController.addComment);
router.get('/api/posts/:id/comments', postController.getComments);
router.post('/api/posts/:id/share', postController.sharePost);

module.exports = router;
