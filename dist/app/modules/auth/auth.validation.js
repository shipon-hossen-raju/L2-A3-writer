"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email({
            message: "Email must be in a email format",
        }),
        password: zod_1.z
            .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
            .min(6, { message: "Password must be at least 6 characters or more" }),
    }),
});
exports.authValidation = { loginUserValidation };
