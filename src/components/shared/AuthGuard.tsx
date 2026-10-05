"use client";

import { useProfile } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Spinner } from "../ui/spinner";

function AuthGuard({ children }: { children: ReactNode }) {
    const { data, isPending, isError } = useProfile();
    const router = useRouter();

    const user = data?.data;

    useEffect(() => {
        if (isPending) return;

        if (isError || !user) {
            router.replace("/login");
        }
    }, [isPending, isError, user, router]);

    // Loading profile
    if (isPending) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <Spinner className="h-6 w-6" />
            </div>
        );
    }

    // Profile failed / no authenticated user
    if (isError || !user) {
        router.push('/login')
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-sm text-slate-500">
                    Redirecting to login...
                </p>
            </div>
        );
    }

    return <>{children}</>;
}

export default AuthGuard;