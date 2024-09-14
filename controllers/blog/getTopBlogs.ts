import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getTopBlogsService } from "../../services/blog.services";

const getTopBlogs = async (req: Request, res: Response) => {
  try {
    const { limit = 5 } = req.query;
    const blogs = await getTopBlogsService(+limit);
    return res.status(StatusCodes.OK).json({ blogs });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default getTopBlogs;
