import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../../schema/blog.schema";
import { UserInterface } from "../../types";

const createBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const user = res.locals.user as UserInterface;

  try {
    const blog = await Blog.create({
      title,
      content,
      author: user._id,
      likeCount: 0,
      usersLiked: [],
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Blog created", blog });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default createBlog;
