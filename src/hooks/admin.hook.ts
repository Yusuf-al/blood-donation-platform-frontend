import { adminUsersApi } from "@/api/admin.api";
import { useQuery } from "@tanstack/react-query";

export function useAdminUsers(query: any) {
  return useQuery({
    queryKey: ["admin-users", query],
    queryFn: () => adminUsersApi(query),
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
