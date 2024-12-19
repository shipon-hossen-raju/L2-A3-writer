import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  console.log("blog called req.body -> ", req.body);

  const result = await blogService.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: "blog create successful",
    statusCode: 200,
    data: result,
  });
});

export const blogController = {
  createBlog,
};
