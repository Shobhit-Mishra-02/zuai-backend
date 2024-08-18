import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Comment from "../../schema/comment.schema";

const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = res.locals.user;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Comment not found" });
    }

    if (comment.user?.toString() !== user._id?.toString()) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(id);

    return res.status(StatusCodes.OK).json({ message: "Comment deleted" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default deleteComment;
