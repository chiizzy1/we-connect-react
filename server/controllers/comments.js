const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id
      });
      console.log("Comment has been added!");
      res.send("comment added successfuly");
    } catch (err) {
      console.log(err);
    }
  },
};