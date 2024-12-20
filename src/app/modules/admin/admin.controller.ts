import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { adminService } from "./admin.service";

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  //   console.log("req ", req);

  const blocked = req.url.split("/").pop();
  if (blocked !== "block") {
    return sendResponse(res, {
      success: false,
      message: "Invalid URL",
      statusCode: statusCode.badRequest,
    });
  }

  // block user
  const user = await adminService.userBlockIntoDB(userId);

  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: statusCode.ok,
  });
});

export const adminController = { blockUser };
