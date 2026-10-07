
"use client";

import { useState } from "react";
import {
    HeartHandshake,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";
import DonationRequestFilters from "../_components/myDonation/donation-request-filters";
import DonationRequestGrid from "../_components/myDonation/donation-request-grid";
import DonationRequestDetailsDialog from "../_components/myDonation/donation-request-details-dialog";
import RoleGuard from "@/components/shared/RoleGuard ";
import { useAuth } from "@/context/auth.context";
import { BloodDonationAssignment } from "@/types/assignment.types";



export default function MyDonationRequestsPage() {


    const [selectedRequest, setSelectedRequest] =
        useState<BloodDonationAssignment | null>(null);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    const [
        acceptingRequestId,
        setAcceptingRequestId,
    ] = useState<string | null>(null);

    const [
        rejectingRequestId,
        setRejectingRequestId,
    ] = useState<string | null>(null);

    const [
        completingRequestId,
        setCompletingRequestId,
    ] = useState<string | null>(null);

    const handleViewDetails = (
        request: BloodDonationAssignment
    ) => {
        setSelectedRequest(request);
        setDetailsOpen(true);
    };

    const handleAccept = async (
        requestId: string
    ) => {
        try {
            setAcceptingRequestId(requestId);

            // Replace with:
            // await acceptDonationRequestMutation.mutateAsync(
            //   requestId
            // );

            await new Promise((resolve) =>
                setTimeout(resolve, 700)
            );

            toast.success(
                "Donation request accepted successfully."
            );

            setDetailsOpen(false);

            // Invalidate/refetch donation requests here.
        } catch {
            toast.error(
                "Unable to accept the donation request."
            );
        } finally {
            setAcceptingRequestId(null);
        }
    };

    const handleReject = async (
        requestId: string
    ) => {
        try {
            setRejectingRequestId(requestId);

            // Replace with:
            // await rejectDonationRequestMutation.mutateAsync(
            //   requestId
            // );

            await new Promise((resolve) =>
                setTimeout(resolve, 700)
            );

            toast.success(
                "Donation request rejected."
            );

            setDetailsOpen(false);

            // Invalidate/refetch here.
        } catch {
            toast.error(
                "Unable to reject the donation request."
            );
        } finally {
            setRejectingRequestId(null);
        }
    };

    const handleComplete = async (
        requestId: string
    ) => {
        try {
            setCompletingRequestId(requestId);

            // Replace with:
            // await completeDonationRequestMutation.mutateAsync(
            //   requestId
            // );

            await new Promise((resolve) =>
                setTimeout(resolve, 700)
            );

            toast.success(
                "Donation marked as completed."
            );

            setDetailsOpen(false);

            // Invalidate/refetch here.
        } catch {
            toast.error(
                "Unable to complete the donation."
            );
        } finally {
            setCompletingRequestId(null);
        }
    };

    const user = useAuth()


    const donorAssigments = user.assignments as BloodDonationAssignment[]

    return <RoleGuard roles={["DONOR"]}>
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                            <HeartHandshake className="h-6 w-6 text-red-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                                My Donation Requests
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
                                Manage blood donation requests assigned
                                to you and keep track of your donations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-6 sm:py-8">
                <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6 lg:px-8">
                    <DonationRequestFilters />

                    <DonationRequestGrid
                        assignemts={donorAssigments}
                        onViewDetails={handleViewDetails}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        onComplete={handleComplete}
                        acceptingRequestId={
                            acceptingRequestId
                        }
                        rejectingRequestId={
                            rejectingRequestId
                        }
                        completingRequestId={
                            completingRequestId
                        }
                    />
                </div>
            </section>

            {/* Details */}
            <DonationRequestDetailsDialog
                assignment={selectedRequest}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                onAccept={handleAccept}
                onReject={handleReject}
                onComplete={handleComplete}
                isAccepting={
                    selectedRequest?.id ===
                    acceptingRequestId
                }
                isRejecting={
                    selectedRequest?.id ===
                    rejectingRequestId
                }
                isCompleting={
                    selectedRequest?.id ===
                    completingRequestId
                }
            />
        </main>
    </RoleGuard>

}