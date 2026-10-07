"use client"
import AuthGuard from '@/components/shared/AuthGuard';
import { useAuth } from '@/context/auth.context';
import React from 'react'
import { ProfilePage } from '../_components/ProfilePage';
import { User } from '@/types/user.types';

function MyProfile() {
    const user: User = useAuth()
    return (
        <AuthGuard>
            <ProfilePage
                profile={user}
                activeRequests={user.requests}
                requestHistory={user.requests}
                donorInformation={user}
                assignedDonationRequests={user.assignments}
                donationHistory={user.assignments}
            />
        </AuthGuard>
    )
}

export default MyProfile
