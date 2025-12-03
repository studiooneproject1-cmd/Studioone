import { z } from "zod";

export const getRegisterSchema = () => {
  return z
    .object({
      first_name: z.string().min(1, "First Name is required"),
      last_name: z.string().min(1, "Last Name is required"),
      email: z
        .string()
        .min(1, "Please enter your email")
        .email("Please enter a valid email"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Confirm password is required"),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }
    );
};

export type RegisterFormType = z.infer<ReturnType<typeof getRegisterSchema>>;
