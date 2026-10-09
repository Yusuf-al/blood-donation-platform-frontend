import apiClinet from "@/lib/apiClient";
import { IRequestQuery } from "@/types/donor.types";
import { BloodRequestStatus } from "@/types/dr.types";
import { IBloodRequest } from "@/types/newRequest.types";

export function newBloodRequestApi(payload: IBloodRequest) {
  return apiClinet("/blood/new-request", {
    method: "POST",
    credentials: "include",
    body: payload,
  });
}

export function allBloodRequestApi(query?: IRequestQuery | null) {
  return apiClinet("/blood/all", {
    credentials: "include",
    query: query ?? undefined,
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

export function BloodRequestStatusUpdateApi(
  requestId: string,
  payload: { status: BloodRequestStatus },
) {
  return apiClinet(`/blood/update-request/${requestId}`, {
    method: "PATCH",
    credentials: "include",
    body: payload,
  });
}
