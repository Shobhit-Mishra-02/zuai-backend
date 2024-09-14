import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { updateCommentService } from "../../services/comment.services";
import { CommentInterface } from "../../types";

const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const User = res.locals.user;
    const updatedComment = await updateCommentService(
      {
        comment,
        updatedAt: new Date(),
      } as CommentInterface,
      id,
      User._id as string
    );

    return res.status(StatusCodes.OK).json({
      message: "Comment updated",
      comment: updatedComment,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default updateComment;
