
"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ChevronDown,
    GitPullRequestCreate,
    LayoutDashboard,
    LogOut,
    Settings,
    User,
    UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type UserData = {
    name: string;
    email: string;
    imageUrl: string | null;
    role: string;
    isPremiumUser: boolean;
    isVerified: boolean;
};

type ProfileDropdownProps = {
    user: UserData;
    onLogout: () => void;
};

function ProfileDropdown({
    user,
    onLogout,
}: ProfileDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const closeDropdown = () => {
        setOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
            {/* Profile Button */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-1.5 pr-3 transition-colors hover:bg-slate-100"
                aria-expanded={open}
                aria-haspopup="menu"
            >
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-50">
                    {user.imageUrl ? (
                        <Image
                            src={user.imageUrl}
                            alt={user.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                        />
                    ) : (
                        <UserRound className="h-5 w-5 text-red-600" />
                    )}
                </div>

                <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                    {user.name}
                </span>

                <ChevronDown
                    className={`h - 4 w - 4 text - slate - 400 transition - transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-100"
                >
                    {/* User Information */}
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-50">
                            {user.imageUrl ? (
                                <Image
                                    src={user.imageUrl}
                                    alt={user.name}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                />
                            ) : (
                                <UserRound className="h-5 w-5 text-red-600" />
                            )}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                                {user.name}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="my-2 h-px bg-slate-100" />
                    {user.role === 'ADMIN' &&

                        <Link
                            href="/admin-dashboard"
                            onClick={closeDropdown}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600"
                            role="menuitem"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                    }
                    {user.role === 'DONOR' &&

                        <Link
                            href="/all-requests"
                            onClick={closeDropdown}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600"
                            role="menuitem"
                        >
                            <GitPullRequestCreate className="h-4 w-4" />
                            All Blood Requests
                        </Link>
                    }

                    {/* Profile */}
                    <Link
                        href="/my-profile"
                        onClick={closeDropdown}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600"
                        role="menuitem"
                    >
                        <User className="h-4 w-4" />
                        Profile
                    </Link>

                    {/* Settings */}
                    <Link
                        href="/settings"
                        onClick={closeDropdown}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600"
                        role="menuitem"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>

                    <div className="my-2 h-px bg-slate-100" />

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={() => {
                            closeDropdown();
                            onLogout();
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        role="menuitem"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;

