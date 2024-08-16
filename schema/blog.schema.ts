import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  likeCount: { type: Number, default: 0 },
  usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
