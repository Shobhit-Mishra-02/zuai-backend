import { Request, Response } from "express";
import User from "../schema/user.schema";

// write your controllers here...

export const greeting = async (req: Request, res: Response) => {
  const users = await User.find({});

  res.status(200).json({
    message: "Hi",
    users,
  });
};
