import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Comment from "../../schema/comment.schema";

const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { comment },
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
