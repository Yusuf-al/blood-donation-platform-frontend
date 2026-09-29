import apiClinet from "@/lib/apiClient";

export function LoginApi(payload: { email: string; password: string }) {
  return apiClinet("/auth/login", {
    method: "POST",
    body: payload,
  });
}
