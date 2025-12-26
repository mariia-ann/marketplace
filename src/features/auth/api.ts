import { api } from "@/src/lib/api";

export type LoginDto = {
  email: string;
  password: string;
};

export type SignupDto = {
  firstName: string;
  phone: string;
  email: string;
  password: string;
  isPhoneValidated: boolean;
};

export type sendOTPDto = {
  phone: string;
};

export type verifyOTPDto = {
  phone: string;
  code: string;
};

export type LoginResponse = {
  access_token: string;
};

export type SignupResponse = {
  id: string;
  firstName: string;
  email: string;
  phone: string;
  isPhoneValidated: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OTPResponse = {
  ok: boolean;
  devHint: string;
};

export type VerifyOTPResponse = {
  ok: boolean;
  reason?: string;
};

export async function login(dto: LoginDto): Promise<LoginResponse> {
  const { data } = await api.post("auth/login", dto, { skipAuth: true });
  return data; // LoginResponse { access_token: string }
}

export async function getUserById(id: string) {
  console.warn("inside api.ts from getUserById", id);
  const { data } = await api.get(`users/${id}`, { requireAuth: true });
  return data;
}

export async function signup(dto: SignupDto): Promise<SignupResponse> {
  const { data } = await api.post("auth/register", dto, { skipAuth: true });
  return data;
}

export async function logout() {
  const { data } = await api.post("auth/logout", {}, { requireAuth: true });
  return data;
}

export async function sendOTP(dto: sendOTPDto): Promise<OTPResponse> {
  const { data } = await api.post("auth/phone/send", dto, {
    requireAuth: false,
  });
  return data;
}

export async function verifyOTP(dto: verifyOTPDto) {
  const { data } = await api.post("auth/phone/verify", dto, {
    requireAuth: false,
  });
  return data;
}
