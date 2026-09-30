
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    HeartPulse,
    KeyRound,
    RotateCw,
    ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { resetPassZodSchema } from "@/validation/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Spinner } from "@/components/ui/spinner";
import { useResendOtp, useResetPassword } from "@/hooks";

function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [isResending, setIsResending] = useState(false);
    const { mutate: resetPassword, isPending } = useResetPassword()
    const { mutate: resendOtp, } = useResendOtp()

    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);



    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (!email) {
    //         toast.error("Invalid password reset request.");
    //         router.push("/forget-password");
    //         return;
    //     }

    //     if (otp.length !== 6) {
    //         toast.error("Please enter the 6-digit OTP.");
    //         return;
    //     }

    //     if (password.length < 6) {
    //         toast.error("Password must be at least 6 characters long.");
    //         return;
    //     }

    //     if (password !== confirmPassword) {
    //         toast.error("Passwords do not match.");
    //         return;
    //     }

    //     try {
    //         setIsSubmitting(true);

    //         // TODO: Connect your API
    //         //
    //         // await resetPasswordApi({
    //         //   email,
    //         //   otp,
    //         //   password,
    //         // });

    //         await new Promise((resolve) => setTimeout(resolve, 1000));

    //         toast.success("Password reset successfully!");

    //         router.push("/login");
    //     } catch (error) {
    //         toast.error("Invalid or expired OTP.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const handleResend = async () => {
        if (countdown > 0 || !email) return;

        try {
            setIsResending(true);

            const userEmail = {
                email
            }
            resendOtp(userEmail, {
                onSuccess: () => {
                    setCountdown(10);
                    toast.success("A new OTP has been sent to your email.");
                },
                onError: () => {
                    toast.error("Failed to resend OTP. Please try again.");
                }
            })

        } catch (error) {
            toast.error("Failed to resend OTP.");
        } finally {
            setIsResending(false);
        }
    };

    const form = useForm({
        defaultValues: {
            password: "Abc@123",
            confirmPassword: "Abc@123",
            otp: ""
        },

        validators: {
            onSubmit: resetPassZodSchema,
        },

        onSubmit: ({ value }) => {
            const resetPasswordData = {
                password: value.password,
                email: email,
                otp: value.otp
            }
            resetPassword(resetPasswordData, {
                onSuccess: () => {
                    toast.success("Account has been created.", {
                        description: "Please verify your account first"
                    })
                    router.push(`/login`)
                },
                onError: () => {
                    toast.success("Issue in creating new account.Please try again")
                }
            })
        },
    });


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
                            <KeyRound className="h-8 w-8 text-red-600" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Reset your password
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Enter the verification code sent to
                        </p>

                        <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                            {email || "your email address"}
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-4"
                    >
                        <FieldGroup className="gap-3">
                            <form.Field name="otp">
                                {(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                                    return (
                                        <Field>
                                            <FieldLabel className="mt-5 justify-center" htmlFor="otp"> Verification code </FieldLabel>
                                            <Input
                                                id="otp"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="one-time-code"
                                                placeholder="000000"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                onBlur={field.handleBlur}
                                                className="h-12 text-center text-lg font-semibold tracking-[0.4em]" />
                                            <FieldDescription className="text-center"> Enter the 6-digit code from your email. </FieldDescription>
                                            {Number(field.state.value) > 0 && Number(field.state.value) < 6 && (<FieldError> OTP must contain 6 digits. </FieldError>)}
                                        </Field>
                                    )
                                }}

                            </form.Field>

                            {/* Password */}
                            <form.Field name="password">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field
                                            data-invalid={isInvalid}
                                            className="gap-1.5"
                                        >
                                            <FieldLabel htmlFor={field.name}>
                                                Password
                                            </FieldLabel>

                                            <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={
                                                        showPassword ? "text" : "password"
                                                    }
                                                    placeholder="Create a strong password"
                                                    value={field.state.value}
                                                    onChange={(e) =>
                                                        field.handleChange(e.target.value)
                                                    }
                                                    onBlur={field.handleBlur}
                                                    autoComplete="new-password"
                                                    aria-invalid={isInvalid}
                                                    className="h-9 pr-10"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword((prev) => !prev)
                                                    }
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                                    aria-label={
                                                        showPassword
                                                            ? "Hide password"
                                                            : "Show password"
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>

                                            {isInvalid && (
                                                <FieldError
                                                    errors={field.state.meta.errors}
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Confirm Password */}
                            <form.Field name="confirmPassword">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field
                                            data-invalid={isInvalid}
                                            className="gap-1.5"
                                        >
                                            <FieldLabel htmlFor={field.name}>
                                                Confirm password
                                            </FieldLabel>

                                            <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={
                                                        showConfirmPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Confirm your password"
                                                    value={field.state.value}
                                                    onChange={(e) =>
                                                        field.handleChange(e.target.value)
                                                    }
                                                    onBlur={field.handleBlur}
                                                    autoComplete="new-password"
                                                    aria-invalid={isInvalid}
                                                    className="h-9 pr-10"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                                    aria-label={
                                                        showConfirmPassword
                                                            ? "Hide confirm password"
                                                            : "Show confirm password"
                                                    }
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>

                                            {isInvalid && (
                                                <FieldError
                                                    errors={field.state.meta.errors}
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </FieldGroup>

                        {/* Create Account */}
                        <Button
                            disabled={isPending ? true : false}
                            type="submit"
                            className="h-11 w-full bg-red-600 text-white hover:bg-red-700"
                        >                    {isPending ? <><Spinner /> Reseting Password...</> : "Reset Password"}
                        </Button>

                    </form>

                    {/* Resend OTP */}
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
                                className={`h - 4 w - 4 ${isResending ? "animate-spin" : ""
                                    }`}
                            />

                            {countdown > 0
                                ? `Resend OTP in ${countdown} s`
                                : isResending
                                    ? "Sending..."
                                    : "Resend OTP"}
                        </button>
                    </div>

                    {/* Security */}
                    <div className="mt-6 flex gap-3 rounded-xl bg-slate-50 p-4">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                        <p className="text-xs leading-5 text-slate-500">
                            Your password is securely encrypted. Never share your
                            verification code or password with anyone.
                        </p>
                    </div>

                    {/* Back */}
                    <div className="mt-6 border-t border-slate-100 pt-5">
                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-red-600"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ResetPasswordPage;

