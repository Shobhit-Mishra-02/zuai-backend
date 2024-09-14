import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getBlogByIdService } from "../../services/blog.services";

const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await getBlogByIdService(id);
    return res.status(StatusCodes.OK).json({ blog });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: (error as Error).message,
    });
  }
};

export default getBlogById;
