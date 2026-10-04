import { SearchX } from "lucide-react";

export default function EmptyDonors() {
    return (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <SearchX className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No donors found
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500">
                Try changing your search or filter options to find
                available blood donors.
            </p>
        </div>
    );
}