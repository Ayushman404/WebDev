const express = require('express');
const { createPost, getPosts, getPostsByUser, getPostById, delPostById } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createPost);
router.get('/', getPosts);
router.get('/user/:userId', getPostsByUser);
router.get('/:postId', getPostById);
router.delete('/:postId', verifyToken, delPostById);

module.exports = router;
