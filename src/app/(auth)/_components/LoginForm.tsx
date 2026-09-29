"use client";

import { useState } from "react";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoginZodSchema } from "@/validation/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "@/components/shared/google";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";


function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate: login, isPending: loginPending } = useLogin()

    const router = useRouter()

    const form = useForm({
        defaultValues: {
            email: "abc3@example.com",
            password: "Abc@123",
        },

        validators: {
            onSubmit: LoginZodSchema,
        },

        onSubmit: ({ value }) => {
            const loginData = {
                email: value.email,
                password: value.password
            };

            login(loginData, {
                onSuccess: (data) => {
                    router.push('/')
                    toast.success("Login Successful !", {
                        description: "Welcome back to FastBlood.",
                    });
                },
                onError: (err) => {
                    toast.error(
                        "Login Failed", {
                        position: "top-right",
                    })
                    console.log(err)
                }
            })
        },
    });

    return (
        <div className="w-full max-w-md">


            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="space-y-6"
            >
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

                    {/* Password */}
                    <form.Field name="password">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor={field.name}>
                                            Password
                                        </FieldLabel>


                                    </div>

                                    {/* Password Input */}
                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            onBlur={field.handleBlur}
                                            autoComplete="current-password"
                                            aria-invalid={isInvalid}
                                            className="h-11 pr-11"
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
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
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
                    <a
                        href="/forgot-password"
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                        Forgot password?
                    </a>
                </FieldGroup>

                {/* Login Button */}
                <Button
                    disabled={loginPending ? true : false}
                    type="submit"
                    className="h-11 w-full bg-red-600 text-white hover:bg-red-700"
                >                    {loginPending ? <><Spinner /> Signing in</> : "Sign in"}
                </Button>

                {/* Divider */}
                <div className="relative flex items-center">
                    <Separator className="flex-1" />

                    <span className="px-3 text-xs text-slate-400">
                        OR
                    </span>

                    <Separator className="flex-1" />
                </div>

                {/* Google */}
                <GoogleButton />
            </form>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <a
                    href="/signup"
                    className="font-semibold text-red-600 hover:text-red-700"
                >
                    Create an account
                </a>
            </p>
        </div>
    );
}

export default LoginForm;