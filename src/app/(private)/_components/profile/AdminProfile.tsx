"use client";

import { ShieldCheck } from "lucide-react";

//import { UserProfile } from "@/types/profile";

interface AdminProfileProps {
    profile: any;
}

export function AdminProfile({
    profile,
}: AdminProfileProps) {
    return (
        <section className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold">
                        Administrator Account
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Your administrator account information
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                    <p className="text-xs text-muted-foreground">
                        Role
                    </p>

                    <p className="mt-1 font-medium">
                        {profile.role}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-muted-foreground">
                        Account Status
                    </p>

                    <p className="mt-1 font-medium">
                        {profile.status}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-muted-foreground">
                        Email Verification
                    </p>

                    <p className="mt-1 font-medium">
                        {profile.isVerified
                            ? "Verified"
                            : "Not Verified"}
                    </p>
                </div>
            </div>
        </section>
    );
}