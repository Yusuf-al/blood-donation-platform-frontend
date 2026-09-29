import {
  getMe,
  googleAuth,
  LoginApi,
  LogoutApi,
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
  });
}
