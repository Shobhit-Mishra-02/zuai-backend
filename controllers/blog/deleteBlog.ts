import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { deleteBlogService } from "../../services/blog.services";
import { UserInterface } from "../../types";

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = res.locals.user as UserInterface;
    const result = await deleteBlogService(id, user._id as string);
    return res.status(StatusCodes.OK).json({ message: "Blog deleted", result });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default deleteBlog;
