"use client";

import { useRouter } from "next/navigation";
import {
    ActiveBloodRequests,
    AdminProfile,
    AssignedDonationRequests,
    DonationHistory,
    DonorInformation,
    ProfileHeader,
    ProfileInformation,
    ProfileStats,
    RequestHistory
} from "./profile";
import { BloodDonationAssignment, BloodRequest, User } from "@/types/user.types";


interface ProfilePageProps {
    profile: User;

    activeRequests: BloodRequest[];

    requestHistory: BloodRequest[];

    donorInformation?: User;

    assignedDonationRequests?: BloodDonationAssignment[];

    donationHistory?: any[];
}

export function ProfilePage({
    profile,
    activeRequests,
    requestHistory,
    donorInformation,
    assignedDonationRequests,
    donationHistory,
}: ProfilePageProps) {
    const router = useRouter();

    const handleViewRequest = (requestId: string) => {
        router.push(`/blood-requests/${requestId}`);
    };
    return (
        <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8">
            <ProfileHeader
                profile={profile}
                onEdit={() => router.push("/profile/edit")}
            />

            <ProfileInformation profile={profile} />

            {profile.role === "ADMIN" && (
                <AdminProfile profile={profile} />
            )}

            {profile.role === "REQUESTER" && (
                <>
                    <ActiveBloodRequests
                        requests={activeRequests}
                        onView={handleViewRequest}
                    />

                    <RequestHistory
                        requests={requestHistory}
                        onView={handleViewRequest}
                    />
                </>
            )}

            {profile.role === "DONOR" && donorInformation && (
                <>
                    <ProfileStats donor={donorInformation} />

                    {/* <DonorInformation donor={donorInformation} /> */}

                    {/* A donor can also request blood */}
                    <ActiveBloodRequests
                        requests={activeRequests}
                        onView={handleViewRequest}
                    />

                    <RequestHistory
                        requests={requestHistory}
                        onView={handleViewRequest}
                    />

                    {/* Requests assigned to this donor */}
                    <AssignedDonationRequests
                        assignments={assignedDonationRequests}
                        onView={handleViewRequest}
                    />

                    {/* Completed donations */}
                    <DonationHistory
                        donations={donationHistory}
                        onView={handleViewRequest}
                    />
                </>
            )}
        </main>
    );
}