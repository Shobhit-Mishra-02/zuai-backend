import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getCommentPageService } from "../../services/comment.services";

const getCommentPage = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const comments = await getCommentPageService(+page, +limit);

    return res.status(StatusCodes.OK).json({ comments });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default getCommentPage;
