import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../schema/user.schema";
import { StatusCodes } from "http-status-codes";
import { UserInterface } from "../types";

const authMiddelWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const decodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as UserInterface;

    const user = await User.findById(decodedUser._id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.locals.user = user;

    const refreshToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    res.setHeader("Authorization", refreshToken);

    next();
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default authMiddelWare;
