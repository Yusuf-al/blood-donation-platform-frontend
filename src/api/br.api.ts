import apiClinet from "@/lib/apiClient";
import { IRequestQuery } from "@/types/donor.types";
import { IBloodRequest } from "@/types/newRequest.types";

export function newBloodRequestApi(payload: IBloodRequest) {
  return apiClinet("/blood/new-request", {
    method: "POST",
    credentials: "include",
    body: payload,
  });
}

export function allBloodRequestApi(query?: IRequestQuery) {
  return apiClinet("/blood/all", {
    credentials: "include",
    query,
  });
}

export function updateRequestStatus(
  params: { id: string },
  payload: { assignId: string },
) {
  return apiClinet(`/donation/update-assignment/:${params}`, {
    method: "PATCH",
    credentials: "include",
    body: payload,
  });
}
