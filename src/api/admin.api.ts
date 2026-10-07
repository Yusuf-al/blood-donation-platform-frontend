import apiClinet from "@/lib/apiClient";
import { IUsersQuery } from "@/types/donor.types";

export function adminUsersApi(query: IUsersQuery) {
  return apiClinet("/admin/users", {
    query: query,
    credentials: "include",
  });
}

export function adminUserDeletesApi(userId: string) {
  return apiClinet(`/admin/delete/user/:${userId}`, {
    credentials: "include",
  });
}
