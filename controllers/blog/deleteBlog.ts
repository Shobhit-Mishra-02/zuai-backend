import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../../schema/blog.schema";
import { UserInterface } from "../../types";

const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = res.locals.user as UserInterface;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Blog not found" });
    }

    if (blog.author?.toString() !== user._id?.toString()) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);

    return res.status(StatusCodes.OK).json({ message: "Blog deleted" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default deleteBlog;
