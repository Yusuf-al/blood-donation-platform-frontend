
"use client";

import {
    Bell,
    ChevronDown,
    Menu,
    Search,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({
    onMenuClick,
}: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="lg:hidden"
                        aria-label="Open admin menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
                        <ShieldCheck className="h-4 w-4 text-red-600" />

                        <span className="font-medium text-slate-700">
                            Admin Dashboard
                        </span>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-1.5 sm:gap-3">
                    {/* Search */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 hover:text-slate-900"
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Notifications */}
                    <div className="relative">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-slate-500 hover:text-slate-900"
                            aria-label="Notifications"
                        >
                            <Bell className="h-5 w-5" />
                        </Button>

                        <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-600 ring-2 ring-white" />
                    </div>

                    {/* Divider */}
                    <div className="mx-1 hidden h-7 w-px bg-slate-200 sm:block" />

                    {/* Admin profile */}
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-50"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                            <ShieldCheck className="h-4 w-4 text-red-600" />
                        </div>

                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-semibold leading-4 text-slate-800">
                                Admin
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-400">
                                Administrator
                            </p>
                        </div>

                        <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
                    </button>
                </div>
            </div>
        </header>
    );
}

