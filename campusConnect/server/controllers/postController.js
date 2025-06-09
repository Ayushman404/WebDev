const Post = require('../models/post.models.js');
const mongoose = require('mongoose');

exports.createPost = async (req, res) => {
  const post = await Post.create({ content: req.body.content, author: req.user.userId, likes: [] });
  res.json(post);
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