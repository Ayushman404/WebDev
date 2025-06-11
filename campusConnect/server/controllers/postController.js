const Post = require('../models/post.models.js');
const mongoose = require('mongoose');

exports.createPost = async (req, res) => {
  try {
    console.log("Post creation started");
    const post = await Post.create({ content: req.body.content, author: req.user.userId, likes: [] });
    console.log(post);
    return res.status(201).json({ success: true, msg: "Post created" });
  } catch (error) {
    console.error(error)
    return res.status(400).json({ success: false, msg: "Something went wrong" });
  }
  
  

};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'name');
  res.json(posts);
};

exports.getPostsByUser = async (req, res)=>{
  const userId = req.params.userId;
  const objectId = new mongoose.Types.ObjectId(userId);
  const userPosts = await Post.find({ author: objectId });

  if(!userPosts){
    return res.status(404).json({msg: "User Not Found"});
  }
  res.json(userPosts);
};

exports.getPostById = async (req, res)=>{
  try {
    const postId = req.params.postId;
    const post = await Post.find({_id: postId});
  
    if(!post) return res.json({msg: "Invalid Post Id"});
  
    res.json(post);
  } catch (error) {
    res.status(401).json({msg: "Something went wrong",error});
  }
};

exports.delPostById = async (req, res)=>{
  const userId = req.user.userId;
  const postId = req.params.postId;

  const post = await Post.findOne({_id: postId});
  // console.log(post);

  if(!post) return res.json({msg: "Invalid postId"});

  if(userId === post.author.toString()){
    await Post.findByIdAndDelete(postId)
    .then(deletedDocument => {
      if (deletedDocument) {
        return console.log('Post deleted:', deletedDocument);
      } else {
        return console.log('Post not found');
      }
   })
    .catch(error => {
      return console.error('Error deleting Post:', error);
  });
  }
  else{
    return res.json({msg: "Only the author can delete the Post"});
  }

  
};

exports.handleLike = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.postId;

    const post = await Post.findById(postId);

console.log("Post found:", post);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      const updatedPost = await Post.findByIdAndUpdate(postId, {
        $pull: { likes: userId }
      }, {new: true});
      console.log('Likes after update:', updatedPost.likes);
      return res.status(200).json({
        msg: alreadyLiked ? "Post unliked" : "Post liked",
        likes: updatedPost.likes, // send updated likes
      });
    } else {
      // Like
      const updatedPost = await Post.findByIdAndUpdate(postId, {
        $addToSet: { likes: userId } // avoid duplicates
      }, {new: true});
      console.log('Likes after update:', updatedPost.likes);
      return res.status(200).json({
        msg: alreadyLiked ? "Post unliked" : "Post liked",
        likes: updatedPost.likes, // send updated likes
      });
    }
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};