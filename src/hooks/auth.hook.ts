import { getMe, LoginApi, LogoutApi } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: LoginApi,
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
  });
}
