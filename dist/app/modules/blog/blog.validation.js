"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5).max(100),
        content: zod_1.z.string().min(5).max(1000),
    }),
});
const updateBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
    }),
});
exports.blogValidation = { createBlogValidation, updateBlogValidation };
