"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userCreateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .min(1, { message: "Name must be at least 1 character or more" }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email({
            message: "Email must be in a email format",
        }),
        isBlocked: zod_1.z.boolean().optional().default(false),
    }),
});
exports.userValidation = { userCreateValidation };
