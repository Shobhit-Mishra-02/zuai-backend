import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../schema/user.schema";
import { UserInterface } from "../../types";

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  let user: UserInterface;
  try {
    if (!id) {
      user = res.locals.user as UserInterface;
      return res.status(StatusCodes.OK).json(user);
    }

    user = (await User.findById(id)) as UserInterface;
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default getUser;
