"use client";

import { createContext, useContext, type ReactNode } from "react";

import { useProfile } from "@/hooks";
import { User } from "@/types/user.types";

const AuthContext = createContext<User | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data, isPending, isError } = useProfile();

    const user: User | undefined = data?.data;

    if (isPending) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                Loading...
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                Redirecting to login...
            </div>
        );
    }

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}