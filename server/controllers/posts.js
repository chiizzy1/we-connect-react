const Post = require("../models/Post");
// const cloudinary = require("../middleware/cloudinary");
// const Comment = require("../models/Comment");
// const User = require("../models/User");


module.exports = {
    getFeed: async (req, res) => {
        try {
          const posts = await Post.find().sort({ createdAt: "desc" }).lean();
          res.send(posts);
        } catch (err) {
          res.send(err);
        }
      },
}