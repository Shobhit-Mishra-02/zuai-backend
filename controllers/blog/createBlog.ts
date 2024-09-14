import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createBlogService } from "../../services/blog.services";
import { BlogInterface, UserInterface } from "../../types";

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const user = res.locals.user as UserInterface;
    const blogData: BlogInterface = {
      title,
      content,
      author: user._id as string,
      likeCount: 0,
      usersLiked: [],
    };

    const blog = await createBlogService(blogData);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Blog created", blog });
  } catch (error) {
    next(error);
  }
};

export default createBlog;
