import { adminUsersApi } from "@/api/admin.api";
import { IUsersQuery } from "@/types/donor.types";
import { useQuery } from "@tanstack/react-query";

export function useAdminUsers(query: IUsersQuery) {
  return useQuery({
    queryKey: ["admin-users", query],
    queryFn: () => adminUsersApi(query),
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
