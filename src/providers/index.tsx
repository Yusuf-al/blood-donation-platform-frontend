"use client";

import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google.provider";
import { AuthProvider } from "@/context/auth.context"; // adjust to your export name

function Providers({ children }: { children: ReactNode }) {
    return (
        <GoogleAuthProvider>
            <QueryProvider>
                <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
        </GoogleAuthProvider>
    );
}

export default Providers;