import { api, refreshApi } from '@/assets/lib/api';
import type { RegistrationState } from './registration';
import type { ContactChannel } from './contactAvailability';

export type LoginDto = {
  identifier: string;
  password: string;
};

export type SignupDto = {
  firstName: string;
  phone?: string;
  email?: string;
  password: string;
  isSeller: boolean;
};

export type SendPhoneOtpDto = {
  phone: string;
};

export type VerifyPhoneOtpDto = {
  phone: string;
  code: string;
};

export type SendEmailOtpDto = {
  email: string;
};

export type VerifyEmailOtpDto = {
  email: string;
  code: string;
};

/** Mobile sessions return JSON tokens plus the authoritative registration/navigation state. */
export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  registrationState: RegistrationState;
  isEmailValidated: boolean;
  isPhoneValidated: boolean;
};

export type SignupResponse = {
  message: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  registrationState: RegistrationState;
};

export type OTPResponse = {
  ok: boolean;
  devHint?: string;
  message?: string;
};

export type VerifyOTPResponse = {
  ok: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  userId?: string;
  registrationState?: RegistrationState;
};

export type getUserByIdRepsonse = {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string | null;
  phone: string | null;
  isEmailValidated?: boolean;
  isPhoneValidated: boolean;
  isSeller: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function login(dto: LoginDto): Promise<LoginResponse> {
  const { data } = await api.post('auth/login', dto, {
    skipAuth: true,
  });
  return data;
}

export async function getUserById(
  id: string,
  signal?: AbortSignal,
): Promise<getUserByIdRepsonse> {
  const { data } = await api.get(`users/${id}`, { requireAuth: true, signal });
  return data;
}

export async function signup(dto: SignupDto): Promise<SignupResponse> {
  const { data } = await api.post('auth/register', dto, { skipAuth: true });
  return data;
}

/** Read-only advisory check; it does not reserve a contact or create a pending account. */
export async function checkContactAvailability(
  channel: ContactChannel,
  value: string,
  signal?: AbortSignal,
) {
  const { data } = await api.post<{ available: boolean }>(
    'registration/contacts/availability',
    { channel, value },
    { skipAuth: true, timeout: 5_000, signal },
  );
  return data;
}

export async function logout() {
  const { data } = await api.post(
    'auth/logout',
    {},
    {
      requireAuth: true,
    },
  );
  return data;
}

/** The registration token selects the stored destination; the client cannot override it. */
export async function sendPhoneOtp(dto: SendPhoneOtpDto): Promise<OTPResponse> {
  void dto;
  const { data } = await api.post(
    'otp/phone/send',
    {},
    {
      requireAuth: true,
    },
  );
  return data;
}

export async function verifyPhoneOtp(
  dto: VerifyPhoneOtpDto,
): Promise<VerifyOTPResponse> {
  const { data } = await api.post(
    'otp/phone/verify',
    { code: dto.code },
    {
      requireAuth: true,
    },
  );
  return data;
}

/** The registration token selects the stored destination; the client cannot override it. */
export async function sendEmailOtp(dto: SendEmailOtpDto): Promise<OTPResponse> {
  void dto;
  const { data } = await api.post(
    'otp/email/send',
    {},
    {
      requireAuth: true,
    },
  );
  return data;
}

export async function verifyEmailOtp(
  dto: VerifyEmailOtpDto,
): Promise<VerifyOTPResponse> {
  const { data } = await api.post(
    'otp/email/verify',
    { code: dto.code },
    {
      requireAuth: true,
    },
  );
  return data;
}

export async function refreshAccessToken() {
  const { getRefreshToken } = await import('./secureTokens');
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token is stored');
  const { data } = await refreshApi.post('auth/refresh', { refreshToken });
  return data;
}

export async function removeRegistrationContact(channel: 'email' | 'phone') {
  const { data } = await api.delete(`registration/contacts/${channel}`, {
    requireAuth: true,
  });
  return data as SignupResponse;
}

export async function addRegistrationContact(
  channel: 'email' | 'phone',
  value: string,
) {
  const { data } = await api.post(
    'registration/contacts',
    { channel, value },
    { requireAuth: true },
  );
  return data as SignupResponse;
}
