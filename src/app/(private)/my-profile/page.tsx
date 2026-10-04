"use client"
import AuthGuard from '@/components/shared/AuthGuard';
import { useAuth } from '@/context/auth.context';
import React from 'react'
import { ProfilePage } from '../_components/ProfilePage';

function MyProfile() {
    const user = useAuth()
    console.log(user)
    return (
        <AuthGuard>
            <ProfilePage
                profile={user}
                activeRequests={user}
                requestHistory={user}
                donorInformation={user}
                assignedDonationRequests={user}
                donationHistory={user}
            />
        </AuthGuard>
    )
}

export default MyProfile
