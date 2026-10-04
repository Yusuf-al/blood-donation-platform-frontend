"use client"
import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google.provider";


function Providers({ children }: { children: ReactNode }) {
    return (
        <GoogleAuthProvider>

            <QueryProvider>{children}</QueryProvider>
        </GoogleAuthProvider>
    )
}

export default Providers