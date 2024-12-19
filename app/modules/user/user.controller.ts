import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";

const createUser = catchAsync(async (req, res) => {
  console.log("user called req.body -> ", req.body);
  const clientData = {
    ...req.body,
    role: "user",
  };
  const result = await userService.createUserIntoDB(clientData);

  sendResponse(res, {
    success: true,
    message: "user create successful",
    statusCode: statusCode.ok,
    data: result,
  });
});

export const userController = {
  createUser,
};
