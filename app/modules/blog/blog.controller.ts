import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { blogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  console.log("blog called req.body -> ", req.body);

  const result = await blogService.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: "blog create successful",
    statusCode: statusCode.ok,
    data: result,
  });
});

export const blogController = {
  createBlog,
};
