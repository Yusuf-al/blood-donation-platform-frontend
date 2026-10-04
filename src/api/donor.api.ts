import apiClinet from "@/lib/apiClient";
import { IDonorFormData, IDonorQuery } from "@/types/donor.types";

export function becomeDonorApi(payload: IDonorFormData) {
  return apiClinet("/donor/become-donor", {
    method: "POST",
    body: payload,
    credentials: "include", // browser attaches the cookie
  });
}

export function getAllDonorApi(query?: IDonorQuery) {
  return apiClinet("/donor/find-donor", {
    credentials: "include",
    query,
  });
}
