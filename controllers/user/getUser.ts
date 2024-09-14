import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserByIdService } from "../../services/user.services";

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default getUser;
