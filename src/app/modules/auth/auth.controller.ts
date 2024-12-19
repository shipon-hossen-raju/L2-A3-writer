import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { userService } from "../user/user.service";
// import { authService } from "./auth.service";

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

export const authController = {
  registerUser,
};
