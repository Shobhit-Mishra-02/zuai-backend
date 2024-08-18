import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Comment from "../../schema/comment.schema";

const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;
  const User = res.locals.user;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Comment not found",
      });
    }

    if (User._id?.toString() !== comment.user?.toString()) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "You are not authorized to update this comment",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { comment, updatedAt: new Date() },
      { new: true }
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
