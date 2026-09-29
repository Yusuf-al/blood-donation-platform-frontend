"use client";

import { useState } from "react";
import { Eye, EyeOff, ImagePlus } from "lucide-react";
import { useForm } from "@tanstack/react-form";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SignupZodSchema } from "@/validation/auth.validation";
import GoogleButton from "@/components/shared/google";

function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            profileImage: null as File | null,
        },

        validators: {
            onSubmit: SignupZodSchema,
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
                className="space-y-4"
            >
                <FieldGroup className="gap-3">
                    {/* Profile Image */}
                    <form.Field name="profileImage">
                        {(field) => (
                            <Field className="gap-1.5">
                                <FieldLabel htmlFor={field.name}>
                                    Profile image
                                </FieldLabel>

                                <div className="flex items-center gap-3">
                                    {/* Preview */}
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-slate-50">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Profile preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <ImagePlus className="h-5 w-5 text-slate-400" />
                                        )}
                                    </div>

                                    {/* File Input */}
                                    <div className="flex-1">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="file"
                                            accept="image/*"
                                            className="h-9 cursor-pointer"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] ?? null;

                                                field.handleChange(file);

                                                if (file) {
                                                    setImagePreview(
                                                        URL.createObjectURL(file)
                                                    );
                                                } else {
                                                    setImagePreview(null);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {field.state.meta.isTouched &&
                                    !field.state.meta.isValid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                            </Field>
                        )}
                    </form.Field>

                    {/* Name */}
                    <form.Field name="name">
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
                                        Full name
                                    </FieldLabel>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={field.state.value}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        onBlur={field.handleBlur}
                                        autoComplete="name"
                                        aria-invalid={isInvalid}
                                        className="h-9"
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

                    {/* Email */}
                    <form.Field name="email">
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
                                        className="h-9"
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

                    {/* Phone */}
                    <form.Field name="phone">
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
                                        Phone number
                                    </FieldLabel>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="tel"
                                        placeholder="8801XXXXXXXXX"
                                        value={field.state.value}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        onBlur={field.handleBlur}
                                        autoComplete="tel"
                                        aria-invalid={isInvalid}
                                        className="h-9"
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
                    type="submit"
                    className="h-9 w-full bg-red-600 text-white hover:bg-red-700"
                >
                    Create account
                </Button>

                {/* Divider */}
                <div className="flex items-center py-1">
                    <Separator className="flex-1" />

                    <span className="px-3 text-xs text-slate-400">
                        OR
                    </span>

                    <Separator className="flex-1" />
                </div>

                {/* Google */}
                <GoogleButton />
            </form>
        </div>
    );
}

export default SignupForm;