"use client";

import { HeartPulse } from "lucide-react";

//import { DonorInformation as DonorInfo } from "@/types/profile";

interface DonorInformationProps {
    donor: any;
}

export function DonorInformation({
    donor,
}: DonorInformationProps) {
    const donorProfile = donor?.donorProfile
    return (
        <section className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3">
                    <HeartPulse className="h-5 w-5 text-primary" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold">
                        Donor Information
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Your donor status and donation information
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <p className="text-sm text-muted-foreground">
                        Blood Group
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                        {donorProfile?.bloodGroup}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Availability
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                        {donorProfile.availabilityStatus}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Total Donations
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                        {donorProfile.totalDonations}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">
                        Last Donation
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                        {donorProfile.lastDonationDate
                            ? new Date(
                                donorProfile.lastDonationDate
                            ).toLocaleDateString()
                            : "Never"}
                    </p>
                </div>
            </div>
        </section>
    );
}