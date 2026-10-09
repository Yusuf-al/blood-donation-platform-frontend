import apiClinet from "@/lib/apiClient";
import { IDonorFormData, IDonorQuery } from "@/types/donor.types";

export function becomeDonorApi(payload: IDonorFormData) {
  return apiClinet("/donor/become-donor", {
    method: "POST",
    body: payload,
    credentials: "include", // browser attaches the cookie
  });
}

export function getAllDonorApi(query?: IDonorQuery | null) {
  return apiClinet("/donor/find-donor", {
    credentials: "include",
    query: query ?? undefined,
  });
}

export function getAllDonorAssignmentsApi() {
  return apiClinet("donation/donor/assignments", {
    credentials: "include",
  });
}
export function updateAssignmentsApi(
  userId: string,
  payload: { status: string },
) {
  return apiClinet(`donation/update-assignment/${userId}`, {
    method: "PATCH",
    credentials: "include",
    body: payload,
  });
}
