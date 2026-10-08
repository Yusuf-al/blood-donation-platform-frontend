"use client";

import Image from "next/image";

import {
    CheckCircle2,
    Eye,
    MoreHorizontal,
    ShieldAlert,
    ShieldCheck,
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
import { IDonorProfile } from "@/types/donor.types";
import { calculateAge } from "@/lib/calculateAge";
import { formatDate } from "@/lib/formateDate";

export type DonorStatus =
    | "AVAILABLE"
    | "UNAVAILABLE"
    | "TEMPORARILY_UNAVAILABLE";


interface DonorsListProps {
    donors: IDonorProfile[];

    onViewProfile?: (
        donor: IDonorProfile
    ) => void;

    onUpdateStatus?: (
        donor: IDonorProfile,
        status: string
    ) => void;

    onUpdateEligibility?: (
        donor: IDonorProfile,
        verified: boolean
    ) => void;
}

function getBloodGroupClass(
    bloodGroup: string
) {
    if (
        bloodGroup.includes("AB")
    ) {
        return "bg-purple-50 text-purple-700";
    }

    if (
        bloodGroup.includes("B")
    ) {
        return "bg-blue-50 text-blue-700";
    }

    if (
        bloodGroup.includes("A")
    ) {
        return "bg-red-50 text-red-700";
    }

    return "bg-slate-100 text-slate-700";
}

function getAvailabilityClass(
    status: string
) {
    switch (status) {
        case "AVAILABLE":
            return "bg-green-50 text-green-700";

        case "TEMPORARILY_UNAVAILABLE":
            return "bg-amber-50 text-amber-700";

        case "UNAVAILABLE":
            return "bg-slate-100 text-slate-600";

        default:
            return "bg-slate-100 text-slate-600";
    }
}

function getAvailabilityLabel(
    status: string
) {
    switch (status) {
        case "AVAILABLE":
            return "Available";

        case "TEMPORARILY_UNAVAILABLE":
            return "Temporarily Unavailable";

        case "UNAVAILABLE":
            return "Unavailable";

        default:
            return status;
    }
}



export default function DonorsList({
    donors,
    onViewProfile,
    onUpdateStatus,
    onUpdateEligibility,
}: DonorsListProps) {
    if (!donors.length) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                    <UserRound className="h-6 w-6 text-red-500" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-800">
                    No donors found
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
                <table className="w-full min-w-[1250px]">
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Donor
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Blood Group
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Age
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Location
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Last Donation
                            </th>

                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Availability
                            </th>

                            <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Eligibility
                            </th>

                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {donors.map((donor) => (
                            <tr
                                key={donor.id}
                                className="transition-colors hover:bg-slate-50/70"
                            >
                                {/* Donor */}
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-50">
                                            {donor.user.imageUrl ? (
                                                <Image
                                                    src={donor.user.imageUrl}
                                                    alt={donor.user.name}
                                                    fill
                                                    sizes="44px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <UserRound className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="max-w-[190px] truncate text-sm font-semibold text-slate-800">
                                                {donor.user.name}
                                            </p>

                                            <p className="max-w-[190px] truncate text-xs text-slate-500">
                                                {donor.user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Blood Group */}
                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${getBloodGroupClass(
                                            donor.bloodGroup
                                        )}`}
                                    >
                                        {donor.bloodGroup}
                                    </span>
                                </td>

                                {/* Age */}
                                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                                    {donor.dateOfBirth
                                        ? `${calculateAge(donor.dateOfBirth)} yrs`
                                        : "—"}
                                </td>

                                {/* Location */}
                                <td className="px-5 py-4">
                                    <div className="max-w-[190px]">
                                        <p className="truncate text-sm font-medium text-slate-700">
                                            {donor.city || "—"}
                                        </p>

                                        <p className="truncate text-xs text-slate-400">
                                            {donor.address || "No address"}
                                        </p>
                                    </div>
                                </td>

                                {/* Last Donation */}
                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {formatDate(
                                        donor.lastDonationDate
                                    )}
                                </td>

                                {/* Availability */}
                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClass(
                                            donor.availabilityStatus
                                        )}`}
                                    >
                                        {getAvailabilityLabel(
                                            donor.availabilityStatus
                                        )}
                                    </span>
                                </td>

                                {/* Eligibility */}
                                <td className="px-5 py-4 text-center">
                                    {donor.eligibilityVerified ? (
                                        <div className="flex items-center justify-center gap-1.5 text-green-600">
                                            <ShieldCheck className="h-5 w-5" />

                                            <span className="text-xs font-semibold">
                                                Verified
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-1.5 text-amber-600">
                                            <ShieldAlert className="h-5 w-5" />

                                            <span className="text-xs font-semibold">
                                                Pending
                                            </span>
                                        </div>
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

                                        <DropdownMenuContent
                                            align="end"
                                            className="w-56"
                                        >
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onViewProfile?.(donor)
                                                }
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Profile
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onUpdateStatus?.(
                                                        donor,
                                                        "AVAILABLE"
                                                    )
                                                }
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                                Set Available
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onUpdateStatus?.(
                                                        donor,
                                                        "TEMPORARILY_UNAVAILABLE"
                                                    )
                                                }
                                            >
                                                <ShieldAlert className="mr-2 h-4 w-4 text-amber-600" />
                                                Temporarily Unavailable
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onUpdateStatus?.(
                                                        donor,
                                                        "UNAVAILABLE"
                                                    )
                                                }
                                            >
                                                <XCircle className="mr-2 h-4 w-4 text-slate-500" />
                                                Set Unavailable
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            {donor.eligibilityVerified ? (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onUpdateEligibility?.(
                                                            donor,
                                                            false
                                                        )
                                                    }
                                                >
                                                    <ShieldAlert className="mr-2 h-4 w-4 text-amber-600" />
                                                    Remove Verification
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onUpdateEligibility?.(
                                                            donor,
                                                            true
                                                        )
                                                    }
                                                >
                                                    <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                                                    Verify Eligibility
                                                </DropdownMenuItem>
                                            )}
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