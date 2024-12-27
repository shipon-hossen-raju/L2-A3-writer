import { Router } from "express";
import { AdminRoute } from "../modules/admin/admin.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { BlogRoute } from "../modules/blog/blog.route";
import { UserRoute } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/",
    route: UserRoute,
  },
  {
    path: "/blogs",
    route: BlogRoute,
  },
  {
    path: "/admin",
    route: AdminRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
