import {
  forgetPasswordApi,
  getMe,
  googleAuth,
  LoginApi,
  LogoutApi,
  resendOtpApi,
  resetPasswordApi,
  signupApi,
  verifyEmailApi,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: LoginApi,
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: signupApi,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmailApi,
  });
}

export function useForgetPassword() {
  return useMutation({
    mutationFn: forgetPasswordApi,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPasswordApi,
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: resendOtpApi,
  });
}

export function useGoogleAuth() {
  return useMutation({
    mutationFn: googleAuth,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: LogoutApi,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
