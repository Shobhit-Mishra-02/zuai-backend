import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class UserError extends CustomError {
  constructor(
    message: string,
    code: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, "UserError", code);
  }
}

export class CommentError extends CustomError {
  constructor(
    message: string,
    code: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, "CommentError", code);
  }
}

export class BlogError extends CustomError {
  constructor(
    message: string,
    code: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, "BlogError", code);
  }
}

export class AuthError extends CustomError {
  constructor(
    message: string,
    code: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, "AuthError", code);
  }
}
