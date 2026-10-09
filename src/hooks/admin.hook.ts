import { adminUsersApi, paymentsApi, subscriptionsApi } from "@/api/admin.api";
import { IUsersQuery } from "@/types/donor.types";
import { IPaymentsQuery } from "@/types/payments.types";
import { useQuery } from "@tanstack/react-query";

export function useAdminUsers(query: IUsersQuery) {
  return useQuery({
    queryKey: ["admin-users", query],
    queryFn: () => adminUsersApi(query),
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}

export function useSubscription(query: {
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}) {
  return useQuery({
    queryKey: ["subscription", query],
    queryFn: () => subscriptionsApi(query),
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}

export function usePayments(query?: IPaymentsQuery | null) {
  return useQuery({
    queryKey: ["payments", query],
    queryFn: () => paymentsApi(query),
    retry: false,
    placeholderData: (previousData) => previousData,
  });
}
