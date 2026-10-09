import { UserStatus } from "@/app/(admin-dashboard)/admin/dashboard/users/page";
import apiClinet from "@/lib/apiClient";
import { IUsersQuery } from "@/types/donor.types";
import { IPaymentsQuery } from "@/types/payments.types";

export function adminUsersApi(query: IUsersQuery) {
  return apiClinet("/admin/users", {
    query: query,
    credentials: "include",
  });
}

export function adminUserDeletesApi(userId: string) {
  return apiClinet(`/admin/delete/user/${userId}`, {
    method: "PATCH",
    credentials: "include",
  });
}
export function adminUserUpdateApi(
  userId: string,
  payload: { status: UserStatus },
) {
  return apiClinet(`/admin/update/status/${userId}`, {
    method: "PATCH",
    credentials: "include",
    body: payload,
  });
}

export function donorProfileVerifyApi(donorId: string) {
  return apiClinet(`/admin/profile-approve/${donorId}`, {
    method: "PUT",
    credentials: "include",
  });
}

export function donorAvailabilityUpdateApi(
  donorId: string,
  payload: { availability: string },
) {
  return apiClinet(`/donor/upadate/availability/${donorId}`, {
    method: "PUT",
    credentials: "include",
    body: payload,
  });
}

export function subscriptionsApi(query: {
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}) {
  return apiClinet("/admin/subscriptions", {
    query: query,
    credentials: "include",
  });
}

export function paymentsApi(query?: IPaymentsQuery | null) {
  return apiClinet("/admin/payments", {
    query: query ?? undefined,
    credentials: "include",
  });
}
