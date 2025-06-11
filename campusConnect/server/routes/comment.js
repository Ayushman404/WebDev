const express = require('express');
const { getCommentsByPostId, postCommentByPostId, delCommentById} = require('../controllers/commentController.js');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:postId', getCommentsByPostId);
router.post('/:postId',verifyToken,  postCommentByPostId);
router.delete('/:commentId', verifyToken, delCommentById);



module.exports = router;