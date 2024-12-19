import { z } from "zod";

const createBlogValidation = z.object({
  body: z.object({
    title: z.string().min(5).max(100),
    content: z.string().min(5).max(1000),
  }),
});

export const blogValidation = { createBlogValidation };
