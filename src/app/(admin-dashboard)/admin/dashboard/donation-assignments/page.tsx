"use client";

import { useState } from "react";
import { useAllAssignment } from "@/hooks/assign.hook";
import { IAssignemnts } from "@/types/assignment.types";
import DonationAssignmentsHeader from "../_components/assignments/donation-assignments-header";
import DonationAssignmentsList from "../_components/assignments/donation-assignments-list";




export default function DonationAssignementPage() {
    // const { getQuery } = useQueryFilter();

    // const searchTerm = getQuery("searchTerm");
    // const status = getQuery("status");

    // const page =
    //     Number(getQuery("page")) || 1;

    const {
        data: assignments,
        isPending,
        isError,
        refetch,
    } = useAllAssignment();

    const allAssignments: IAssignemnts[] = assignments?.data ?? [];

    const meta = assignments?.data?.meta;

    const totalPages =
        meta?.totalPage ??
        meta?.totalPages ??
        1;

    const [
        selectedAssignment,
        setSelectedAssignment,
    ] = useState<IAssignemnts | null>(
        null
    );

    const handleViewAssignment = (
        assignment: IAssignemnts
    ) => {
        setSelectedAssignment(assignment);

        console.log(
            "View assignment:",
            assignment.id
        );
    };

    /**
     * Convert your backend IAssignemnts
     * into AdminDonationAssignment here
     * if the structures are different.
     *
     * For now this assumes they have
     * the same structure.
     */
    const formattedAssignments =
        allAssignments as unknown as IAssignemnts[];

    return (
        <div className="space-y-6">
            <DonationAssignmentsHeader />


            {isPending ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="text-center">
                        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-red-600" />

                        <p className="mt-3 text-sm text-slate-500">
                            Loading donation assignments...
                        </p>
                    </div>
                </div>
            ) : isError ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border border-red-100 bg-red-50">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-red-600">
                            Failed to load donation assignments.
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
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Donation Assignments
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Monitor donor assignments and donation progress.
                            </p>
                        </div>

                        <p className="hidden text-sm text-slate-500 sm:block">
                            {allAssignments.length} assignment
                            {allAssignments.length !== 1
                                ? "s"
                                : ""}{" "}
                            found
                        </p>
                    </div>

                    <DonationAssignmentsList
                        assignments={formattedAssignments}
                        onViewAssignment={() =>
                            handleViewAssignment
                        }
                    />

                </>
            )}
        </div>
    );
}