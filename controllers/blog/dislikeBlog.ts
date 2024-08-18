import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../../schema/blog.schema";
import { UserInterface } from "../../types";

const dislikeBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user as UserInterface;

  try {
    const doesUserLikedBlog = await Blog.findOne({
      _id: id,
      usersLiked: user._id,
    });

    if (!doesUserLikedBlog) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User didn't like this blog",
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { likeCount: -1 },
        $pull: { usersLiked: user._id },
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({ message: "Blog disliked", blog });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default dislikeBlog;
