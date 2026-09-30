"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HeartPulse, MailCheck, RotateCw } from "lucide-react";
import { toast } from "sonner";

import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResendOtp, useVerifyEmail } from "@/hooks";
import { Spinner } from "@/components/ui/spinner";

function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") ?? "";

    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const { mutate: verifyEmail, isPending } = useVerifyEmail()
    const { mutate: resendOtp } = useResendOtp()

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            toast.error("Please enter the 6-digit OTP.");
            return;
        }
        const verifyData = {
            email: email,
            otp: otp
        }
        try {
            setIsSubmitting(true);

            verifyEmail(verifyData, {
                onSuccess: () => {
                    toast.success("Email verified successfully!");
                    router.push("/login");
                },
                onError: (err) => {
                    console.log(err)
                    toast.error("Email verified failed!");
                }
            })
            await new Promise((resolve) => setTimeout(resolve, 1000));

        } catch (error) {
            toast.error("Invalid or expired OTP.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0 || !email) return;

        try {
            setIsResending(true);
            const userEmail = {
                email
            }
            resendOtp(userEmail, {
                onSuccess: () => {
                    setCountdown(60);
                    toast.success("A new OTP has been sent to your email.");
                },
                onError: (err) => {
                    console.log(err)
                    toast.error("Failed to resend OTP. Please try again.");
                }
            })
        } catch (error) {
            toast.error("Failed to resend OTP. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-bold text-slate-900"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">
                            <HeartPulse className="h-6 w-6" />
                        </div>

                        <span>
                            FAST<span className="text-red-600">Blood</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                            <MailCheck className="h-8 w-8 text-red-600" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Verify your email
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            We&apos;ve sent a 6-digit verification code to
                        </p>

                        <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                            {email || "your email address"}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleVerify} className="mt-8 space-y-5">
                        <Field>
                            <FieldLabel htmlFor="otp">Verification code</FieldLabel>

                            <Input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                placeholder="000000"
                                value={otp}
                                onChange={(e) => {
                                    const value = e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6);

                                    setOtp(value);
                                }}
                                className="h-12 text-center text-lg font-semibold tracking-[0.4em]"
                            />

                            <FieldDescription className="text-center">
                                Enter the 6-digit code sent to your email.
                            </FieldDescription>

                            {otp.length > 0 && otp.length < 6 && (
                                <FieldError>
                                    OTP must contain 6 digits.
                                </FieldError>
                            )}
                        </Field>

                        <Button
                            disabled={isPending ? true : false}
                            type="submit"
                            className="h-11 w-full bg-red-600 text-white hover:bg-red-700"
                        >                    {isPending ? <><Spinner /> Verifying...</> : "Verify Email"}
                        </Button>

                    </form>

                    {/* Resend */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-500">
                            Didn&apos;t receive the code?
                        </p>

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={countdown > 0 || isResending}
                            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:text-slate-400"
                        >
                            <RotateCw
                                className={`h-4 w-4 ${isResending ? "animate-spin" : ""
                                    }`}
                            />

                            {countdown > 0
                                ? `Resend OTP in ${countdown}s`
                                : isResending
                                    ? "Sending..."
                                    : "Resend OTP"}
                        </button>
                    </div>

                    {/* Change email */}
                    <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                        <Link
                            href="/signup"
                            className="text-sm font-medium text-slate-500 transition-colors hover:text-red-600"
                        >
                            ← Use a different email
                        </Link>
                    </div>
                </div>

                {/* Footer text */}
                <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                    The verification code expires after a few minutes.
                    <br />
                    Please don&apos;t share your OTP with anyone.
                </p>
            </div>
        </main>
    );
}

export default VerifyEmailPage;