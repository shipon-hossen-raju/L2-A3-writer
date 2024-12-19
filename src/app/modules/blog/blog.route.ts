import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { blogController } from "./blog.controller";
import validateRequest from "../../middleware/validateRequest";
import { blogValidation } from "./blog.validation";

const route = Router();

route.post(
  "/blogs",
  auth(USER_ROLE.user),
  validateRequest(blogValidation.createBlogValidation),
  blogController.createBlog,
);

export const blogRoute = route;
