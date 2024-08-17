import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Comment from "../../schema/comment.schema";

const makeComment = async (req: Request, res: Response) => {
  const { comment, blog } = req.body;
  const user = res.locals.user;

  try {
    const newComment = await Comment.create({
      comment,
      blog,
      user: user._id,
    });

    return res.status(StatusCodes.CREATED).json({
      message: "Comment created",
      comment: newComment,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default makeComment;
