"use client";

import { ReactNode, useState } from "react";

import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";

interface AdminShellProps {
    children: ReactNode;
}

export default function AdminShell({
    children,
}: AdminShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <AdminSidebar
                mobileOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-64">
                <AdminHeader
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}