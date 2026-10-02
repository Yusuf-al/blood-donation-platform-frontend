"use client";

import { useProfile } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Spinner } from "../ui/spinner";
import { UserRole } from "@/types/role.types";
import AccessDenied from "./AccessDenied";
import RedirectingToLogin from "./RedirectingToLogin";

interface RoleGurad {
    children: ReactNode,
    roles: UserRole[]
}

function RoleGuard({ children, roles }: RoleGurad) {
    const { data, isPending, isError } = useProfile();
    const router = useRouter();

    const user = data?.data;

    const isAuthorized = !!user && roles.includes(user.role)

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
        return <RedirectingToLogin />
    }

    if (!isAuthorized) {
        return <AccessDenied />
    }
    return <>{children}</>;
}

export default RoleGuard;