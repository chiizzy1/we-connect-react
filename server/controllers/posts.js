const Post = require("../models/Post");
// const cloudinary = require("../middleware/cloudinary");
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
        // const posts = await Post.find({ user: req.user.id });
        // res.send({ posts: posts, user: req.user});
        console.log(req.user)
      } catch (err) {
        console.log(err);
      }
    },
    getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.send({ post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
}