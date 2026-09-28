import { ReactNode } from "react";
import { Footer } from "./_components/footer";

function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default PublicLayout;