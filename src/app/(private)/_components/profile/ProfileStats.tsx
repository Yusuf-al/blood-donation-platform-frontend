"use client";

import {
    CalendarHeart,
    Droplets,
    HeartPulse,
} from "lucide-react";

//import { DonorInformation } from "@/types/profile";

interface ProfileStatsProps {
    donor: any;
}

export function ProfileStats({ donor }: ProfileStatsProps) {
    const donorProfile = donor?.donorProfile
    const stats = [
        {
            label: "Blood Group",
            value: donorProfile.bloodGroup,
            icon: Droplets,
        },
        {
            label: "Total Donations",
            value: donorProfile.totalDonations,
            icon: HeartPulse,
        },
        {
            label: "Last Donation",
            value: donorProfile.lastDonationDate
                ? new Date(donorProfile.lastDonationDate).toLocaleDateString()
                : "Never",
            icon: CalendarHeart,
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="rounded-2xl border bg-card p-5"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {stat.label}
                                </p>

                                <p className="mt-2 text-2xl font-bold">
                                    {stat.value}
                                </p>
                            </div>

                            <div className="rounded-xl bg-primary/10 p-3">
                                <Icon className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}