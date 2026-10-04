"use client";

import Image from "next/image";
import { Pencil, ShieldCheck } from "lucide-react";

// import { UserProfile } from "@/types/profile";

interface ProfileHeaderProps {
    profile: any;
    onEdit?: () => void;
}

export function ProfileHeader({
    profile,
    onEdit,
}: ProfileHeaderProps) {

    const initials = "Yusuf Al"
        ?.split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="rounded-2xl border bg-card p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full bg-primary/10">
                        {profile.avatar ? (
                            <Image
                                src={profile.avatar}
                                alt={profile.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-primary">
                                {initials}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-semibold">
                                {profile.name}
                            </h1>

                            {profile.isVerified && (
                                <ShieldCheck className="h-5 w-5 text-primary" />
                            )}
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {profile.email}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                {profile.role}
                            </span>

                            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                                {profile.status}
                            </span>

                            {profile.isPremiumUser && (
                                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                                    Premium
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
}