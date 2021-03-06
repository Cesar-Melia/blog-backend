const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
