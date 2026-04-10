import * as Yup from 'yup';
import {
  isE164Phone,
  isPhoneLike,
  normalizePhoneToE164,
} from '@/src/utils/phone';

export const normalizeIdentifier = (raw: string) => {
  const v = raw.trim();
  if (isPhoneLike(v)) {
    const phone = normalizePhoneToE164(v);
    if (isE164Phone(phone)) return phone;
  }
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
        const phoneOk = isE164Phone(value);
        return emailOk || phoneOk;
      },
    ),
  password: Yup.string()
    .trim()
    .min(6, 'Мінімум 6 символів')
    .required('Введіть пароль'),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
