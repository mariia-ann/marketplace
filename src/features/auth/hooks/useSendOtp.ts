import { useMutation } from '@tanstack/react-query';
import {
  sendEmailOtp,
  sendPhoneOtp,
  verifyEmailOtp,
  verifyPhoneOtp,
  type SendEmailOtpDto,
  type SendPhoneOtpDto,
  type VerifyEmailOtpDto,
  type VerifyPhoneOtpDto,
} from '@/src/features/auth/api';

export function useSendPhoneOtp() {
  return useMutation({
    mutationFn: async (dto: SendPhoneOtpDto) => sendPhoneOtp(dto),
  });
}

export function useVerifyPhoneOtp() {
  return useMutation({
    mutationFn: async (dto: VerifyPhoneOtpDto) => verifyPhoneOtp(dto),
  });
}

export function useSendEmailOtp() {
  return useMutation({
    mutationFn: async (dto: SendEmailOtpDto) => sendEmailOtp(dto),
  });
}

export function useVerifyEmailOtp() {
  return useMutation({
    mutationFn: async (dto: VerifyEmailOtpDto) => verifyEmailOtp(dto),
  });
}
