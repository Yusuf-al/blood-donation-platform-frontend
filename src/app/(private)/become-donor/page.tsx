import { CheckCircle2, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import BecomeDonorForm from "../_components/become-donor-form";
import AuthGuard from "@/components/shared/AuthGuard";
import RoleGuard from "@/components/shared/RoleGuard ";
// Adjust this import path to match your project


const points = [
    { icon: CheckCircle2, label: "Free registration" },
    { icon: ShieldCheck, label: "Your information stays secure" },
    { icon: Users, label: "Help patients in your community" },
];

export default function BecomeDonorPage() {
    return (
        <RoleGuard roles={["REQUESTER"]}>
            <main className="bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="grid items-start gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
                        {/* Intro: compact on mobile, sticky beside the form on desktop */}
                        <div className="lg:sticky lg:top-24">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                                <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                            </div>

                            <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                                Your blood can give someone another chance
                            </h1>

                            <p className="mt-3 text-base leading-7 text-slate-600">
                                Register as a donor on FASTBlood so patients can find a
                                compatible donor near them when they need one most.
                            </p>

                            <ul className="mt-6 hidden space-y-3 sm:block">
                                {points.map(({ icon: Icon, label }) => (
                                    <li
                                        key={label}
                                        className="flex items-center gap-3 text-sm text-slate-700"
                                    >
                                        <Icon
                                            className="h-5 w-5 shrink-0 text-red-600"
                                            aria-hidden="true"
                                        />
                                        {label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Form */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                            <BecomeDonorForm />
                        </div>
                    </div>
                </div>
            </main>
        </RoleGuard>
    );
}