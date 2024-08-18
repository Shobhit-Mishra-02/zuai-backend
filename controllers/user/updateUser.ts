import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../schema/user.schema";
import bcrypt from "bcrypt";
import { UserInterface } from "../../types";

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user as UserInterface;
  let { email, password, firstName, lastName, bio } = req.body;

  if (user._id?.toString() !== id) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not authorized to update this user" });
  }

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  try {
    const newUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        password,
        firstName,
        lastName,
        bio,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json(newUser);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default updateUser;
