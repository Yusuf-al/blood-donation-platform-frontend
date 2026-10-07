
"use client";

import BloodRequestCard, {
    BloodRequest,
} from "./blood-request-card";

interface BloodRequestGridProps {
    requests: BloodRequest[];
    onViewDetails: (request: BloodRequest) => void;
    onAccept: (requestId: string) => void;
    acceptingRequestId?: string | null;
}

export default function BloodRequestGrid({
    requests,
    onViewDetails,
    onAccept,
    acceptingRequestId,
}: BloodRequestGridProps) {

    console.log(requests)
    if (!requests.length) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                    <span className="text-lg text-red-600">♥</span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    No blood requests found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    There are currently no matching blood requests.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-5 md:grid-cols-2">
            {requests.map((request) => (
                <BloodRequestCard
                    key={request.id}
                    request={request}
                    onViewDetails={onViewDetails}
                    onAccept={onAccept}
                    isAccepting={acceptingRequestId === request.id}
                />
            ))}
        </div>
    );
}

