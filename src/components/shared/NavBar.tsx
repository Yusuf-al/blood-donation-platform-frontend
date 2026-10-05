
"use client";

import Link from "next/link";
import {
    HeartPulse,
    Menu,
    X,
    ChevronDown,
    UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query"

import ProfileDropdown from "./profile-dropdown";
import { useLogout, useProfile } from "@/hooks";

const navItems = [
    {
        label: "Find Blood",
        href: "/find-blood",
    },
    {
        label: "Become a Donor",
        href: "/become-donor",
    },
    {
        label: "Make a Request",
        href: "/blood-request",
    },
    {
        label: "How It Works",
        href: "/how-it-works",
    },
    {
        label: "About",
        href: "/about",
    },
];

type UserData = {
    name: string;
    email: string;
    imageUrl: string | null;
};

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { data, isLoading } = useProfile();
    const { mutate: logout } = useLogout();

    const queryClient = useQueryClient()

    const user = data
        ? {
            name: data?.data?.name,
            email: data?.data?.email,
            imageUrl: data?.data?.imageUrl ?? null,
        }
        : null;


    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.success("Logout successful!");
                setMobileOpen(false);
                queryClient.removeQueries({ queryKey: ["user"] })
            },
            onError: () => {
                toast.error("Logout failed. Please try again.");
            },
        });
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center px-5 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">
                        <HeartPulse
                            className="h-5 w-5"
                            strokeWidth={2.5}
                        />
                    </div>

                    <div className="leading-none">
                        <span className="text-xl font-extrabold tracking-tight text-red-600">
                            FAST
                        </span>

                        <span className="text-xl font-extrabold tracking-tight text-slate-900">
                            Blood
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="ml-auto hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                            {item.label}
                        </Link>
                    ))}


                </nav>

                {/* Desktop Actions */}
                <div className="ml-4 hidden items-center gap-2 lg:flex">
                    {isLoading ? (
                        // Loading state
                        <div className="h-10 w-28 animate-pulse rounded-full bg-slate-100" />
                    ) : user ? (
                        // Logged-in user
                        <ProfileDropdown
                            user={user}
                            onLogout={handleLogout}
                        />
                    ) : (
                        // Guest user
                        <>
                            <Link
                                href="/login"
                                className="flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                            >
                                <UserRound className="h-4 w-4" />
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                className="flex h-10 items-center rounded-full bg-red-600 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
                    aria-label={
                        mobileOpen ? "Close menu" : "Open menu"
                    }
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <div className="border-t border-slate-100 bg-white px-5 pb-5 lg:hidden">
                    <nav className="mx-auto flex max-w-7xl flex-col pt-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="mt-3 border-t border-slate-100 pt-4">
                            {isLoading ? (
                                <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100" />
                            ) : user ? (
                                <ProfileDropdown
                                    user={user}
                                    onLogout={handleLogout}
                                />
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex h-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/signup"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex h-11 items-center justify-center rounded-full bg-red-600 text-sm font-semibold text-white"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Navbar;

