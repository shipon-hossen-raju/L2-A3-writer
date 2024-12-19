import { z } from "zod";

const userCreateValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, { message: "Name must be at least 1 character or more" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({
        message: "Email must be in a email format",
      }),
    isBlocked: z.boolean().optional().default(false),
  }),
});

export const userValidation = { userCreateValidation };
