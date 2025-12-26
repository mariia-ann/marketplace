import { useMutation } from "@tanstack/react-query";
import {
  sendOTP,
  verifyOTP,
  type sendOTPDto,
  type verifyOTPDto,
  type OTPResponse,
  type VerifyOTPResponse,
} from "@/src/features/auth/api";

// Hook to send OTP to a phone number
export function useSendOtp() {
  return useMutation({
    mutationFn: async (dto: sendOTPDto) => sendOTP(dto),
    onSuccess: (data) => {
      console.log("sendOtp response:", data);
    },
  });
}

// Hook to verify the received OTP code
export function useVerifyOtp() {
  console.warn("useVerifyOtp hook called");

  return useMutation({
    mutationFn: async (dto: verifyOTPDto) => verifyOTP(dto),

    onSuccess: (data) => {
      console.log("verifyOtp response:", data);
    },
    onError: (error) => {
      console.error("verifyOtp error:", error);
    },
  });
}
