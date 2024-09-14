import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { deleteCommentService } from "../../services/comment.services";

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = res.locals.user;
    await deleteCommentService(id, user._id as string);

    return res.status(StatusCodes.OK).json({ message: "Comment deleted" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default deleteComment;
