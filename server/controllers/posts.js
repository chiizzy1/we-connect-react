const Post = require("../models/Post");
const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");
const User = require("../models/User");


module.exports = {
    getFeed: async (req, res) => {
        try {
          const posts = await Post.find().sort({ createdAt: "desc" }).lean();
          res.send(posts);
        } catch (err) {
          res.send(err);
        }
    },
    getProfile: async (req, res) => {
      try {
        const posts = await Post.find({ user: req.user.id });
        res.send({ posts: posts });
        // console.log(req)
      } catch (err) {
        console.log(err);
      }
    },
    getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.send({ post: post, comments: comments });
    } catch (err) {
      res.send(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.send(`Like added`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.send("Post deleted successfully");
    } catch (err) {
      res.send(err);
    }
  },
}