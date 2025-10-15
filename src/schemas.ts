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
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
});

export const CreateUserSchema = z.object({
  userName: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  isAdmin: z.boolean(),
});

export const ProductsSchema = z.object({
  id: z.coerce.number(), // Convertir a número
  name: z.string(),
  description: z.string(),
  image: z.string(),
  stock: z.coerce.number(),
  price: z.coerce.number(),
  categoryId: z.coerce.number(),
  createdAt: z.string().optional(),
});

export type Product = z.infer<typeof ProductsSchema>;

export const AllProductsSchema = ProductsSchema.array();

export type ProductsArrayType = z.infer<typeof AllProductsSchema>;

export const UpdateProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().min(1, "Description is required"),
  image: z.url("Image must be a valid URL"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"), // ✅ Validar que sea mayor a 0
  categoryId: z.coerce.number().min(1, "Category is required"),
});

export const CategoriesSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    parentId: z.number().nullable(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .array();

export type Category = z.infer<typeof CategoriesSchema>;

export const PasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  userName: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
  isAdmin: z.boolean(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

export const UpdateUserBackendSchema = z.object({
  id: z.number(),
  userName: z.string(),
  email: z.email(),
  isAdmin: z.boolean(),
});

export type UpdateUserBackendData = z.infer<typeof UpdateUserBackendSchema>;

//! Success Schema
export const SuccessSchema = z.string();

export type SuccessResponse = z.infer<typeof SuccessSchema>;

//! Error Schema
export const ErrorSchema = z.object({
  error: z.string(),
});
export type ErrorResponse = z.infer<typeof ErrorSchema>;
