"use client";

import {
    CalendarDays,
    Mail,
    MapPin,
    Phone,
    Shield,
    User,
} from "lucide-react";

//import { UserProfile } from "@/types/profile";

interface ProfileInformationProps {
    profile: any;
}

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-muted p-2">
                {icon}
            </div>

            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-medium">
                    {value || "Not provided"}
                </p>
            </div>
        </div>
    );
}

export function ProfileInformation({
    profile,
}: ProfileInformationProps) {


    return (
        <section className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">
                Personal Information
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem
                    icon={<User className="h-4 w-4" />}
                    label="Full Name"
                    value={profile.name}
                />

                <InfoItem
                    icon={<Mail className="h-4 w-4" />}
                    label="Email"
                    value={profile.email}
                />

                <InfoItem
                    icon={<Phone className="h-4 w-4" />}
                    label="Phone"
                    value={profile.phone}
                />

                <InfoItem
                    icon={<MapPin className="h-4 w-4" />}
                    label="City"
                    value={profile.city}
                />

                <InfoItem
                    icon={<MapPin className="h-4 w-4" />}
                    label="Address"
                    value={profile.address}
                />

                <InfoItem
                    icon={<Shield className="h-4 w-4" />}
                    label="Account Status"
                    value={profile.status}
                />

                <InfoItem
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Member Since"
                    value={new Date(profile.createdAt).toLocaleDateString()}
                />
            </div>
        </section>
    );
}