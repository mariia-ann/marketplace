import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Невірний формат email")
    .required("Введіть email"),

  password: Yup.string()
    .trim()
    .min(6, "Мінімум 6 символів")
    .required("Введіть пароль"),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
