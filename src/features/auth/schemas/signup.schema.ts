import * as Yup from 'yup';
import { isE164Phone } from '@/src/utils/phone';

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Ім’я має містити щонайменше 2 символи')
    .max(50, 'Ім’я занадто довге')
    .required('Ім’я є обов’язковим'),

  email: Yup.string()
    .trim()
    .email('Невірний формат email')
    .required('Введіть email'),

  phone: Yup.string()
    .test(
      'phone-e164',
      'Введіть телефон у міжнародному форматі, наприклад +380991234567',
      (value) => !!value && isE164Phone(value),
    )
    .required('Потрібен номер телефону'),

  password: Yup.string()
    .trim()
    .min(6, 'Мінімум 6 символів')
    .required('Введіть пароль'),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароль не співпадає')
    .required('Повторіть пароль'),
  acceptTerms: Yup.boolean()
    .oneOf([true], 'Потрібно прийняти умови')
    .required(),
});

export type SignupFormValues = Yup.InferType<typeof signUpSchema>;
