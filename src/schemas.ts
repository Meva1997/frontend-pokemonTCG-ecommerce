import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});
export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    userName: z.string().min(1, "Name is required").max(50, "Name is too long"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UserSchema = z.object({
  id: z.number(),
  userName: z.string(),
  email: z.email(),
  isAdmin: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

export const UsersTableSchema = UserSchema.extend({
  confirmed: z.boolean(),
}).array();

export type UsersTable = z.infer<typeof UsersTableSchema>;

export const UpdateAccountSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email address").optional(),
});

//! Success Schema
export const SuccessSchema = z.string();

export type SuccessResponse = z.infer<typeof SuccessSchema>;

//! Error Schema
export const ErrorSchema = z.object({
  error: z.string(),
});
export type ErrorResponse = z.infer<typeof ErrorSchema>;
