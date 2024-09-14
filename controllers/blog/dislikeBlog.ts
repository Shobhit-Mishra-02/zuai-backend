import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { dislikeBlogService } from "../../services/blog.services";
import { UserInterface } from "../../types";

const dislikeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = res.locals.user as UserInterface;
    const blog = await dislikeBlogService(id, user._id as string);
    return res.status(StatusCodes.OK).json({ message: "Blog disliked", blog });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default dislikeBlog;
