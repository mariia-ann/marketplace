import * as Yup from 'yup';

const phoneRegex = /^\+?[1-9]\d{5,14}$/;
const stripPhone = (v: string) => v.replace(/[()\-\s]/g, '');

export const normalizeIdentifier = (raw: string) => {
  const v = raw.trim();
  const phone = stripPhone(v);
  if (phoneRegex.test(phone)) return phone;
  return v.toLowerCase();
};

export const loginSchema = Yup.object().shape({
  identifier: Yup.string()
    .transform((v) => (v ?? '').trim())
    .required('Введіть email або номер телефону')
    .test(
      'email-or-phone',
      'Введіть коректний email або номер телефону',
      (value) => {
        if (!value) return false;
        const emailOk = Yup.string().email().isValidSync(value);
        const phoneOk = phoneRegex.test(stripPhone(value));
        return emailOk || phoneOk;
      },
    ),
  password: Yup.string()
    .trim()
    .min(6, 'Мінімум 6 символів')
    .required('Введіть пароль'),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
