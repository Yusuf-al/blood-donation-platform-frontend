"use client";

import {
    createContext,
    useContext,
    type ReactNode,
} from "react";

import { useProfile } from "@/hooks";
import { User } from "@/types/user.types";

interface AuthContextType {
    user: User | undefined;
    isPending: boolean;
    isError: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data, isPending, isError } = useProfile();


    const user: User | undefined = data?.data;

    return (
        <AuthContext.Provider value={{ user, isPending, isError }}>
            {children}
        </AuthContext.Provider>
    );


}

export function useAuth() {
    const context = useContext(AuthContext);


    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;


}
