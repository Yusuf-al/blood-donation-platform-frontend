"use client"
import AuthGuard from '@/components/shared/AuthGuard';
import { useAuth } from '@/context/auth.context';
import React from 'react'
import { ProfilePage } from '../_components/ProfilePage';
import { User } from '@/types/user.types';
import { useDonorAssignments } from '@/hooks/donor.hook';
import { useBloodRequest, useGetBloodRequest } from '@/hooks/br.hook';
import { Spinner } from '@/components/ui/spinner';

function MyProfile() {
    const { user, isPending } = useAuth()

    const { data: assignments } = useDonorAssignments()
    const { data: bloodRequest } = useGetBloodRequest(null)

    const allBloodRequests = bloodRequest?.data?.data ?? []

    if (isPending) {
        return <Spinner />
    }
    return (
        <AuthGuard>
            <ProfilePage
                profile={user!}
                activeRequests={allBloodRequests}
                requestHistory={allBloodRequests}
                donorInformation={user}
                assignedDonationRequests={assignments?.data ?? []}
                donationHistory={assignments?.data ?? []}
            />
        </AuthGuard>
    )
}

export default MyProfile
