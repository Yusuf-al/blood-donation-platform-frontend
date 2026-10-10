
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function PaymentFailurePage() {
    const router = useRouter();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((previous) => Math.max(previous - 1, 0));
        }, 1000);

        const timeout = setTimeout(() => {
            router.replace("/premium");
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [router]);

    return (
        <div className="flex min-h-[70vh] items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <XCircle className="mx-auto h-16 w-16 text-red-600" />

                <h1 className="mt-4 text-2xl font-bold text-slate-900">
                    Payment Failed
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    We couldn't complete your payment. No premium subscription has been
                    confirmed. Please try again.
                </p>

                <p className="mt-6 text-sm text-slate-500">
                    Redirecting to Premium in{" "}
                    <span className="font-bold text-red-600">{seconds}</span> seconds...
                </p>

                <button
                    onClick={() => router.replace("/premium")}
                    className="mt-5 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
                >
                    Return to Premium
                </button>
            </div>
        </div>
    );
}

