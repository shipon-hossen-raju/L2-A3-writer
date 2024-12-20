import { z } from "zod";

const createBlogValidation = z.object({
  body: z.object({
    title: z.string().min(5).max(100),
    content: z.string().min(5).max(1000),
  }),
});

const updateBlogValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const blogValidation = { createBlogValidation, updateBlogValidation };
