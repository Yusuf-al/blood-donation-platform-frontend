"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useProfile } from "@/hooks";
import { Spinner } from "../ui/spinner";

function AuthGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { data, isPending, isError } = useProfile();
    const user = data?.data;

    useEffect(() => {
        if (!isPending && (isError || !user)) {
            router.replace("/login");
        }
    }, [isPending, isError, user, router]);

    if (isPending) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner className="h-6 w-6" />
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-sm text-slate-500">Redirecting to login...</p>
            </div>
        );
    }

    return <>{children}</>;
}

export default AuthGuard;