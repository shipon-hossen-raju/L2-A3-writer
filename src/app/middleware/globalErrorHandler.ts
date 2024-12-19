/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import statusCode from "../utils/status.code";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  //setting default values
  let status = err?.statusCode || statusCode.internalServerError;
  let message = "Something went wrong!";
  let error: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    status = err?.statusCode;
    message = err.message;
    error = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    error = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // return
  res.status(status).json({
    success: false,
    message,
    statusCode: status,
    error,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
