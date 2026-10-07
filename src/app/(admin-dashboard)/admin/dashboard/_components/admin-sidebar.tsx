
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Activity,
    BarChart3,
    CreditCard,
    Droplets,
    HeartHandshake,
    LayoutDashboard,
    LogOut,
    Settings,
    ShieldCheck,
    Users,
    UserRoundCheck,
    WalletCards,
    X,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface AdminSidebarProps {
    mobileOpen?: boolean;
    onClose?: () => void;
}

const navigation = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
];

const managementNavigation = [
    {
        label: "Users",
        href: "/admin/dashboard/users",
        icon: Users,
    },
    {
        label: "Donors",
        href: "/admin/dashboard/donors",
        icon: UserRoundCheck,
    },
];

const bloodNavigation = [
    {
        label: "Blood Requests",
        href: "/admin/dashboard/blood-requests",
        icon: Droplets,
    },
    {
        label: "Donation Assignments",
        href: "/admin/dashboard/donation-assignments",
        icon: HeartHandshake,
    },
    {
        label: "Donations",
        href: "/admin/dashboard/donations",
        icon: Activity,
    },
];

const financeNavigation = [
    {
        label: "Subscriptions",
        href: "/admin/dashboard/subscriptions",
        icon: WalletCards,
    },
    {
        label: "Payments",
        href: "/admin/dashboard/payments",
        icon: CreditCard,
    },
];

const systemNavigation = [
    {
        label: "Reports",
        href: "/admin/dashboard/reports",
        icon: BarChart3,
    },
    {
        label: "Settings",
        href: "/admin/dashboard/settings",
        icon: Settings,
    },
];

function NavigationSection({
    title,
    items,
    pathname,
    onClose,
}: {
    title: string;
    items: typeof navigation;
    pathname: string;
    onClose?: () => void;
}) {
    return (
        <div className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {title}
            </p>

            <nav className="space-y-1">
                {items.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                        item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-red-50 text-red-600"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-[18px] w-[18px]",
                                    isActive
                                        ? "text-red-600"
                                        : "text-slate-400"
                                )}
                            />

                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default function AdminSidebar({
    mobileOpen = false,
    onClose,
}: AdminSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
                />
            )}

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200",
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
                    <Link
                        href="/admin"
                        onClick={onClose}
                        className="flex items-center gap-2.5"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600">
                            <Droplets className="h-5 w-5 fill-white text-white" />
                        </div>

                        <div>
                            <p className="text-lg font-bold leading-none text-slate-900">
                                FAST<span className="text-red-600">Blood</span>
                            </p>

                            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                Admin Panel
                            </p>
                        </div>
                    </Link>

                    {/* Mobile close */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700 lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-3 py-5">
                    <NavigationSection
                        title="Overview"
                        items={navigation}
                        pathname={pathname}
                        onClose={onClose}
                    />

                    <NavigationSection
                        title="User Management"
                        items={managementNavigation}
                        pathname={pathname}
                        onClose={onClose}
                    />

                    <NavigationSection
                        title="Blood Management"
                        items={bloodNavigation}
                        pathname={pathname}
                        onClose={onClose}
                    />

                    <NavigationSection
                        title="Finance"
                        items={financeNavigation}
                        pathname={pathname}
                        onClose={onClose}
                    />

                    <NavigationSection
                        title="System"
                        items={systemNavigation}
                        pathname={pathname}
                        onClose={onClose}
                    />
                </div>

                {/* Admin badge / footer */}
                <div className="border-t border-slate-100 p-3">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                            <ShieldCheck className="h-4 w-4 text-red-600" />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                                Administrator
                            </p>

                            <p className="text-xs text-slate-500">
                                Full system access
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mt-2 flex h-9 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign out
                    </button>
                </div>
            </aside>
        </>
    );
}

