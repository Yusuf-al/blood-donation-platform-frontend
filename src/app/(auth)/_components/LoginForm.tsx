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

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },

        validators: {
            onSubmit: LoginZodSchema,
        },

        onSubmit: ({ value }) => {
            console.log(value);
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
                    type="submit"
                    className="h-11 w-full bg-red-600 text-white hover:bg-red-700"
                >
                    Sign in
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
                <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full"
                >
                    <svg className="mr-2 size-4" viewBox="0 0 24 24" aria-hidden="true" > <path fill="#4285F4" d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.45h3.14c1.84-1.69 2.93-4.18 2.93-7.41Z" /> <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.5Z" /> <path fill="#FBBC05" d="M6.53 13.58A5.85 5.85 0 0 1 6.22 12c0-.55.1-1.08.31-1.58V7.89H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.11l3.25-2.53Z" /> <path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.49 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.72 5.39l3.25 2.53c.77-2.31 2.93-4.03 5.47-4.03Z" /> </svg>
                    Continue with Google
                </Button>
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