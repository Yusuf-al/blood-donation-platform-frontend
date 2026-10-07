"use client";

import { useAdminUsers } from "@/hooks/admin.hook";
import { useQueryFilter } from "@/hooks/query.hook";

import UsersHeader from "../_components/users/users-header";
import UsersFilter from "../_components/users/users-filter";
import UsersList from "../_components/users/users-list";
import UsersPagination from "../_components/users/users-pagination";

function getBooleanQuery(value: string) {
    if (value === "true") return true;
    if (value === "false") return false;

    return undefined;
}

export default function UsersPage() {
    const { getQuery } = useQueryFilter();

    const searchTerm = getQuery("searchTerm");
    const role = getQuery("role");
    const status = getQuery("status");
    const isVerified = getQuery("isVerified");
    const isPremiumUser = getQuery("isPremiumUser");

    const page = Number(getQuery("page")) || 1;

    const { data, isPending, isError } = useAdminUsers({
        page,
        searchTerm: searchTerm || undefined,
        role: role || undefined,
        status: status || undefined,
        isVerified: getBooleanQuery(isVerified),
        isPremiumUser: getBooleanQuery(isPremiumUser),
    });

    const users = data?.data?.data ?? [];
    const meta = data?.data?.meta;

    console.log("Users API:", data);
    console.log("Pagination meta:", meta);

    const totalPages = meta?.totalPage ?? meta?.totalPages ?? 1;

    return (
        <div className="space-y-6">
            <UsersHeader />

            <UsersFilter />

            {isPending ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-slate-200 bg-white">
                    <p className="text-sm text-slate-500">
                        Loading users...
                    </p>
                </div>
            ) : isError ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                    <p className="text-sm font-medium text-red-600">
                        Failed to load users.
                    </p>
                </div>
            ) : (
                <>
                    <UsersList
                        users={users}
                        onViewProfile={(user) => {
                            console.log("View profile:", user.id);
                        }}
                        onUpdateStatus={(user, status) => {
                            console.log(
                                "Update status:",
                                user.id,
                                status
                            );
                        }}
                        onDelete={(user) => {
                            console.log("Delete user:", user.id);
                        }}
                    />

                    <UsersPagination
                        currentPage={page}
                        totalPages={totalPages}
                    />
                </>
            )}
        </div>
    );
}