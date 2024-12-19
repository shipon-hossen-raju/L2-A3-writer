import { Router } from "express";
import { blogController } from "./blog.controller";

const route = Router();

route.post("/create-blog", blogController.createBlog);

export const blogRoute = route;
