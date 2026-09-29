import { ReactNode } from "react";
import { Footer } from "./_components/footer";
import Navbar from "./_components/NavBar";

function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>


        </div>
    );
}

export default PublicLayout;