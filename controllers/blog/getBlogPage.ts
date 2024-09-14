import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getBlogPageService,
  getTotalBlogsCountService,
} from "../../services/blog.services";

const getBlogPage = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const totalBlogCount = await getTotalBlogsCountService();
    const blogs = await getBlogPageService(+page, +limit);

    return res.status(StatusCodes.OK).json({ blogs, totalBlogCount });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default getBlogPage;
