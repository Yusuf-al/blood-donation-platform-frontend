"use client";

import Image from "next/image";

import {
    Eye,
    MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAssignemnts } from "@/types/assignment.types";
import { formatDate } from "@/lib/formateDate";

export type AssignmentStatus =
    | "CREATED"
    | "ACCEPTED"
    | "REJECTED"
    | "COMPLETED"
    | "CANCELLED";


interface DonationAssignmentsListProps {
    assignments: IAssignemnts[];

    onViewAssignment?: (
        assignment: IAssignemnts
    ) => void;
}

function getStatusClass(
    status: string
) {
    switch (status) {
        case "CREATED":
            return "bg-amber-50 text-amber-700";

        case "ACCEPTED":
            return "bg-blue-50 text-blue-700";

        case "REJECTED":
            return "bg-red-50 text-red-700";

        case "COMPLETED":
            return "bg-green-50 text-green-700";

        case "CANCELLED":
            return "bg-slate-100 text-slate-600";

        default:
            return "bg-slate-50 text-slate-600";
    }
}

function formatStatus(status: string) {
    return status.replaceAll("_", " ");
}



export default function DonationAssignmentsList({
    assignments,
    onViewAssignment,
}: DonationAssignmentsListProps) {
    if (assignments.length === 0) {
        return (
            <div className="flex min-h-60 items-center justify-center rounded-xl border border-slate-200 bg-white">
                <div className="text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                        <Eye className="h-5 w-5 text-slate-400" />
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-slate-800">
                        No donation assignments found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Try changing your filters or search terms.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/70">
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Donor
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Requester
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Blood
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Hospital
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Urgency
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Assigned
                            </th>

                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {assignments.map((assignment) => (
                            <tr
                                key={assignment.id}
                                className="transition-colors hover:bg-slate-50/70"
                            >
                                {/* Donor */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-red-50">
                                            {assignment.donor.imageUrl ? (
                                                <Image
                                                    src={assignment.donor.imageUrl}
                                                    alt={assignment.donor.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-red-600">
                                                    {assignment.donor.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-800">
                                                {assignment.donor.name}
                                            </p>

                                            <p className="truncate text-xs text-slate-500">
                                                {assignment.donor.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Requester */}
                                <td className="px-4 py-4">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-slate-700">
                                            {assignment.request.requester.name}
                                        </p>

                                        <p className="truncate text-xs text-slate-500">
                                            {assignment.request.requester.email}
                                        </p>
                                    </div>
                                </td>

                                {/* Blood */}
                                <td className="px-4 py-4">
                                    <div className="inline-flex items-center gap-2">
                                        <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                                            {assignment.request.bloodGroup}
                                        </span>

                                        <span className="text-xs text-slate-500">
                                            {assignment.request.requiredUnits} unit
                                            {assignment.request.requiredUnits !== 1
                                                ? "s"
                                                : ""}
                                        </span>
                                    </div>
                                </td>

                                {/* Hospital */}
                                <td className="max-w-[220px] px-4 py-4">
                                    <p className="truncate text-sm font-medium text-slate-700">
                                        {assignment.request.hospitalName}
                                    </p>

                                    <p className="truncate text-xs text-slate-500">
                                        {assignment.request.hospitalLocation}
                                    </p>
                                </td>

                                {/* Urgency */}
                                <td className="px-4 py-4">
                                    <span className="text-xs font-semibold uppercase text-slate-600">
                                        {assignment.request.urgency}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                                            assignment.request.status
                                        )}`}
                                    >
                                        {formatStatus(assignment.status)}
                                    </span>
                                </td>

                                {/* Date */}
                                <td className="px-4 py-4">
                                    <span className="text-sm text-slate-600">
                                        {formatDate(assignment.assignedAt)}
                                    </span>
                                </td>

                                {/* Action */}
                                <td className="px-4 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label="Assignment actions"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            }
                                        />

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onViewAssignment?.(assignment)
                                                }
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Assignment
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