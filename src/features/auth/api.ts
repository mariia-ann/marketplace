import { api, refreshApi } from '@/assets/lib/api';

export type LoginDto = {
  identifier: string;
  password: string;
};

export type SignupDto = {
  firstName: string;
  phone: string;
  email: string;
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

export type LoginResponse = {
  accessToken: string;
  isEmailValidated: boolean;
  isPhoneValidated: boolean;
};

export type SignupResponse = {
  message: string;
  userId: string;
};

export type OTPResponse = {
  ok: boolean;
  devHint?: string;
  message?: string;
};

export type VerifyOTPResponse = {
  ok: boolean;
  reason?: string;
};

export type getUserByIdRepsonse = {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  phone: string;
  isEmailValidated?: boolean;
  isPhoneValidated: boolean;
  isSeller: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function login(dto: LoginDto): Promise<LoginResponse> {
  const { data } = await api.post('auth/login', dto, {
    skipAuth: true,
    withCredentials: true,
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

export async function logout() {
  const { data } = await api.post(
    'auth/logout',
    {},
    {
      requireAuth: true,
      withCredentials: true,
    },
  );
  return data;
}

export async function sendPhoneOtp(dto: SendPhoneOtpDto): Promise<OTPResponse> {
  const { data } = await api.post('otp/phone/send', dto, {
    requireAuth: false,
  });
  return data;
}

export async function verifyPhoneOtp(
  dto: VerifyPhoneOtpDto,
): Promise<VerifyOTPResponse> {
  const { data } = await api.post('otp/phone/verify', dto, {
    requireAuth: false,
  });
  return data;
}

export async function sendEmailOtp(dto: SendEmailOtpDto): Promise<OTPResponse> {
  const { data } = await api.post('otp/email/send', dto, {
    requireAuth: false,
  });
  return data;
}

export async function verifyEmailOtp(
  dto: VerifyEmailOtpDto,
): Promise<VerifyOTPResponse> {
  const { data } = await api.post('otp/email/verify', dto, {
    requireAuth: false,
  });
  return data;
}

export async function refreshAccessToken() {
  const { data } = await refreshApi.post('auth/refresh', null, {
    skipAuth: false,
  });
  return data.accessToken;
}
