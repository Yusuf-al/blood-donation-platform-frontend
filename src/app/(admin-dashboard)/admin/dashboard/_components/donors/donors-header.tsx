"use client";

import {
    Droplets,
    UserRoundCheck,
} from "lucide-react";

export default function DonorsHeader() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                        <UserRoundCheck className="h-5 w-5 text-red-600" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                            Donors
                        </h1>

                        <p className="text-sm text-slate-500">
                            Manage registered blood donors and their eligibility.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                <Droplets className="h-4 w-4 text-red-600" />

                <span className="text-sm font-medium text-red-700">
                    Donor Management
                </span>
            </div>
        </div>
    );
}