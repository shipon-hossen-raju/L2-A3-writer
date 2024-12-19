import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { TBlog } from "./blog.interface";
import { blogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { title, content } = req.body;
  const clientData: TBlog = {
    title,
    content,
    author: _id,
  };

  const savedResult = await blogService.createBlogIntoDB(clientData);

  // find user by id

  const result = {
    _id: savedResult?._id,
    title: savedResult?.title,
    content: savedResult?.content,
    author: req.user,
  };

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
