import { ShieldX } from "lucide-react";

function AccessDenied() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <ShieldX className="h-6 w-6 text-red-600" />
            </div>

            <div>
                <h2 className="text-lg font-semibold text-slate-900">
                    Access Denied
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    You don't have permission to access this page.
                </p>
            </div>
        </div>
    );
}

export default AccessDenied;