"use client";

import { useState } from "react";
import { Eye, EyeOff, FileText, FileUp, ImagePlus, X } from "lucide-react";
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
import { ISignup } from "@/types/signup.type";
import { useSignup } from "@/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { email } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { isAcceptedFileSize, isAcceptedFileTypes, MAX_FILE_SIZE } from "@/validation/profileImage.validation";

function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { mutate: signup, isPending } = useSignup()
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "Abc@123",
            confirmPassword: "Abc@123",
            profileImage: null as File | null,
        },

        validators: {
            onSubmit: SignupZodSchema,
        },

        onSubmit: ({ value }) => {
            const signupData: ISignup = {
                name: value.name,
                email: value.email,
                phone: value.phone,
                password: value.password,
                imageUrl: value.profileImage,
            }
            signup(signupData, {
                onSuccess: () => {
                    toast.success("Account has been created.", {
                        description: "Please verify your account first"
                    })
                    router.push(`/verify-email?email=${signupData.email}`)
                },
                onError: () => {
                    toast.warning("Issue in creating new account.Please try again")
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
                className="space-y-4"
            >
                <FieldGroup className="gap-3">
                    {/* Profile Image */}
                    <form.Field name="profileImage">
                        {(field) => {
                            const imageFile = field.state.value
                            return (

                                <Field className="gap-2">
                                    <FieldLabel htmlFor={field.name}>
                                        Profile image
                                    </FieldLabel>

                                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                                        <div className="flex items-center gap-4">
                                            {/* Image Preview */}
                                            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-red-50 shadow-sm ring-1 ring-slate-200">
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        alt="Profile preview"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <ImagePlus className="h-6 w-6 text-red-400" />
                                                )}
                                            </div>

                                            {/* Upload Area */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Button
                                                        type="button"
                                                        render={<label htmlFor={field.name} />}
                                                        nativeButton={false}
                                                        variant="outline"
                                                        className="h-9 cursor-pointer gap-2 border-slate-200 bg-white px-3 text-sm font-medium hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                    >
                                                        <FileUp className="h-4 w-4" />
                                                        {imageFile ? "Change image" : "Upload image"}
                                                    </Button>

                                                    {imageFile && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                field.handleChange(null);
                                                                field.handleBlur();
                                                                setImagePreview(null);
                                                            }}
                                                            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <X className="h-4 w-4" />
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>

                                                {/* File Input */}
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="file"
                                                    accept="image/jpeg,image/jpg,image/png"
                                                    className="sr-only"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] ?? null;

                                                        if (
                                                            file &&
                                                            (!isAcceptedFileSize(file.size) ||
                                                                !isAcceptedFileTypes(file.type))
                                                        ) {
                                                            field.handleBlur();
                                                            return;
                                                        }

                                                        field.handleChange(file);

                                                        if (file) {
                                                            setImagePreview(URL.createObjectURL(file));
                                                        } else {
                                                            setImagePreview(null);
                                                        }
                                                    }}
                                                />

                                                {/* File information */}
                                                <div className="mt-2 min-w-0">
                                                    {imageFile ? (
                                                        <div className="flex min-w-0 items-center gap-1.5 text-xs text-slate-600">
                                                            <FileText className="h-3.5 w-3.5 shrink-0 text-red-500" />

                                                            <span className="truncate font-medium">
                                                                {imageFile.name}
                                                            </span>

                                                            <span className="shrink-0 text-slate-400">
                                                                {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-slate-400">
                                                            JPG, JPEG or PNG · Maximum {MAX_FILE_SIZE} MB
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Validation Error */}
                                    {field.state.meta.isTouched &&
                                        !field.state.meta.isValid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                </Field>
                            )
                        }}



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
                    disabled={isPending ? true : false}
                    type="submit"
                    className="h-11 w-full bg-red-600 text-white hover:bg-red-700"
                >                    {isPending ? <><Spinner /> Creating Account...</> : "Create Account"}
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