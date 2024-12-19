import { NextFunction, Request, Response } from "express";
import statusCode from "../utils/status.code";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err.message || "Something went wrong!";

  res.status(statusCode.internalServerError).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
