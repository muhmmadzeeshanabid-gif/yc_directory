import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long (maximum 100 characters)"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description is too long (maximum 500 characters)"),
  category: z.string().min(3, "Category must be at least 3 characters").max(20, "Category name is too long! Please use a shorter word (maximum 20 characters)"),
  link: z.string().url("Please enter a valid image URL"),
  pitch: z.string().min(10, "Your pitch must be at least 10 characters long"),
});
