"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const route = (0, express_1.Router)();
// blog create route
route.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.blogValidation.createBlogValidation), blog_controller_1.blogController.createBlog);
// update route
route.patch("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.blogValidation.updateBlogValidation), blog_controller_1.blogController.updateBlog);
// delete route
route.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.blogValidation.updateBlogValidation), blog_controller_1.blogController.deleteBlog);
// get all blogs
route.get("/", blog_controller_1.blogController.getAllBlogs);
exports.BlogRoute = route;
