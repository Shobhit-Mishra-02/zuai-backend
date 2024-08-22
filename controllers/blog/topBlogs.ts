import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../../schema/blog.schema";

const getTopBlogs = async (req: Request, res: Response) => {
  const { limit = 5 } = req.query;

  try {
    const blogs = await Blog.find()
      .populate("author")
      .limit(Number(limit))
      .sort({ likes: -1 });

    return res.status(StatusCodes.OK).json({ blogs });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default getTopBlogs;
