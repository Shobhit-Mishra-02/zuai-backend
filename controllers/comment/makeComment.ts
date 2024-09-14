import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { makeCommentService } from "../../services/comment.services";
import { CommentInterface } from "../../types";

const makeComment = async (req: Request, res: Response) => {
  try {
    const { comment, blog } = req.body;
    const user = res.locals.user;
    const commentData = {
      comment,
      blog,
      user: user._id,
    };

    const newComment = await makeCommentService(
      commentData as CommentInterface
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Comment created",
      newComment,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default makeComment;
