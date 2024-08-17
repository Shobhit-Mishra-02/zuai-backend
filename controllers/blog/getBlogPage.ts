import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../../schema/blog.schema";

const getBlogPage = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const totalBlogCount = await Blog.countDocuments();
    const blogs = await Blog.find()
      .limit(Number(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    return res.status(StatusCodes.OK).json({ blogs, totalBlogCount });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default getBlogPage;
