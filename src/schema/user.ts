import { object, ref, string } from "yup";

export const registerUserSchema = object({
  body: object({
    email: string()
      .email("Must be a valid email!")
      .required("Email is required!"),
    password: string()
      .required("Password is required!")
      .min(6, "Password is too short - should be 6 chars minimum."),
  }),
});

export const loginrUserSchema = object({
  body: object({
    email: string().required("Email is required!"),
    password: string().required("Password is required!"),
  }),
});
