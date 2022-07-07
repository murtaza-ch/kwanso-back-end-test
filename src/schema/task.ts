import { object, string } from "yup";

export const taskSchema = object({
  body: object({
    name: string()
      .required("Task Name is required!")
      .min(16, "Body is too short - should be 16 chars minimum."),
  }),
});
