import * as Yup from 'yup';
import { isE164Phone } from '@/src/utils/phone';

/** Buyers need at least one contact; sellers must submit both before OTP verification. */
export const createSignUpSchema = (accountType: 'buyer' | 'seller') =>
  Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Ім’я має містити щонайменше 2 символи')
      .max(50, 'Ім’я занадто довге')
      .required('Ім’я є обов’язковим'),

    email: Yup.string()
      .trim()
      .email('Невірний формат email')
      .when([], {
        is: () => accountType === 'seller',
        then: (schema) => schema.required('Введіть email'),
        otherwise: (schema) => schema.notRequired(),
      }),

    phone: Yup.string()
      .test(
        'phone-e164',
        'Введіть телефон у міжнародному форматі, наприклад +380991234567',
        (value) => !value || isE164Phone(value),
      )
      .when([], {
        is: () => accountType === 'seller',
        then: (schema) => schema.required('Потрібен номер телефону'),
        otherwise: (schema) =>
          schema
            .notRequired()
            .test(
              'buyer-contact-required',
              'Вкажіть email або телефон',
              function (phone) {
                return !!phone || !!this.parent.email;
              },
            ),
      }),

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

export const signUpSchema = createSignUpSchema('buyer');

export type SignupFormValues = Yup.InferType<typeof signUpSchema>;
