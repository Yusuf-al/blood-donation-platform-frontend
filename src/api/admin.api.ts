import apiClinet from "@/lib/apiClient";

export function adminUsersApi(query: any) {
  return apiClinet("/admin/users", {
    query: query,
    credentials: "include",
  });
}
