import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Comment from "../../schema/comment.schema";

const getCommentPage = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const comments = await Comment.find()
      .limit(limit as number)
      .skip(skip)
      .sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({ comments });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default getCommentPage;
