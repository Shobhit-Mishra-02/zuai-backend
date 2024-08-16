import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
