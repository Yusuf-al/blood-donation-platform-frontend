import { Loader2 } from "lucide-react";

function RedirectingToLogin() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-red-600" />

            <p className="text-sm font-medium text-slate-600">
                Redirecting to login...
            </p>
        </div>
    );
}

export default RedirectingToLogin;