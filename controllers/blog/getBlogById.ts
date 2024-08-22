import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../../schema/blog.schema";

const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate('author');
    return res.status(StatusCodes.OK).json({ blog });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default getBlogById;
