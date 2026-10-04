import { ReactNode } from "react";
import Navbar from "../../components/shared/NavBar";
import { AuthProvider } from "@/context/auth.context";
function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </main>


        </div>
    );
}

export default PublicLayout;