import apiClinet from "@/lib/apiClient";

export function LoginApi(payload: { email: string; password: string }) {
  return apiClinet("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function LogoutApi() {
  return apiClinet("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClinet("/user/me");
}
