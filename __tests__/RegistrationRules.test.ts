/** Covers buyer/seller contact combinations before creating a pending registration. */
import { createSignUpSchema } from '@/src/features/auth/schemas/signup.schema';

const values = {
  firstName: 'Ada',
  email: '',
  phone: '',
  password: 'secret1',
  repeatPassword: 'secret1',
  acceptTerms: true,
};

describe('mobile registration contact requirements', () => {
  it('allows a buyer to register with only a verified-later email', async () => {
    await expect(
      createSignUpSchema('buyer').validate({
        ...values,
        email: 'ada@example.com',
      }),
    ).resolves.toBeTruthy();
  });

  it('allows a buyer to register with only a verified-later phone', async () => {
    await expect(
      createSignUpSchema('buyer').validate({
        ...values,
        phone: '+390000000001',
      }),
    ).resolves.toBeTruthy();
  });

  it('rejects a buyer without either contact', async () => {
    await expect(createSignUpSchema('buyer').validate(values)).rejects.toThrow(
      'Вкажіть email або телефон',
    );
  });

  it('requires both contacts for a seller', async () => {
    await expect(
      createSignUpSchema('seller').validate({
        ...values,
        email: 'ada@example.com',
      }),
    ).rejects.toThrow('Потрібен номер телефону');
  });

  it('accepts both contacts for a buyer', async () => {
    await expect(
      createSignUpSchema('buyer').validate({
        ...values,
        email: 'ada@example.com',
        phone: '+390000000001',
      }),
    ).resolves.toBeTruthy();
  });

  it('requires email even when a seller supplies a phone', async () => {
    await expect(
      createSignUpSchema('seller').validate({
        ...values,
        phone: '+390000000001',
      }),
    ).rejects.toThrow('Введіть email');
  });

  it('accepts both contacts for a seller', async () => {
    await expect(
      createSignUpSchema('seller').validate({
        ...values,
        email: 'ada@example.com',
        phone: '+390000000001',
      }),
    ).resolves.toBeTruthy();
  });

  it('rejects an invalid optional phone even when a buyer supplies valid email', async () => {
    await expect(
      createSignUpSchema('buyer').validate({
        ...values,
        email: 'ada@example.com',
        phone: '123',
      }),
    ).rejects.toThrow('Введіть телефон у міжнародному форматі');
  });

  it('rejects an invalid optional email even when a buyer supplies valid phone', async () => {
    await expect(
      createSignUpSchema('buyer').validate({
        ...values,
        email: 'invalid-email',
        phone: '+390000000001',
      }),
    ).rejects.toThrow('Невірний формат email');
  });
});
