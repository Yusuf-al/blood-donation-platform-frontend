"use client";

import Image from "next/image";

import {
    AlertTriangle,
    Clock,
    Eye,
    Hospital,
    MailIcon,
    MapPin,
    MoreHorizontal,
    Phone,
    PhoneCallIcon,
    PhoneIcon,
    UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BloodRequestStatus, IBloodRequest } from "@/types/dr.types";
import { formatDate } from "@/lib/formateDate";
import { formatTime } from "@/lib/formateTime";



interface BloodRequestsListProps {
    requests: IBloodRequest[];

    onViewRequest?: (
        request: IBloodRequest
    ) => void;
}

function getStatusLabel(status: BloodRequestStatus) {
    return status.replaceAll("_", " ");
}

function getUrgencyClass(urgency: string) {
    switch (urgency) {
        case "CRITICAL":
            return "bg-red-50 text-red-700";

        case "NORMAL":
            return "bg-orange-50 text-orange-700";

        case "URGENT":
            return "bg-amber-50 text-amber-700";
        default:
            return "bg-slate-100 text-slate-600";
    }
}

function getStatusClass(status: BloodRequestStatus) {
    switch (status) {
        case "PENDING":
            return "bg-amber-50 text-amber-700";

        case "APPROVED":
            return "bg-blue-50 text-blue-700";

        case "MATCHING":
            return "bg-purple-50 text-purple-700";

        case "DONOR_ASSIGNED":
            return "bg-indigo-50 text-indigo-700";

        case "FULFILLED":
            return "bg-green-50 text-green-700";

        case "CANCELLED":
            return "bg-red-50 text-red-700";

        default:
            return "bg-slate-50 text-slate-600";
    }
}


export default function BloodRequestsList({
    requests,
    onViewRequest,
}: BloodRequestsListProps) {
    if (!requests.length) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-800">
                    No blood requests found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Try changing the current filters.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Requester
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Blood
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Hospital
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Urgency
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Required At
                            </th>

                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {requests.map((request) => (
                            <tr
                                key={request.id}
                                className="transition-colors hover:bg-slate-50/70"
                            >
                                {/* Requester */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-50">
                                            {request.requester.imageUrl ? (
                                                <Image
                                                    src={request.requester.imageUrl}
                                                    alt={request.requester.name}
                                                    fill
                                                    sizes="40px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <UserRound className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="max-w-[180px] truncate text-sm font-semibold text-slate-800">
                                                {request.requester.name}
                                            </p>

                                            <p className="max-w-[180px]  truncate text-xs text-slate-500">
                                                {request.requester.email}
                                            </p>
                                            <p className="max-w-[180px] truncate text-xs text-slate-500">
                                                <b> {request.requester.phone}</b>
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Blood Group */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                                            {request.bloodGroup}
                                        </span>

                                        <span className="text-sm font-medium text-slate-600">
                                            {request.requiredUnits} unit
                                            {request.requiredUnits !== 1
                                                ? "s"
                                                : ""}
                                        </span>
                                    </div>
                                </td>

                                {/* Hospital */}
                                <td className="px-5 py-4">
                                    <div className="max-w-[230px]">
                                        <div className="flex items-center gap-1.5">
                                            <Hospital className="h-4 w-4 shrink-0 text-slate-400" />

                                            <p className="truncate text-sm font-medium text-slate-700">
                                                {request.hospitalName}
                                            </p>
                                        </div>

                                        <div className="mt-1 flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                                            <p className="truncate text-xs text-slate-500">
                                                {request.hospitalLocation}
                                            </p>
                                        </div>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <PhoneCallIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                                            <p className="truncate text-xs text-slate-500">
                                                {request.contactPhone}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                                            request.status
                                        )}`}
                                    >
                                        {request.status}
                                    </span>
                                </td>
                                {/* Urgency */}
                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getUrgencyClass(
                                            request.urgency
                                        )}`}
                                    >
                                        {request.urgency}
                                    </span>
                                </td>

                                {/* Required At */}
                                <td className="px-5 py-4">
                                    <div className="flex items-start gap-2">
                                        <Clock className="mt-0.5 h-4 w-4 text-slate-400" />

                                        <div>
                                            <p className="text-sm font-medium text-slate-700">
                                                {formatDate(
                                                    request.requiredAt
                                                )}
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                {formatTime(
                                                    request.requiredAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Action */}
                                <td className="px-5 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="gap-2"
                                                />
                                            }
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            Action
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onViewRequest?.(
                                                        request
                                                    )
                                                }
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Request
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