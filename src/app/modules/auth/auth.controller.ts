import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { userService } from "../user/user.service";
import { authService } from "./auth.service";

// register user
const registerUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);

  if (!result) throw new Error("User Not Created");

  const data = result
    ? {
        _id: result?._id,
        name: result?.name,
        email: result?.email,
      }
    : null;

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: statusCode.created,
    data,
  });
});

// login user
const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    message: "User logged in successfully",
    statusCode: statusCode.ok,
    data: { token: accessToken },
  });
});

export const authController = {
  registerUser,
  loginUser,
};
