import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { blogRoute } from "../modules/blog/blog.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: UserRoute,
  },
  {
    path: "/",
    route: blogRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
