import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../schema/user.schema";

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default getUser;
