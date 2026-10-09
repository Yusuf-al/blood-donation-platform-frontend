"use client";

import { HeartHandshake } from "lucide-react";

export default function DonationAssignmentsHeader() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    <HeartHandshake className="h-5 w-5 text-red-600" />
                </div>

                <div>
                    <h1 className="text-xl font-bold text-slate-900">
                        Donation Assignments
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage donor assignments and monitor donation progress.
                    </p>
                </div>
            </div>
        </div>
    );
}