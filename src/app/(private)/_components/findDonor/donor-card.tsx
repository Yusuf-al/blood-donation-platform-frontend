import {
    CalendarDays,
    Droplets,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";



import { Donor } from "@/types/donor.types";
import DonorAvatar from "./donor-avatar";

interface DonorCardProps {
    donor: any;
}

function formatDate(date?: string | null) {
    if (!date) return "Not available";

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

const BLOOD_GROUP_LABELS: Record<string, string> = {
    A_POSITIVE: "A+",
    A_NEGATIVE: "A-",
    B_POSITIVE: "B+",
    B_NEGATIVE: "B-",
    AB_POSITIVE: "AB+",
    AB_NEGATIVE: "AB-",
    O_POSITIVE: "O+",
    O_NEGATIVE: "O-",
};

export function formatBloodGroup(value: string) {
    return BLOOD_GROUP_LABELS[value] ?? value;
}



export default function DonorCard({ donor }: DonorCardProps) {

    const completedCount = donor.assignments.filter(
        (assignment: any) => assignment.status === "COMPLETED"
    ).length;
    return (
        <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-md">
            {/* Header */}
            <div className="flex items-start gap-4">
                <DonorAvatar
                    name={donor.user.name}
                    image={donor.user.imageUrl}
                />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="truncate text-lg font-semibold text-slate-900">
                                {donor.user.name}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span className="truncate">{donor.city}</span>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1.5 text-sm font-bold text-red-600">
                            <Droplets className="h-4 w-4" />
                            {formatBloodGroup(donor.bloodGroup)}
                        </div>
                    </div>

                    <div className="mt-3">
                        {donor.availabilityStatus === "AVAILABLE" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                Available to Donate
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                Currently Unavailable
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Information */}
            <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-start gap-3 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <div>
                        <p className="text-xs text-slate-400">Address</p>
                        <p className="mt-0.5 text-slate-700">
                            {donor.address || "Not available"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                    <div>
                        <p className="text-xs text-slate-400">Phone</p>
                        <p className="text-slate-700">
                            {donor.user.phone || "Not available"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                    <div className="min-w-0">
                        <p className="text-xs text-slate-400">Email</p>
                        <p className="truncate text-slate-700">
                            {donor.user.email || "Not available"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Donation statistics */}
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <div className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-400" />
                        <span className="text-xs text-slate-500">
                            Last Donation
                        </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                        {formatDate(donor.lastDonationDate)}
                    </p>
                </div>

                <div className="rounded-xl bg-red-50 p-3">
                    <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-red-600">
                            Donations
                        </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-red-700">
                        {completedCount} {completedCount === 1 ? "donation" : "donations"}
                    </p>
                </div>
            </div>
        </article>
    );
}