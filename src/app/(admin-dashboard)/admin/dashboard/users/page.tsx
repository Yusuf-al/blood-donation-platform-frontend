"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAdminUsers } from "@/hooks/admin.hook";
import { useQueryFilter } from "@/hooks/query.hook";

import ConfirmationDialog from "@/components/shared/confirmation-dialog";

import UsersHeader from "../_components/users/users-header";
import UsersFilter from "../_components/users/users-filter";
import UsersList from "../_components/users/users-list";
import UsersPagination from "../_components/users/users-pagination";
import { adminUserDeletesApi, adminUserUpdateApi } from "@/api/admin.api";
import { toast } from "sonner";
import Pagination from "@/components/shared/pagination";

export type UserStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED";

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    imageUrl?: string | null;
    isPremiumUser: boolean;
    isVerified: boolean;
    status: UserStatus;
}

function getBooleanQuery(value: string) {
    if (value === "true") return true;

    if (value === "false") return false;

    return undefined;
}

export default function UsersPage() {
    const router = useRouter();

    const { getQuery } = useQueryFilter();



    const searchTerm = getQuery("searchTerm");
    const role = getQuery("role");
    const status = getQuery("status");
    const isVerified = getQuery("isVerified");
    const isPremiumUser = getQuery("isPremiumUser");

    const page = Number(getQuery("page")) || 1;



    const {
        data,
        isPending,
        isError,
        refetch,
    } = useAdminUsers({
        page,
        searchTerm: searchTerm || undefined,
        role: role || undefined,
        status: status || undefined,
        isVerified: getBooleanQuery(isVerified),
        isPremiumUser: getBooleanQuery(isPremiumUser),
    });

    const users: User[] = data?.data?.data ?? [];

    const meta = data?.data?.meta;

    const totalPages =
        meta?.totalPage ??
        meta?.totalPages ??
        1;



    const [selectedUser, setSelectedUser] =
        useState<User | null>(null);

    const [selectedStatus, setSelectedStatus] =
        useState<UserStatus | null>(null);

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const [statusDialogOpen, setStatusDialogOpen] =
        useState(false);

    const [actionLoading, setActionLoading] =
        useState(false);



    const handleViewProfile = (user: User) => {
        router.push(`/admin/users/${user.id}`);
    };


    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedUser) return;

        try {
            setActionLoading(true);

            await adminUserDeletesApi(selectedUser.id);

            toast.success(
                `${selectedUser.name} has been deleted`
            );

            setDeleteDialogOpen(false);
            setSelectedUser(null);

            await refetch();
        } catch (error) {
            console.error(
                "Failed to delete user:",
                error
            );
        } finally {
            setActionLoading(false);
        }
    };


    const handleUpdateStatus = (
        user: User,
        newStatus: UserStatus
    ) => {

        if (user.status === newStatus) {
            return;
        }

        setSelectedUser(user);
        setSelectedStatus(newStatus);
        setStatusDialogOpen(true);
    };

    const handleConfirmStatusUpdate = async () => {
        if (!selectedUser || !selectedStatus) {
            return;
        }

        try {
            setActionLoading(true);

            await adminUserUpdateApi(selectedUser.id, { status: selectedStatus })

            toast.success(
                `${selectedUser.name} has been updated to ${selectedStatus}`
            );
            setStatusDialogOpen(false);
            setSelectedUser(null);
            setSelectedStatus(null);

            await refetch();
        } catch (error) {
            console.error(
                "Failed to update user status:",
                error
            );
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <UsersHeader />

                {/* Filters */}
                <UsersFilter />

                {/* Users */}
                {isPending ? (
                    <div className="flex min-h-60 items-center justify-center rounded-xl border border-slate-200 bg-white">
                        <p className="text-sm text-slate-500">
                            Loading users...
                        </p>
                    </div>
                ) : isError ? (
                    <div className="flex min-h-60 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                        <div className="text-center">
                            <p className="text-sm font-semibold text-red-600">
                                Failed to load users.
                            </p>

                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="mt-2 text-sm font-medium text-red-700 underline underline-offset-4"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <UsersList
                            users={users}
                            onViewProfile={handleViewProfile}
                            onUpdateStatus={handleUpdateStatus}
                            onDelete={handleDelete}
                        />

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                        />
                    </>
                )}
            </div>


            <ConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                    if (!actionLoading) {
                        setDeleteDialogOpen(open);

                        if (!open) {
                            setSelectedUser(null);
                        }
                    }
                }}
                title="Delete User?"
                description={
                    selectedUser
                        ? `Are you sure you want to delete ${selectedUser.name}? This action cannot be undone.`
                        : "Are you sure you want to delete this user?"
                }
                confirmText="Delete User"
                cancelText="Cancel"
                variant="destructive"
                loading={actionLoading}
                onConfirm={handleConfirmDelete}
            />

            <ConfirmationDialog
                open={statusDialogOpen}
                onOpenChange={(open) => {
                    if (!actionLoading) {
                        setStatusDialogOpen(open);

                        if (!open) {
                            setSelectedUser(null);
                        }
                    }
                }}
                title="Update User Status?"
                description={
                    selectedUser
                        ? `Are you sure you want to update ${selectedUser.name} status to ${selectedStatus}?`
                        : "Are you sure you want to update this user?"
                }
                confirmText="Update User"
                cancelText="Cancel"
                variant="default"
                loading={actionLoading}
                onConfirm={handleConfirmStatusUpdate}
            />


        </>
    );
}