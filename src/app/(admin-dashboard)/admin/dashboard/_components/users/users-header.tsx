import { Users } from "lucide-react";

export default function UsersHeader() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                        <Users className="h-5 w-5 text-red-600" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Users
                    </h1>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                    Manage FASTBlood users and their account status.
                </p>
            </div>
        </div>
    );
}