"use client"

import { useProfile } from "@/hooks";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext(undefined)

export function AuthProvider({
    children
}: { children: ReactNode }) {
    const { data, isPending, isError } = useProfile()

    const user = data?.data;

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

    return <AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthGuard"
        );
    }
    return context;
}