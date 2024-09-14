import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { updateUserService } from "../../services/user.services";
import { UserInterface } from "../../types";

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = res.locals.user as UserInterface;
    let { email, password, firstName, lastName, bio } = req.body;

    const updatedUser = {
      email,
      password,
      firstName,
      lastName,
      bio,
      updatedAt: new Date(),
    } as UserInterface;

    const newUser = await updateUserService(
      updatedUser,
      id,
      user._id as string
    );

    return res.status(StatusCodes.OK).json(newUser);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default updateUser;
