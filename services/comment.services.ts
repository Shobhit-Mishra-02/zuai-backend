import CommentRepo from "../repository/comment.repo";
import { CommentInterface } from "../types";
import { CommentError } from "../error";
import { StatusCodes } from "http-status-codes";

const commentRepo = new CommentRepo();

export const makeCommentService = async (comment: CommentInterface) => {
  const newComment = await commentRepo.createComment(comment);
  return newComment;
};

export const deleteCommentService = async (
  commentId: string,
  userId: string
) => {
  if (!commentId) {
    throw new CommentError("commentId is required");
  }

  const comment = await commentRepo.getCommentById(commentId);

  if (comment.user !== userId) {
    throw new CommentError("user is not authorized", StatusCodes.UNAUTHORIZED);
  }

  await commentRepo.deleteComment(commentId);
};

export const updateCommentService = async (
  comment: CommentInterface,
  commentId: string,
  userId: string
) => {
  if (!comment) {
    throw new CommentError("comment is required");
  }

  const currentComment = await commentRepo.getCommentById(commentId);

  if (currentComment.user !== userId) {
    throw new CommentError("user is not authorized", StatusCodes.UNAUTHORIZED);
  }

  const newComment = await commentRepo.updateComment(comment, commentId);

  return newComment;
};

export const getCommentPageService = async (page: number, limit: number) => {
  if (page < 0) {
    throw new CommentError("page can not be less than zero");
  }

  const skip = (page - 1) * limit;

  const comments = await commentRepo.getCommentPage(skip, limit);

  return comments;
};
