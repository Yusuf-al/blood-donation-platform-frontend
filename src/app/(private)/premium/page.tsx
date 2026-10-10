"use client";

import { useState } from "react";
import {
    Check,
    CreditCard,
    Crown,
    LoaderCircle,
    ShieldCheck,
    Smartphone,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PaymentMethod = "STRIPE" | "BKASH";

const features = [
    "Up to 10 blood requests per month",
    "Fast Matching for quicker donor discovery",
    "Donor contact number and address",
    "Direct messages to donors",
    "Priority support for urgent requests",
];

const paymentOptions: {
    value: PaymentMethod;
    title: string;
    description: string;
    icon: typeof CreditCard;
    iconClass: string;
}[] = [
        {
            value: "STRIPE",
            title: "Pay by card",
            description: "Secure payment through Stripe",
            icon: CreditCard,
            iconClass: "bg-slate-100 text-slate-700",
        },
        {
            value: "BKASH",
            title: "bKash",
            description: "Pay with your bKash account",
            icon: Smartphone,
            iconClass: "bg-pink-50 text-pink-600",
        },
    ];

export default function PremiumPage() {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("STRIPE");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()


    const handlePayment = async () => {
        try {
            setIsLoading(true);

            const endpoint =
                paymentMethod === "STRIPE"
                    ? "/subscription/create-checkout-session"
                    : "/subscription/bkash-payment";

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to initiate payment."
                );
            }

            let paymentUrl: string | undefined;

            if (paymentMethod === "STRIPE") {
                // Adjust this field to match your Stripe API response.
                paymentUrl =
                    typeof result.data === "string"
                        ? result.data
                        : result.data?.url ??
                        result.data?.checkoutUrl;
            } else {
                paymentUrl = result.data?.bkashPaymentResult?.bkashURL;
            }

            if (!paymentUrl) {
                throw new Error("Payment URL not found in the server response.");
            }

            // Redirect to the external payment provider.
            window.location.href = paymentUrl;
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Payment initiation failed."
            );
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <main className="bg-slate-50">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                        <Crown className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Upgrade to FASTBlood Premium
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            More blood requests and faster access to donors for a full year.
                        </p>
                    </div>
                </div>

                <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* Plan */}
                    <section
                        aria-labelledby="plan-title"
                        className="rounded-2xl bg-red-600 p-6 text-white shadow-xl shadow-red-600/20 sm:p-8"
                    >
                        <h2 id="plan-title" className="text-sm font-medium text-red-100">
                            Premium plan
                        </h2>

                        <p className="mt-3 flex items-baseline gap-2">
                            <span className="text-5xl font-bold tracking-tight">৳1,000</span>
                            <span className="text-sm text-red-100">per year</span>
                        </p>

                        <div className="mt-6 border-t border-white/20 pt-6">
                            <ul className="space-y-3">
                                {features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check
                                            className="mt-0.5 h-4 w-4 shrink-0"
                                            strokeWidth={3}
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm leading-6 text-red-50">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Payment */}
                    <section
                        aria-labelledby="payment-title"
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                    >
                        <h2
                            id="payment-title"
                            className="text-base font-semibold text-slate-900"
                        >
                            Choose your payment method
                        </h2>

                        <div
                            role="radiogroup"
                            aria-labelledby="payment-title"
                            className="mt-4 space-y-3"
                        >
                            {paymentOptions.map((option) => {
                                const selected = paymentMethod === option.value;
                                const Icon = option.icon;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        role="radio"
                                        aria-checked={selected}
                                        disabled={isLoading}
                                        onClick={() => setPaymentMethod(option.value)}
                                        className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${selected
                                            ? "border-red-600 bg-red-50"
                                            : "border-slate-200 bg-white hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${option.iconClass}`}
                                        >
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="block text-sm font-semibold text-slate-900">
                                                {option.title}
                                            </span>
                                            <span className="block text-sm text-slate-500">
                                                {option.description}
                                            </span>
                                        </span>

                                        {/* Radio indicator */}
                                        <span
                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-red-600" : "border-slate-300"
                                                }`}
                                            aria-hidden="true"
                                        >
                                            {selected && (
                                                <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading && (
                                <LoaderCircle
                                    className="h-4 w-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            {isLoading ? "Redirecting to payment..." : "Continue to payment"}
                        </button>

                        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
                            <ShieldCheck
                                className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                                aria-hidden="true"
                            />
                            Your premium status activates after we verify your successful
                            payment.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}