"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const blog_route_1 = require("../modules/blog/blog.route");
const auth_route_1 = require("../modules/auth/auth.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/",
        route: auth_route_1.AuthRoute,
    },
    {
        path: "/",
        route: user_route_1.UserRoute,
    },
    {
        path: "/blogs",
        route: blog_route_1.blogRoute,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
