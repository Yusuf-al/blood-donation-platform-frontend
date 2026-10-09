import {
    Droplets,
    ClipboardList,
} from "lucide-react";

export default function BloodRequestsHeader() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                    <ClipboardList className="h-5 w-5 text-red-600" />
                </div>

                <div>
                    <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Blood Requests
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage blood requests and assign compatible donors.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
                <Droplets className="h-4 w-4 text-red-600" />

                <span className="text-sm font-medium text-red-700">
                    Blood Management
                </span>
            </div>
        </div>
    );
}