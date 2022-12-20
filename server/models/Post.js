const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  likes: {
    type: [],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Post", PostSchema);