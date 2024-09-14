import { json, urlencoded } from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction } from "express";
import morgan from "morgan";
import router from "./router/app.route";
import { CustomError } from "./error";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

dotenv.config();

const app = express();

// adding middlewares
app.use(json());
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));

// adding your routes here..
app.use("/", router);

app.use(
  (
    err: CustomError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let message = "something went wrong";
    let name = "";
    let code = StatusCodes.INTERNAL_SERVER_ERROR;

    if (err instanceof CustomError) {
      message = err.message;
      name = err.name;
      code = err.statusCode;
    }

    if (err instanceof Error) {
      message = err.message;
    }

    res.status(code).json({ message, name });
  }
);

export default app;
