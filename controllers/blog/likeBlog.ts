import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { likeBlogService } from "../../services/blog.services";
import { UserInterface } from "../../types";

const likeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = res.locals.user as UserInterface;
    const blog = await likeBlogService(id, user._id as string);
    return res.status(StatusCodes.OK).json({ message: "Blog liked", blog });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default likeBlog;
