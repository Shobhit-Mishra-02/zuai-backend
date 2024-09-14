import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { loginService } from "../../services/auth.services";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (error as Error).message });
  }
};

export default login;
