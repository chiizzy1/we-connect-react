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
    } catch (error) {
      res.status(500).json(error);
    }
  },

  likePost: async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
      const post = await Post.findById(id);
      if (post.likes.includes(userId)) {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post disliked");
      } else {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deletePost: async (req, res) => {
    const id = req.params.id;
    // const { userId } = req.body;
    try {
      // Find post by id
      let post = await Post.findById(id);
      // Delete post from db
      await cloudinary.uploader.destroy(post.cloudinaryId);
      await post.deleteOne();
      res.status(200).json("Post deleted.");
      
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createPost: async (req, res) => {

    const { text, image, userName } = req.body;
    // const newPost = new Post(req.body);

    try {
      if (image){
        const result = await cloudinary.uploader.upload(image);

        if(result){
          await Post.create({
            text: text,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            likes: [],
            user: req.user.id,
            createdBy: userName,
          });
          
        }
      }
      res.status(200).json("post created successful");
    } catch (error) {
      res.status(500).json(error);
    }
  },
}