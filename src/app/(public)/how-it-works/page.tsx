
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    Droplets,
    HeartHandshake,
    HeartPulse,
    MapPin,
    MessageCircle,
    Search,
    ShieldCheck,
    UserPlus,
    Users,
} from "lucide-react";

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                            <HeartHandshake className="h-4 w-4" />
                            How FASTBlood Works
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Finding and connecting with blood donors,
                            <span className="text-red-600"> made simpler.</span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Whether you need blood or want to donate, FASTBlood gives you a
                            structured way to connect with the right people.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Overview */}
            <section className="bg-white py-10">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            {
                                number: "01",
                                title: "Create an account",
                                icon: UserPlus,
                            },
                            {
                                number: "02",
                                title: "Create or find",
                                icon: Search,
                            },
                            {
                                number: "03",
                                title: "Connect & respond",
                                icon: MessageCircle,
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.number}
                                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                                        <Icon className="h-5 w-5 text-red-600" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-red-600">
                                            STEP {item.number}
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Requester Workflow */}
            <section className="py-14 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-2xl">
                        <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                            For People Looking for Blood
                        </span>

                        <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Need blood? Start with a request.
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                            Create a blood request with the important information needed to
                            help identify compatible donors.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-4">
                        {[
                            {
                                step: "01",
                                icon: ClipboardList,
                                title: "Create a request",
                                description:
                                    "Provide the required blood group, location, urgency, and patient information.",
                            },
                            {
                                step: "02",
                                icon: Search,
                                title: "Find donors",
                                description:
                                    "FASTBlood helps you discover donor profiles that match your requirements.",
                            },
                            {
                                step: "03",
                                icon: MessageCircle,
                                title: "Connect",
                                description:
                                    "Use the available communication features to coordinate with suitable donors.",
                            },
                            {
                                step: "04",
                                icon: CheckCircle2,
                                title: "Track progress",
                                description:
                                    "Monitor your request status and donation assignment through the platform.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.step}
                                    className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                                            <Icon className="h-5 w-5 text-red-600" />
                                        </div>

                                        <span className="text-sm font-bold text-slate-300">
                                            {item.step}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 font-bold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Donor Workflow */}
            <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-2xl">
                        <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                            For Blood Donors
                        </span>

                        <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Become a donor in a few simple steps.
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                            Create your donor profile and make your availability visible to
                            people who may need your blood group.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-4">
                        {[
                            {
                                step: "01",
                                icon: UserPlus,
                                title: "Register",
                                description:
                                    "Create your FASTBlood account and verify your email.",
                            },
                            {
                                step: "02",
                                icon: Droplets,
                                title: "Become a donor",
                                description:
                                    "Provide your blood group, date of birth, city, and donor information.",
                            },
                            {
                                step: "03",
                                icon: MapPin,
                                title: "Set availability",
                                description:
                                    "Keep your donor availability information updated.",
                            },
                            {
                                step: "04",
                                icon: HeartHandshake,
                                title: "Help someone",
                                description:
                                    "Respond to suitable blood requests when you are available to donate.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.step}
                                    className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                                            <Icon className="h-5 w-5 text-red-600" />
                                        </div>

                                        <span className="text-sm font-bold text-slate-300">
                                            {item.step}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 font-bold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/become-donor"
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            Become a Donor
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Matching */}
            <section className="py-14 sm:py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-slate-900 p-7 text-white sm:p-10 lg:p-12">
                        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600">
                                        <Users className="h-5 w-5" />
                                    </div>

                                    <span className="text-sm font-semibold text-red-300">
                                        Donor Matching
                                    </span>
                                </div>

                                <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                                    The right information helps people find relevant donors.
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                                    FASTBlood uses information such as blood group, location,
                                    and donor availability to help users discover relevant donor
                                    profiles.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-80">
                                <div className="rounded-2xl bg-white/5 p-4">
                                    <Droplets className="h-5 w-5 text-red-400" />
                                    <p className="mt-3 text-xs text-slate-400">Blood Group</p>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-4">
                                    <MapPin className="h-5 w-5 text-red-400" />
                                    <p className="mt-3 text-xs text-slate-400">Location</p>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-4">
                                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                                    <p className="mt-3 text-xs text-slate-400">Availability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety / Privacy */}
            <section className="border-t border-slate-200 bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 p-6">
                            <ShieldCheck className="h-7 w-7 text-green-600" />

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                                Protected information
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                FASTBlood uses authentication and authorization controls to
                                manage access to user and donor information.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-6">
                            <HeartPulse className="h-7 w-7 text-red-600" />

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                                Built for coordination
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                The platform helps organize requests, donor information,
                                assignments, and communication in one place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-50 py-12">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Ready to make a difference?
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                        Join FASTBlood as a donor or start a blood request.
                    </p>

                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/become-donor"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            Become a Donor
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/request-blood"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Request Blood
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

