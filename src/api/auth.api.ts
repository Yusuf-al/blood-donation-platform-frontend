import apiClinet from "@/lib/apiClient";
import { ISignup } from "@/types/signup.type";

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

export function googleAuth(payload: { idToken: string }) {
  return apiClinet("/auth/google", {
    method: "POST",
    body: payload,
  });
}

export function signupApi(payload: ISignup) {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("phone", payload.phone);
  formData.append("password", payload.password);

  if (payload.imageUrl) {
    formData.append("profileImage", payload.imageUrl);
  }
  return apiClinet("/user/register", {
    method: "POST",
    body: formData,
  });
}

export function verifyEmailApi(payload: { email: string; otp: string }) {
  return apiClinet("/user/verify-email", {
    method: "POST",
    body: payload,
  });
}
