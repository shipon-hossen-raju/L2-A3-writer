import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

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
    statusCode: 200,
    data: result,
  });
});

export const userController = {
  createUser,
};
