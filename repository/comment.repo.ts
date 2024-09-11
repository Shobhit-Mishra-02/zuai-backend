import Comment from "../schema/comment.schema";
import { CommentInterface } from "../types";

class CommentRepo {
  constructor() {}

  async createComment(comment: CommentInterface) {
    const newComment = await Comment.create({
      ...comment,
    });

    return newComment;
  }

  async updateComment(
    comment: Omit<CommentInterface, "id">,
    commentId: string
  ) {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        ...comment,
      },
      {
        new: true,
      }
    );

    return updatedComment;
  }

  async deleteComment(commentId: string) {
    await Comment.findByIdAndDelete(commentId);
  }

  async getCommentPage(skip: number = 0, limit: number = 5) {
    const comments = await Comment.find()
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      })
      .populate("user");

    return comments;
  }
}

export default CommentRepo;
