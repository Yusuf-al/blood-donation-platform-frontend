"use client";

import { useForm } from "@tanstack/react-form";
import {
    CalendarDays,
    CheckCircle2,
    Droplets,
    Loader2,
    MapPin,
    Send,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { useBecomeDonor } from "@/hooks/donor.hook";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { BecomeDonorZodSchema } from "@/validation/donor.validation";
import { DatePicker } from "@/components/shared/calender";

const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
] as const;

const initialValues = {
    bloodGroup: "",
    dateOfBirth: "",
    city: "",
    address: "",
    lastDonationDate: "",
};

function BecomeDonorForm() {
    const router = useRouter()
    const { mutate: BecomeDonor, isPending: submitting } = useBecomeDonor()

    const form = useForm({
        defaultValues: initialValues,
        validators: {
            onSubmit: BecomeDonorZodSchema
        },

        onSubmit: async ({ value }) => {
            try {
                const donorData = {
                    bloodGroup: value.bloodGroup,
                    dateOfBirth: value.dateOfBirth,
                    city: value.city,
                    address: value.address || undefined,
                    lastDonationDate:
                        value.lastDonationDate || undefined,
                };

                BecomeDonor(donorData, {
                    onSuccess: () => {
                        toast.success(
                            "Your donor request has been submitted successfully!",
                            {
                                description: "Once this request is approved you will get a confirmation email"
                            }
                        );
                        router.push("/")
                    },
                    onError: () => {
                        toast.warning("Issue in creating new account.Please try again")
                    }
                })

                form.reset();
            } catch (error) {
                toast.error(
                    "Something went wrong. Please try again."
                );
            }
        },
    });

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            {/* Form Header */}
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                        <Droplets className="h-5 w-5 text-red-600" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Donor Information
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            Provide your information to create your donor profile.
                        </p>
                    </div>
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="p-6 sm:p-8"
            >
                <FieldGroup className="gap-6">
                    {/* Blood Group */}
                    <form.Field
                        name="bloodGroup"
                    >
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel>
                                        Blood group{" "}
                                        <span className="text-red-600">*</span>
                                    </FieldLabel>

                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                        {bloodGroups.map((group) => {
                                            const isSelected = field.state.value === group;

                                            return (
                                                <button
                                                    key={group}
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    onClick={() => {
                                                        field.handleChange(group);
                                                        field.handleBlur();
                                                    }}
                                                    className={`flex h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${isSelected
                                                        ? "border-red-600 bg-red-600 text-white shadow-sm"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                        }`}
                                                >
                                                    {group}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <FieldDescription>
                                        Select your current blood group.
                                    </FieldDescription>

                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Date of Birth + City */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Date of Birth */}
                        <form.Field
                            name="dateOfBirth"

                        >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Date of birth{" "}
                                            <span className="text-red-600">*</span>
                                        </FieldLabel>

                                        {/* <div className="relative">
                                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="date"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                onBlur={field.handleBlur}
                                                className="h-11 pl-10"
                                                aria-invalid={isInvalid}
                                            />
                                        </div> */}
                                        <DatePicker value={field.state.value}
                                            onChange={field.handleChange}
                                            placeholder="Date of birth"
                                            maxDate={new Date()} />
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* City */}
                        <form.Field
                            name="city"

                        >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            City{" "}
                                            <span className="text-red-600">*</span>
                                        </FieldLabel>

                                        <div className="relative">
                                            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="e.g. Khulna"
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(e.target.value)
                                                }
                                                onBlur={field.handleBlur}
                                                className="h-11 pl-10"
                                                aria-invalid={isInvalid}
                                            />
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
                    </div>

                    {/* Address */}
                    <form.Field name="address">
                        {(field) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    Address{" "}
                                    <span className="font-normal text-slate-400">
                                        (Optional)
                                    </span>
                                </FieldLabel>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    placeholder="Your current address"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    className="h-11"
                                />

                                <FieldDescription>
                                    Your address can help with location-based donor
                                    matching.
                                </FieldDescription>
                            </Field>
                        )}
                    </form.Field>

                    {/* Last Donation Date */}
                    <form.Field name="lastDonationDate">
                        {(field) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>
                                    Last donation date{" "}
                                    <span className="font-normal text-slate-400">
                                        (Optional)
                                    </span>
                                </FieldLabel>

                                <div className="relative">
                                    <DatePicker value={field.state.value}
                                        onChange={field.handleChange}
                                        placeholder="Last Donation Date"
                                        maxDate={new Date()}
                                    />
                                </div>

                                <FieldDescription>
                                    Leave this empty if you have never donated blood.
                                </FieldDescription>
                            </Field>
                        )}
                    </form.Field>
                </FieldGroup>

                {/* Information */}
                <div className="mt-6 flex gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                    <div>
                        <p className="text-sm font-semibold text-green-800">
                            Before you register
                        </p>

                        <p className="mt-1 text-xs leading-5 text-green-700">
                            Please make sure the information you provide is
                            accurate. Your donor profile helps FASTBlood connect
                            you with people who may need your blood group.
                        </p>
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-6">

                    <Button
                        type="submit"
                        disabled={submitting ? true : false}
                        className="h-11 w-full bg-red-600 font-semibold hover:bg-red-700 sm:w-auto sm:min-w-48"
                    >
                        {submitting ? (
                            <>
                                <Spinner className="h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                Become a Donor
                            </>
                        )}
                    </Button>

                </div>
            </form>
        </div>
    );
}

export default BecomeDonorForm;

