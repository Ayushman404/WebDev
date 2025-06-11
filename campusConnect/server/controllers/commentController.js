const mongoose = require('mongoose');

const Post = require('../models/post.models.js');
const Comment = require('../models/comments.models.js');


exports.getCommentsByPostId = async(req, res)=>{
    try {
        const postId = req.params.postId;
        await Comment.find({postId}).then(result=>{
            return res.json({data: result.map(comment=> comment.text), msg: "Comments Delivered"});
        }).catch(err=>{
            return console.log("Invalid PostId to get Comments", err);
        })
        
    } catch (error) {
        return console.log("Error getting comments", error);
    }
}
exports.postCommentByPostId = async(req, res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.user.userId;

        const comment = await Comment.create({text: req.body.text, author: userId, postId});
        res.json(comment);

    } catch (error) {
        return res.json({msg: "Error posting comments", error})
    }
}

exports.delCommentById = async (req, res) => {
  const userId = req.user.userId;
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    if (comment.author.toString() !== userId) {
      return res.status(403).json({ msg: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
