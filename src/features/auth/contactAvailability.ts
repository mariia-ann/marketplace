import { normalizePhoneToE164 } from '@/src/utils/phone';

export type ContactChannel = 'email' | 'phone';
export type ContactCheck = {
  value: string;
  status: 'checking' | 'available' | 'unavailable' | 'unknown';
};
export type ContactChecks = Partial<Record<ContactChannel, ContactCheck>>;
export type RegistrationContacts = {
  email?: string | null;
  phone?: string | null;
};

/** Availability is advisory and distinct from proving contact ownership by OTP. */
export const normalizeRegistrationContact = (
  channel: ContactChannel,
  value?: string | null,
) =>
  channel === 'email'
    ? (value || '').trim().toLowerCase()
    : normalizePhoneToE164(value || '');

/** Only a confirmed conflict for the current value blocks a locally valid form. */
export function contactAvailabilityError(
  channel: ContactChannel,
  value: string | null | undefined,
  checks: ContactChecks,
) {
  const normalized = normalizeRegistrationContact(channel, value);
  const check = checks[channel];
  if (
    !normalized ||
    check?.value !== normalized ||
    check.status !== 'unavailable'
  )
    return undefined;
  return channel === 'email'
    ? 'Цей email уже пов’язаний з акаунтом. Увійдіть або вкажіть інший.'
    : 'Цей телефон уже пов’язаний з акаунтом. Увійдіть або вкажіть інший.';
}

/** Unknown, pending, and failed checks leave the final decision to the registration API. */
export function canSubmitRegistration(
  formValid: boolean,
  submitting: boolean,
  contacts: RegistrationContacts,
  checks: ContactChecks,
) {
  return (
    formValid &&
    !submitting &&
    !contactAvailabilityError('email', contacts.email, checks) &&
    !contactAvailabilityError('phone', contacts.phone, checks)
  );
}
