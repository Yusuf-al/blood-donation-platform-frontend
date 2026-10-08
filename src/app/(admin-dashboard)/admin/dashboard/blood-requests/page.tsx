import { useGetBloodRequest } from '@/hooks/br.hook';
import { useQueryFilter } from '@/hooks/query.hook';
import React from 'react'

function RequestsPage() {
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

    console.log(allRequest)
    return (
        <div>
            <h1>Requests Page</h1>
        </div>
    )
}

export default RequestsPage
