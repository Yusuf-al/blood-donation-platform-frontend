"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Download, LoaderCircle } from "lucide-react";
import { jsPDF } from "jspdf";
import { paymentApi } from "@/api/payment.api";

interface Payment {
    paymentId: string | null;
    subscriptionId: string;
    userId: string;
    provider: string;
    paymentMethod: string;
    transactionId: string;
    amount: string | number;
    currency: string;
    status: string;
    paidAt: string | null;
}

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("paymentId");

    const [payment, setPayment] = useState<Payment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!paymentId) {
            setError("Payment ID is missing.");
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchPayment = async () => {
            try {
                const result = await paymentApi(paymentId);

                // Adapt this extraction if your API uses a different response shape.
                const record =
                    result?.data?.data ?? result?.data ?? result;

                if (!record || !record.status) {
                    throw new Error("Payment record not found.");
                }

                if (!cancelled) {
                    setPayment(record as Payment);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Unable to load payment details."
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchPayment();

        return () => {
            cancelled = true;
        };
    }, [paymentId]);

    const isPaid =
        ["SUCCESS", "SUCCESSFUL", "COMPLETED", "PAID"].includes(
            payment?.status?.toUpperCase() ?? ""
        );

    const downloadInvoice = () => {
        if (!payment || !isPaid) return;

        const pdf = new jsPDF();
        const paidDate = payment.paidAt
            ? new Date(payment.paidAt).toLocaleString()
            : "N/A";

        pdf.setFontSize(22);
        pdf.text("FASTBlood", 20, 25);

        pdf.setFontSize(16);
        pdf.text("Payment Invoice", 20, 42);

        pdf.setFontSize(11);

        const details = [
            `Payment ID: ${payment.paymentId ?? "N/A"}`,
            `Subscription ID: ${payment.subscriptionId}`,
            `User ID: ${payment.userId}`,
            `Transaction ID: ${payment.transactionId}`,
            `Provider: ${payment.provider}`,
            `Payment Method: ${payment.paymentMethod}`,
            `Amount: ${payment.currency} ${payment.amount}`,
            `Payment Status: ${payment.status}`,
            `Paid At: ${paidDate}`,
        ];

        details.forEach((detail, index) => {
            pdf.text(detail, 20, 60 + index * 12);
        });

        pdf.setFontSize(10);
        pdf.text("Thank you for choosing FASTBlood Premium.", 20, 180);

        pdf.save(
            `FASTBlood-Invoice-${payment.paymentId ?? payment.transactionId}.pdf`
        );
    };

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center gap-2">
                <LoaderCircle className="h-5 w-5 animate-spin text-red-600" />
                <span>Loading payment details...</span>
            </div>
        );
    }

    if (error || !payment) {
        return (
            <div className="mx-auto mt-16 max-w-lg rounded-xl border p-6 text-center">
                <h1 className="text-xl font-bold text-slate-900">
                    Unable to load payment
                </h1>
                <p className="mt-2 text-sm text-red-600">
                    {error || "Payment record not found."}
                </p>
            </div>
        );
    }

    return (
        <div className="flex min-h-[70vh] items-center justify-center p-4">
            <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="text-center">
                    <CheckCircle2
                        className={`mx-auto h-16 w-16 ${isPaid ? "text-green-600" : "text-amber-500"
                            }`}
                    />

                    <h1 className="mt-4 text-2xl font-bold text-slate-900">
                        {isPaid ? "Payment Successful!" : "Payment Status"}
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        {isPaid
                            ? "Your payment has been confirmed. Thank you for choosing FASTBlood Premium."
                            : "Your payment has not been confirmed as successful yet."}
                    </p>
                </div>

                <div className="mt-6 space-y-4 rounded-xl bg-slate-50 p-5 text-sm">
                    {[
                        ["Payment ID", payment.paymentId ?? "N/A"],
                        ["Subscription ID", payment.subscriptionId],
                        ["User ID", payment.userId],
                        ["Transaction ID", payment.transactionId],
                        ["Provider", payment.provider],
                        ["Payment Method", payment.paymentMethod],
                        ["Amount", `${payment.currency} ${payment.amount}`],
                        ["Status", payment.status],
                        [
                            "Paid At",
                            payment.paidAt
                                ? new Date(payment.paidAt).toLocaleString()
                                : "N/A",
                        ],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4"
                        >
                            <span className="text-slate-500">{label}</span>
                            <span className="break-all font-medium text-slate-900 sm:text-right">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>

                {isPaid && (
                    <button
                        onClick={downloadInvoice}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
                    >
                        <Download className="h-5 w-5" />
                        Download Invoice (PDF)
                    </button>
                )}
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="p-8 text-center">Loading payment details...</div>
            }
        >
            <PaymentSuccessContent />
        </Suspense>
    );
}