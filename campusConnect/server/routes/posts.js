const express = require('express');
const { createPost, getPosts, getPostsByUser, getPostById, delPostById, handleLike } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/', getPosts);
router.get('/user/:userId', getPostsByUser);
router.get('/:postId', getPostById);
router.post('/:postId/like', verifyToken, handleLike);
router.delete('/:postId', verifyToken, delPostById);

module.exports = router;
