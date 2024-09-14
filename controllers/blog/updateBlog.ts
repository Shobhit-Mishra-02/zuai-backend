import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { updateBlogService } from "../../services/blog.services";
import { BlogInterface, UserInterface } from "../../types";

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const user = res.locals.user as UserInterface;
    const blogData = {
      title,
      content,
      updatedAt: new Date(),
    } as Omit<BlogInterface, "id">;

    const newblog = await updateBlogService(blogData, id, user._id as string);
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
