import { Field } from "node_modules/react-hook-form/dist/types";
import { z } from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
  username: z.string().min(2, {message:'Too short'}),
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be atleast 8 chracters'})
});

export const SigninValidation = z.object({
 
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 chracters" }),
});

export const PostValidation = z.object({
 caption: z.string().min(5).max(2200),
 file: z.custom<File[]>(),
 location: z.string().min(2).max(100),
 tag: z.string(),
});
