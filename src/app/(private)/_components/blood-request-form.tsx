"use client";

import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle, Clock, Hospital, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/shared/calender";
import { useBloodRequest } from "@/hooks/br.hook";
import { BloodRequestZodSchema } from "@/validation/br.validation";

const bloodGroups = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
];

const urgencyOptions = [
    { label: "Normal", value: "NORMAL", description: "Within a few days" },
    { label: "Urgent", value: "URGENT", description: "Needed soon" },
    { label: "Critical", value: "CRITICAL", description: "Immediately" },
];

// Move this to your validation folder if you prefer


const initialValues = {
    bloodGroup: "",
    requiredUnits: 1,
    hospitalName: "",
    hospitalLocation: "",
    contactPhone: "",
    urgency: "",
    requiredAt: "",
    description: "",
};

const inputClass = "h-11 rounded-xl border-slate-200 p-2.5";

const isInvalid = (field: AnyFieldApi) =>
    field.state.meta.isTouched && !field.state.meta.isValid;

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mb-4 text-base font-semibold text-slate-900">{children}</h2>
    );
}

function Required() {
    return <span className="text-red-600">*</span>;
}

export default function BloodRequestForm() {
    const router = useRouter();
    const { mutate: newBloodRequest, isPending } = useBloodRequest();

    const form = useForm({
        defaultValues: initialValues,
        validators: {
            onSubmit: BloodRequestZodSchema,
        },
        onSubmit: ({ value }) => {

            const requestData = {
                bloodGroup: value.bloodGroup,
                requiredUnits: value.requiredUnits,
                hospitalName: value.hospitalName.trim(),
                hospitalLocation: value.hospitalLocation.trim(),
                contactPhone: value.contactPhone.trim(),
                urgency: value.urgency,
                requiredAt: new Date(value.requiredAt).toISOString(),
                description: value.description || undefined,
            }

            newBloodRequest(
                requestData,
                {
                    onSuccess: () => {
                        toast.success("Blood request submitted successfully!", {
                            description: "You will be notified once a donor accepts.",
                        });
                        form.reset();
                        router.push("/");
                    },
                    onError: () => {
                        toast.warning("Issue creating blood request. Please try again.");
                    },
                }
            );
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
            <div className="space-y-8 p-5 sm:p-6">
                {/* Blood requirement */}
                <section>
                    <SectionTitle>Blood requirement</SectionTitle>

                    <FieldGroup>
                        {/* Blood group */}
                        <form.Field name="bloodGroup">
                            {(field) => (
                                <Field data-invalid={isInvalid(field)}>
                                    <FieldLabel>
                                        Blood group <Required />
                                    </FieldLabel>

                                    <div className="grid grid-cols-4 gap-2">
                                        {bloodGroups.map((group) => {
                                            const selected = field.state.value === group.value;
                                            return (
                                                <button
                                                    key={group.value}
                                                    type="button"
                                                    aria-pressed={selected}
                                                    onClick={() => {
                                                        field.handleChange(group.value);
                                                        field.handleBlur();
                                                    }}
                                                    className={`flex h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${selected
                                                        ? "border-red-600 bg-red-600 text-white shadow-sm"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                        }`}
                                                >
                                                    {group.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {isInvalid(field) && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>

                        {/* Required units */}
                        <FieldGroup>

                            <div className="grid gap-4 sm:grid-cols-2" >
                                <form.Field name="requiredUnits">
                                    {(field) => (
                                        <Field data-invalid={isInvalid(field)}>
                                            <FieldLabel htmlFor={field.name}>
                                                Required units <Required />
                                            </FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                min={1}
                                                max={20}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                                aria-invalid={isInvalid(field)}
                                                className={`${inputClass} sm:max-w-40`}
                                            />
                                            <FieldDescription>Between 1 and 20 units.</FieldDescription>
                                            {isInvalid(field) && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )}
                                </form.Field>
                                <form.Field name="requiredAt">
                                    {(field) => (
                                        <Field data-invalid={isInvalid(field)} className="sm:max-w-xs">
                                            <FieldLabel htmlFor={field.name}>
                                                <Clock className="h-4 w-4 text-slate-400" />
                                                Date needed <Required />
                                            </FieldLabel>
                                            <DatePicker
                                                value={field.state.value}
                                                onChange={(value: string) => {
                                                    field.handleChange(value);
                                                    field.handleBlur();
                                                }}
                                            />
                                            {isInvalid(field) && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )}
                                </form.Field>
                            </div>

                        </FieldGroup>
                        {/* Urgency */}
                        <form.Field name="urgency">
                            {(field) => (
                                <Field data-invalid={isInvalid(field)}>
                                    <FieldLabel>
                                        How urgent is it? <Required />
                                    </FieldLabel>

                                    <div className="grid grid-cols-3 gap-2">
                                        {urgencyOptions.map((option) => {
                                            const selected = field.state.value === option.value;
                                            const critical = option.value === "CRITICAL";
                                            return (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    aria-pressed={selected}
                                                    onClick={() => {
                                                        field.handleChange(option.value);
                                                        field.handleBlur();
                                                    }}
                                                    className={`rounded-xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${selected
                                                        ? critical
                                                            ? "border-red-600 bg-red-600 text-white"
                                                            : "border-red-600 bg-red-50 text-red-700"
                                                        : "border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50/50"
                                                        }`}
                                                >
                                                    <span className="block text-sm font-semibold">
                                                        {option.label}
                                                    </span>
                                                    <span
                                                        className={`block text-xs ${selected && critical
                                                            ? "text-red-100"
                                                            : "text-slate-500"
                                                            }`}
                                                    >
                                                        {option.description}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {field.state.value === "CRITICAL" && (
                                        <aside className="space-y-4 lg:sticky lg:top-24">
                                            <div
                                                role="status"
                                                className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                                            >
                                                <AlertCircle
                                                    className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                                                    aria-hidden="true"
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold text-red-800">
                                                        Critical request
                                                    </p>
                                                    <p className="mt-1 text-xs leading-5 text-red-700">
                                                        This will be treated as a high-priority emergency and may be
                                                        shown to suitable donors first.
                                                    </p>
                                                </div>
                                            </div>
                                        </aside>
                                    )}
                                    {isInvalid(field) && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>
                    </FieldGroup>
                </section>

                {/* Hospital */}
                <section className="border-t border-slate-100 pt-6">
                    <SectionTitle>Where should the donor go?</SectionTitle>

                    <FieldGroup>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <form.Field name="hospitalName">
                                {(field) => (
                                    <Field data-invalid={isInvalid(field)}>
                                        <FieldLabel htmlFor={field.name}>
                                            <Hospital className="h-4 w-4 text-slate-400" />
                                            Hospital name <Required />
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Gazi College & Hospital"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid(field)}
                                            className={inputClass}
                                        />
                                        {isInvalid(field) && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>

                            <form.Field name="contactPhone">
                                {(field) => (
                                    <Field data-invalid={isInvalid(field)}>
                                        <FieldLabel htmlFor={field.name}>
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            Contact phone <Required />
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="tel"
                                            inputMode="tel"
                                            placeholder="01XXXXXXXXX"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid(field)}
                                            className={inputClass}
                                        />
                                        {isInvalid(field) && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )}
                            </form.Field>
                        </div>

                        <form.Field name="hospitalLocation">
                            {(field) => (
                                <Field data-invalid={isInvalid(field)}>
                                    <FieldLabel htmlFor={field.name}>
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                        Hospital address <Required />
                                    </FieldLabel>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        placeholder="Enter hospital address"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid(field)}
                                        className={inputClass}
                                    />
                                    {isInvalid(field) && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>
                    </FieldGroup>
                </section>

                {/* Description */}
                <section className="border-t border-slate-100 pt-6">
                    <SectionTitle>
                        Additional information
                        <span className="ml-2 text-xs font-normal text-slate-400">
                            Optional
                        </span>
                    </SectionTitle>

                    <form.Field name="description">
                        {(field) => (
                            <Field data-invalid={isInvalid(field)}>
                                <Textarea
                                    id={field.name}
                                    name={field.name}
                                    aria-label="Additional information"
                                    placeholder="Example: Patient is scheduled for surgery. Blood is needed for Room 302."
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    rows={4}
                                    maxLength={1000}
                                    className="resize-none rounded-xl border-slate-200 p-2.5"
                                />
                                <p className="text-right text-xs text-slate-400">
                                    {field.state.value.length}/1000
                                </p>
                                {isInvalid(field) && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                        )}
                    </form.Field>
                </section>

            </div>

            {/* Sticky submit bar: always visible while scrolling the form */}
            <div className="sticky bottom-0 z-10 flex flex-col gap-3 rounded-b-2xl border-t border-slate-200 bg-white/95 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-xs text-slate-500">
                    Fields marked <span className="text-red-600">*</span> are required.
                </p>

                <form.Subscribe selector={(state) => state.canSubmit}>
                    {(canSubmit) => (
                        <Button
                            type="submit"
                            disabled={isPending || !canSubmit}
                            className="h-11 w-full rounded-xl bg-red-600 px-8 font-semibold text-white hover:bg-red-700 sm:w-auto"
                        >
                            {isPending ? "Submitting..." : "Create blood request"}
                        </Button>
                    )}
                </form.Subscribe>
            </div>
        </form>
    );
}