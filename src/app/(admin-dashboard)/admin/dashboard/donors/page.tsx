"use client";

import { useRouter } from "next/navigation";

import { useDonors } from "@/hooks/donor.hook";
import { useQueryFilter } from "@/hooks/query.hook";
import DonorsHeader from "../_components/donors/donors-header";
import DonorsFilter from "../_components/donors/donors-filter";
import DonorsList from "../_components/donors/donors-list";
import { IDonorProfile } from "@/types/donor.types";
import { donorAvailabilityUpdateApi, donorProfileVerifyApi } from "@/api/admin.api";
import { toast } from "sonner";
import Pagination from "@/components/shared/pagination";

export default function DonorsPage() {
    const router = useRouter();

    const { getQuery } = useQueryFilter();

    const searchTerm = getQuery("searchTerm");
    const city = getQuery("city");
    const bloodGroup = getQuery("bloodGroup");

    const availabilityStatus =
        getQuery("availabilityStatus");

    const eligibilityVerified =
        getQuery("eligibilityVerified");

    const page =
        Number(getQuery("page")) || 1;

    const {
        data,
        isPending,
        isError,
        refetch,
    } = useDonors({
        page,
        searchTerm:
            searchTerm || undefined,
        city: city || undefined,
        bloodGroup:
            bloodGroup || undefined,
        availabilityStatus:
            availabilityStatus || undefined,
        eligibilityVerified:
            eligibilityVerified === "true"
                ? true
                : eligibilityVerified === "false"
                    ? false
                    : undefined,
    });

    const donors =
        data?.data?.data ?? [];

    const meta = data?.data?.meta;

    const totalPages =
        meta?.totalPage ??
        meta?.totalPages ??
        1;

    const handleViewProfile = (
        donor: IDonorProfile
    ) => {
        router.push(
            `/admin/donors/${donor.id}`
        );
    };

    const handleUpdateStatus = async (
        donor: IDonorProfile,
        status: any
    ) => {
        try {
            await donorAvailabilityUpdateApi(donor.id, { availability: status })
            toast.success("Donor Availability Updated")

            await refetch()
        } catch (error) {
            toast.error("Something went wrong")
            console.error(
                "Failed to update user status:",
                error)
        }
    };

    const handleUpdateEligibility = async (
        donor: IDonorProfile,
    ) => {
        try {
            if (!donor) return
            await donorProfileVerifyApi(donor.id)
            toast.success("Donor Eligibility Verified")
            await refetch()
        } catch (error) {
            toast.error("Something went wrong")
            console.error(
                "Failed to update user status:",
                error)
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <DonorsHeader />

            {/* Filters */}
            <DonorsFilter />

            {/* Content */}
            {isPending ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="text-center">
                        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-red-600" />

                        <p className="mt-3 text-sm text-slate-500">
                            Loading donors...
                        </p>
                    </div>
                </div>
            ) : isError ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-red-600">
                            Failed to load donors.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-2 text-sm font-medium text-red-700 underline underline-offset-4"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Result summary */}
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Registered Donors
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage donor profiles, availability
                                and eligibility verification.
                            </p>
                        </div>

                        <p className="hidden text-sm text-slate-500 sm:block">
                            {donors.length} donor
                            {donors.length !== 1
                                ? "s"
                                : ""}{" "}
                            found
                        </p>
                    </div>

                    {/* Donor List */}
                    <DonorsList
                        donors={donors}
                        onViewProfile={
                            handleViewProfile
                        }
                        onUpdateStatus={
                            handleUpdateStatus
                        }
                        onUpdateEligibility={
                            handleUpdateEligibility
                        }
                    />

                    {/* Pagination */}
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                    />
                </>
            )}
        </div>
    );
}