"use client";

import { Donor } from "@/types/donor.types";
import { useMemo, useState } from "react";
import FindDonorsHeader from "../_components/findDonor/find-donors-header";
import DonorFilters from "../_components/findDonor/donor-filters";
import DonorSearch from "../_components/findDonor/donor-search";
import DonorGrid from "../_components/findDonor/donor-grid";
import { useDonors } from "@/hooks/donor.hook";
import { useSearchParams } from "next/navigation";
import { useQueryFilter } from "@/hooks/query.hook";
import { useAuth } from "@/context/auth.context";
import { User } from "@/types/user.types";


export default function FindDonorsPage() {
    const { getQuery } = useQueryFilter();

    const user: User = useAuth()

    const searchTerm = getQuery("searchTerm");
    const city = getQuery("city");
    const bloodGroup = getQuery("bloodGroup");
    const availabilityStatus =
        getQuery("availabilityStatus");

    const page = Number(getQuery("page")) || 1;

    const { data, isPending, isError } = useDonors({
        page,
        searchTerm: searchTerm || undefined,
        city: city || undefined,
        bloodGroup: bloodGroup || undefined,
        availabilityStatus:
            availabilityStatus || undefined
    })


    const donorsProfile =
        data?.data?.data ?? [];

    if (isPending) {
        return <div>Loading donors...</div>;
    }

    if (isError) {
        return <div>Failed to load donors.</div>;
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <FindDonorsHeader />

            <section className="py-8 sm:py-10">
                <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
                    {/* Search */}
                    <DonorSearch />
                    {/* Filters */}
                    <DonorFilters />

                    {/* Result count */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Available Donors
                            </h2>

                            <p className="text-sm text-slate-500">
                                {donorsProfile.length} donor
                                {donorsProfile.length !== 1 ? "s" : ""} found
                            </p>
                        </div>
                    </div>

                    {/* Donors */}
                    <DonorGrid donors={donorsProfile} />
                </div>
            </section>
        </main>
    );
}


