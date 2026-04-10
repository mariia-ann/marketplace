const E164_REGEX = /^\+[1-9]\d{9,14}$/;
const PHONE_CHARS_REGEX = /^[+\d()\-\s]+$/;

export function normalizePhoneToE164(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';

  if (trimmed.startsWith('+')) return `+${digits}`;
  if (digits.length >= 10 && digits.length <= 15) return `+${digits}`;
  return digits;
}

export function isPhoneLike(raw: string) {
  const trimmed = raw.trim();
  return !!trimmed && !trimmed.includes('@') && PHONE_CHARS_REGEX.test(trimmed);
}

export function isE164Phone(raw: string) {
  return E164_REGEX.test(normalizePhoneToE164(raw));
}
