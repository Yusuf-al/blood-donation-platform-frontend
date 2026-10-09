"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useGetBloodRequest } from "@/hooks/br.hook";
import { useQueryFilter } from "@/hooks/query.hook";
import { BloodRequestStatus, IBloodRequest } from "@/types/dr.types";
import { IDonorProfile } from "@/types/donor.types";
import BloodRequestsHeader from "../_components/requests/blood-requests-header";
import BloodRequestsFilter from "../_components/requests/blood-requests-filter";
import BloodRequestsList from "../_components/requests/blood-requests-list";
import BloodRequestsPagination from "../_components/requests/blood-requests-pagination";
import BloodRequestDetailsDialog from "../_components/requests/blood-request-details-dialog";
import { useDonors } from "@/hooks/donor.hook";
import { newAssignmentApi } from "@/api/assign.api";
import { BloodRequestStatusUpdateApi } from "@/api/br.api";


export default function RequestsPage() {
    const router = useRouter();

    const { getQuery } = useQueryFilter();

    const urgency = getQuery("urgency");
    const bloodGroup = getQuery("bloodGroup");
    const status = getQuery("status");

    const page =
        Number(getQuery("page")) || 1;

    // -----------------------------------------
    // BLOOD REQUESTS
    // -----------------------------------------

    const {
        data: allRequest,
        isPending,
        isError,
        refetch,
    } = useGetBloodRequest({
        page,
        urgency: urgency || undefined,
        bloodGroup: bloodGroup || undefined,
        status: status || undefined,
    });

    const requests: IBloodRequest[] =
        allRequest?.data?.data ?? [];

    const meta = allRequest?.data?.meta;

    const totalPages =
        meta?.totalPage ??
        meta?.totalPages ??
        1;

    // -----------------------------------------
    // DIALOG
    // -----------------------------------------
    const [selectedStatus, setSelectedStatus] =
        useState<BloodRequestStatus | null>(null);

    const [statusLoading, setStatusLoading] =
        useState(false);

    const [selectedRequest, setSelectedRequest] =
        useState<IBloodRequest | null>(null);

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedDonorId, setSelectedDonorId] =
        useState<string | null>(null);

    const [assignLoading, setAssignLoading] =
        useState(false);


    // -----------------------------------------
    // COMPATIBLE DONORS
    // -----------------------------------------
    //
    // Replace this with your actual donor API.
    //

    const { data: donors, isPending: DonorLoading } = useDonors(null)

    const compatibleDonors: IDonorProfile[] = donors?.data?.data


    const handleViewRequest = (
        request: IBloodRequest
    ) => {
        setSelectedRequest(request);
        setSelectedDonorId(null);
        setSelectedStatus(request.status);
        setDialogOpen(true);
    };

    const handleStatusUpdate = async () => {
        if (!selectedRequest || !selectedStatus) {
            return;
        }

        try {
            setStatusLoading(true);

            await BloodRequestStatusUpdateApi(selectedRequest.id, { status: selectedStatus })

            toast.success("Request status updated successfully.");

            setDialogOpen(false);
            setSelectedRequest(null);
            setSelectedStatus(null);

            await refetch();
        } catch (error: any) {
            console.error(
                "Failed to update request status:",
                error
            );

            toast.error(
                error?.data?.message ||
                error?.message ||
                "Failed to update request status."
            );
        } finally {
            setStatusLoading(false);
        }
    };

    const handleAssignDonor = async () => {
        if (
            !selectedRequest ||
            !selectedDonorId
        ) {
            return;
        }

        try {
            setAssignLoading(true);
            await newAssignmentApi({
                requestId: selectedRequest.id,
                donorId: selectedDonorId,
            });

            toast.success(
                "Donor assigned successfully."
            );
            setDialogOpen(false);
            setSelectedRequest(null);
            setSelectedDonorId(null);
            await refetch();
        } catch (error: any) {
            console.error(
                "Failed to assign donor:",
                error
            );

            toast.error(
                error?.data?.message ||
                error?.message ||
                "Failed to assign donor."
            );
        } finally {
            setAssignLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <BloodRequestsHeader />

            {/* Filters */}
            <BloodRequestsFilter />

            {/* Content */}
            {isPending ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="text-center">
                        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-red-600" />

                        <p className="mt-3 text-sm text-slate-500">
                            Loading blood requests...
                        </p>
                    </div>
                </div>
            ) : isError ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-red-600">
                            Failed to load blood requests.
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
                    {/* Result Summary */}
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Blood Requests
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Review emergency requests and assign compatible donors.
                            </p>
                        </div>

                        <p className="hidden text-sm text-slate-500 sm:block">
                            {requests.length} request
                            {requests.length !== 1
                                ? "s"
                                : ""}{" "}
                            found
                        </p>
                    </div>

                    {/* List */}
                    <BloodRequestsList
                        requests={requests}
                        onViewRequest={
                            handleViewRequest
                        }
                    />

                    {/* Pagination */}
                    <BloodRequestsPagination
                        currentPage={page}
                        totalPages={totalPages}
                    />
                </>
            )}

            {/* Details + Donor Assignment */}
            <BloodRequestDetailsDialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    if (!assignLoading && !statusLoading) {
                        setDialogOpen(open);

                        if (!open) {
                            setSelectedRequest(null);
                            setSelectedDonorId(null);
                            setSelectedStatus(null);
                        }
                    }
                }}
                request={selectedRequest}
                donors={compatibleDonors}
                selectedDonorId={selectedDonorId}
                onDonorChange={setSelectedDonorId}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                onAssign={handleAssignDonor}
                onStatusUpdate={handleStatusUpdate}
                loading={assignLoading}
                statusLoading={statusLoading}
            />
        </div>
    );
}