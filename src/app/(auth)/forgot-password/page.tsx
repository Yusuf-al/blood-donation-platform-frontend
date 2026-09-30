"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft, HeartPulse, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { useForgetPassword } from "@/hooks";
import { useForm } from "@tanstack/react-form";
import { forgetPassZodSchema } from "@/validation/auth.validation";

function ForgotPasswordPage() {

    const { mutate: forgetPassword, isPending } = useForgetPassword()
    const router = useRouter()

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (!email.trim()) {
    //         toast.error("Please enter your email address.");
    //         return;
    //     }

    //     try {
    //         setIsSubmitting(true);

    //         forgetPassword(email,{
    //             onSuccess:()=>{

    //             }
    //         })

    //         toast.success("Password reset OTP has been sent to your email.");

    //         router.push(
    //             `/ reset-password?email=${encodeURIComponent(email)}`
    //         );
    //     } catch (error) {
    //         toast.error("Unable to send reset OTP. Please try again.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };
    const form = useForm({
        defaultValues: {
            email: "",
        },

        validators: {
            onSubmit: forgetPassZodSchema,
        },

        onSubmit: ({ value }) => {
            const userEmail = { email: value.email }
            forgetPassword(userEmail, {
                onSuccess: () => {
                    toast.success("Password reset OTP has been sent to your email.");
                    router.push(
                        `/reset-password?email=${encodeURIComponent(value.email)}`
                    );
                },
                onError: (err) => {
                    toast.error(
                        "Failed to send OTP to your email address",)
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
                            <Mail className="h-8 w-8 text-red-600" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                            Forgot your password?
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Enter the email address associated with your FASTBlood
                            account and we&apos;ll send you a verification code.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                        className="space-y-6">

                        <FieldGroup className="gap-5">
                            {/* Email */}
                            <form.Field name="email">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Email address
                                            </FieldLabel>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="email"
                                                placeholder="you@example.com"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                onBlur={field.handleBlur}
                                                autoComplete="email"
                                                aria-invalid={isInvalid}
                                                className="h-11"
                                            />
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
                        <Button
                            disabled={isPending ? true : false}
                            type="submit"
                            className="h-11 w-full bg-red-600 text-white hover:bg-red-700"
                        >                    {isPending ? <><Spinner /> Sending OTP...</> : "Send OTP"}
                        </Button>
                    </form>

                    {/* Security note */}
                    <div className="mt-6 flex gap-3 rounded-xl bg-slate-50 p-4">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                        <p className="text-xs leading-5 text-slate-500">
                            For your security, the verification code will expire after
                            a limited time. Never share your OTP with anyone.
                        </p>
                    </div>

                    {/* Back to login */}
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

export default ForgotPasswordPage;

