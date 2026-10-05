import apiClinet from "@/lib/apiClient";
import { IBloodRequest } from "@/types/newRequest.types";

export function newBloodRequestApi(payload: IBloodRequest) {
  return apiClinet("/blood/new-request", {
    method: "POST",
    credentials: "include",
    body: payload,
  });
}
