"use client"

import { usePayments } from "@/hooks/admin.hook";

function PaymentsPage() {

    const { data } = usePayments()

    const payemnts = data?.data?.data ?? []
    console.log(payemnts)

    return (
        <div>
            <h1>Payments Page</h1>
        </div>
    )
}

export default PaymentsPage
