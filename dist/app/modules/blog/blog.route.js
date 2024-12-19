"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const route = (0, express_1.Router)();
route.post("/create-blog", blog_controller_1.blogController.createBlog);
exports.blogRoute = route;
