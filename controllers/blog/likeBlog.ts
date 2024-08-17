import { Request, Response } from "express";
import Blog from "../../schema/blog.schema";
import { StatusCodes } from "http-status-codes";
import { UserInterface } from "../../types";

const likeBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user as UserInterface;

  try {
    const doesUserAlreadyLiked = await Blog.findOne({
      _id: id,
      usersLiked: user._id,
    });

    if (doesUserAlreadyLiked) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already liked this blog",
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { likeCount: 1 },
        $push: { usersLiked: user._id },
      },
      { new: true }
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default likeBlog;
