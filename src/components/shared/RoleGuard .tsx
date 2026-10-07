"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useProfile } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { UserRole } from "@/types/role.types";
import AccessDenied from "./AccessDenied";
import RedirectingToLogin from "./RedirectingToLogin";

interface RoleGuardProps {
    children: ReactNode;
    roles: UserRole[];
}

function RoleGuard({ children, roles }: RoleGuardProps) {
    const router = useRouter();
    const { data, isPending, isError } = useProfile();

    const user = data?.data;
    const isAuthorized = !!user && roles.includes(user.role);

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

    if (isError || !user) return <RedirectingToLogin />;
    if (!isAuthorized) return <AccessDenied />;

    return <>{children}</>;
}

export default RoleGuard;