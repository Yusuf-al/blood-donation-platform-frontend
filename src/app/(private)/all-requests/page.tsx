"use client";

import { useState } from "react";
import { HeartPulse } from "lucide-react";
import { toast } from "sonner";

import { BloodRequest } from "../_components/bloodRequest/blood-request-card";
import BloodRequestFilters from "../_components/bloodRequest/blood-request-filters";
import BloodRequestGrid from "../_components/bloodRequest/blood-request-grid";
import BloodRequestDetailsDialog from "../_components/bloodRequest/blood-request-details-dialog";
import { useGetBloodRequest } from "@/hooks/br.hook";
import { useQueryFilter } from "@/hooks/query.hook";
import { Spinner } from "@/components/ui/spinner";

export default function BloodRequestsPage() {
    const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(
        null
    );
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [acceptingRequestId, setAcceptingRequestId] = useState<string | null>(
        null
    );

    const { getQuery } = useQueryFilter();
    const urgency = getQuery("urgency");
    const page = Number(getQuery("page")) || 1;

    const {
        data: allRequest,
        isPending,
        isError,
    } = useGetBloodRequest({
        page,
        urgency: urgency || undefined
    });

    // Adjust this path if your API wraps the list differently
    const requests: BloodRequest[] = allRequest?.data?.data ?? [];



    console.log(requests)

    const handleViewDetails = (request: BloodRequest) => {
        setSelectedRequest(request);
        setIsDetailsOpen(true);
    };

    const handleAcceptRequest = async (requestId: string) => {
        try {
            setAcceptingRequestId(requestId);

            // Replace with your mutation:
            // await acceptBloodRequestMutation.mutateAsync(requestId);
            await new Promise((resolve) => setTimeout(resolve, 800));

            toast.success("Blood request accepted successfully.");
            setIsDetailsOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Unable to accept this blood request.");
        } finally {
            setAcceptingRequestId(null);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                            <HeartPulse className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                                Blood requests
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
                                Find people who urgently need blood and help make a
                                difference by donating.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-6 sm:py-8">
                <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6 lg:px-8">
                    <BloodRequestFilters />

                    {isPending ? (
                        <div className="flex min-h-[40vh] items-center justify-center">
                            <Spinner className="h-6 w-6" />
                        </div>
                    ) : isError ? (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
                            Could not load blood requests. Please try again.
                        </div>
                    ) : (
                        <BloodRequestGrid
                            requests={requests}
                            onViewDetails={handleViewDetails}
                            onAccept={handleAcceptRequest}
                            acceptingRequestId={acceptingRequestId}
                        />
                    )}
                </div>
            </section>

            {/* Details */}
            <BloodRequestDetailsDialog
                request={selectedRequest}
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                onAccept={handleAcceptRequest}
                isAccepting={selectedRequest?.id === acceptingRequestId}
            />
        </main>
    );
}