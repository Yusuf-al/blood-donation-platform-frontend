import apiClinet from "@/lib/apiClient";

export function paymentApi(paymentId: string | null) {
  return apiClinet(`/subscription/payment/${paymentId}`, {
    credentials: "include",
  });
}
