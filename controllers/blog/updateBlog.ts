import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../../schema/blog.schema";
import { UserInterface } from "../../types";

const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const user = res.locals.user as UserInterface;

  try {
    const isUserAuthor = await Blog.findOne({
      _id: id,
      author: user._id,
    });

    if (!isUserAuthor) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "You are not the author of this blog",
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({ message: "Blog updated", blog });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default updateBlog;
