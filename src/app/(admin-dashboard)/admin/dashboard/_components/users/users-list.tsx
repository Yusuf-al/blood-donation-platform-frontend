"use client";

import Image from "next/image";
import {
    CheckCircle2,
    Eye,
    MoreHorizontal,
    ShieldAlert,
    ShieldCheck,
    Trash2,
    UserRound,
    XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    imageUrl?: string | null;
    isPremiumUser: boolean;
    isVerified: boolean;
    status: "ACTIVE" | "BLOCKED" | "SUSPENDED";
}

interface UsersListProps {
    users: User[];
    onDelete?: (user: User) => void;
    onViewProfile?: (user: User) => void;
    onUpdateStatus?: (user: User, status: User["status"]) => void;
}

function getRoleClass(role: string) {
    switch (role) {
        case "ADMIN":
            return "bg-purple-50 text-purple-700";

        case "DONOR":
            return "bg-red-50 text-red-700";

        case "REQUESTER":
            return "bg-blue-50 text-blue-700";

        default:
            return "bg-slate-100 text-slate-600";
    }
}

function getStatusClass(status: User["status"]) {
    switch (status) {
        case "ACTIVE":
            return "bg-green-50 text-green-700";

        case "BLOCKED":
            return "bg-red-50 text-red-700";

        case "SUSPENDED":
            return "bg-amber-50 text-amber-700";

        default:
            return "bg-slate-100 text-slate-600";
    }
}

export default function UsersList({
    users,
    onDelete,
    onViewProfile,
    onUpdateStatus,
}: UsersListProps) {
    if (!users.length) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
                <UserRound className="mx-auto h-10 w-10 text-slate-300" />

                <h3 className="mt-3 text-sm font-semibold text-slate-800">
                    No users found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                User
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Phone
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Role
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>

                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Premium
                            </th>

                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Verified
                            </th>

                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="transition-colors hover:bg-slate-50/70"
                            >
                                {/* User */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-50">
                                            {user.imageUrl ? (
                                                <Image
                                                    src={user.imageUrl}
                                                    alt={user.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <UserRound className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-800">
                                                {user.name}
                                            </p>

                                            <p className="truncate text-xs text-slate-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Phone */}
                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {user.phone || "—"}
                                </td>

                                {/* Role */}
                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleClass(
                                            user.role
                                        )}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                                            user.status
                                        )}`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                {/* Premium */}
                                <td className="px-5 py-4 text-center">
                                    {user.isPremiumUser ? (
                                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-600" />
                                    ) : (
                                        <XCircle className="mx-auto h-5 w-5 text-slate-300" />
                                    )}
                                </td>

                                {/* Verified */}
                                <td className="px-5 py-4 text-center">
                                    {user.isVerified ? (
                                        <ShieldCheck className="mx-auto h-5 w-5 text-green-600" />
                                    ) : (
                                        <ShieldAlert className="mx-auto h-5 w-5 text-amber-500" />
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-5 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-slate-500 hover:text-slate-900"
                                                />
                                            }
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem
                                                onClick={() => onViewProfile?.(user)}
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Profile
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onUpdateStatus?.(user, "ACTIVE")
                                                }
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                                Set Active
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onUpdateStatus?.(user, "BLOCKED")
                                                }
                                            >
                                                <ShieldAlert className="mr-2 h-4 w-4 text-red-600" />
                                                Block User
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onUpdateStatus?.(user, "SUSPENDED")
                                                }
                                            >
                                                <ShieldAlert className="mr-2 h-4 w-4 text-amber-600" />
                                                Suspend User
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() => onDelete?.(user)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete User
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}