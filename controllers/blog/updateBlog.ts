import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../../schema/blog.schema";
import { UserInterface } from "../../types";

const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const user = res.locals.user as UserInterface;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Blog not found" });
    }

    if (user._id?.toString() !== blog.author?.toString()) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to update this blog" });
    }

    const newblog = await Blog.findByIdAndUpdate(
      id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "Blog updated", newblog });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default updateBlog;
