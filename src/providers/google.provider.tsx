"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

function GoogleAuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const clientId = "877726872475-c0eqvps8uq110jugqnindh6l0a18hi10.apps.googleusercontent.com";

    if (!clientId) {
        console.error(
            "NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured."
        );

        return <>{children}</>;
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
}

export default GoogleAuthProvider;