import { ReactNode } from "react";
import AdminShell from "./dashboard/_components/admin-shell";
import RoleGuard from "@/components/shared/RoleGuard ";


interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({
    children,
}: AdminLayoutProps) {
    return <AdminShell>
        <RoleGuard roles={["ADMIN"]}>

            {children}
        </RoleGuard>
    </AdminShell>;
}