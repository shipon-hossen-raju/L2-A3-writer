import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { blogRoute } from "../modules/blog/blog.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { AdminRoute } from "../modules/admin/admin.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: AuthRoute,
  },
  {
    path: "/",
    route: UserRoute,
  },
  {
    path: "/blogs",
    route: blogRoute,
  },
  {
    path: "/admin",
    route: AdminRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
