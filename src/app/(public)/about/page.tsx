
import {
    ArrowRight,
    CheckCircle2,
    HeartHandshake,
    HeartPulse,
    Search,
    ShieldCheck,
    Users,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                            <HeartHandshake className="h-4 w-4" />
                            About FASTBlood
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Connecting people with the blood they need,
                            <span className="text-red-600"> when they need it.</span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            FASTBlood is a blood donation and emergency response platform
                            designed to make finding compatible blood donors faster,
                            simpler, and more organized.
                        </p>
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                                Who We Are
                            </span>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Technology designed around a human need.
                            </h2>

                            <p className="mt-5 text-base leading-7 text-slate-600">
                                Finding blood during an emergency can be stressful. Families
                                often depend on social media posts, phone calls, personal
                                contacts, or scattered donor lists.
                            </p>

                            <p className="mt-4 text-base leading-7 text-slate-600">
                                FASTBlood brings this process into one organized platform.
                                Users can create blood requests, discover compatible donors,
                                manage donor profiles, and track request activity through a
                                centralized system.
                            </p>

                            <div className="mt-7">
                                <Link
                                    href="/how-it-works"
                                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                                >
                                    See How FASTBlood Works
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:p-8">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                                    <HeartPulse className="h-7 w-7 text-red-600" />
                                    <h3 className="mt-4 font-bold text-slate-900">
                                        Emergency Focus
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Designed to make blood requests easier to create and
                                        discover.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                                    <Users className="h-7 w-7 text-red-600" />
                                    <h3 className="mt-4 font-bold text-slate-900">
                                        Community Driven
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Connects donors and people looking for blood through one
                                        platform.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                                    <ShieldCheck className="h-7 w-7 text-green-600" />
                                    <h3 className="mt-4 font-bold text-slate-900">
                                        Privacy Focused
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Access to donor information is controlled by platform
                                        permissions.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                                    <Search className="h-7 w-7 text-red-600" />
                                    <h3 className="mt-4 font-bold text-slate-900">
                                        Easier Discovery
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Search and matching features help users discover relevant
                                        donor profiles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="bg-slate-50 py-14 sm:py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-red-600 px-6 py-10 text-center text-white shadow-xl shadow-red-100 sm:px-10 sm:py-14">
                        <HeartHandshake className="mx-auto h-10 w-10" />

                        <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-red-100">
                            Our Mission
                        </p>

                        <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-bold sm:text-3xl lg:text-4xl">
                            Make blood donor discovery more accessible, organized, and
                            responsive.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-red-100 sm:text-base">
                            FASTBlood aims to provide a structured digital environment where
                            donors can make themselves available and people in need can
                            submit and manage blood requests more efficiently.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                            What Matters to Us
                        </span>

                        <h2 className="mt-3 text-3xl font-bold text-slate-900">
                            Built around trust and accessibility.
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {[
                            {
                                icon: HeartPulse,
                                title: "People First",
                                description:
                                    "The platform is designed around the needs of donors and people searching for blood.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Responsible Access",
                                description:
                                    "Sensitive donor information should only be available to authorized users and workflows.",
                            },
                            {
                                icon: CheckCircle2,
                                title: "Simple Experience",
                                description:
                                    "Blood requests and donor registration should be straightforward, even during stressful situations.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6"
                                >
                                    <Icon className="h-7 w-7 text-red-600" />

                                    <h3 className="mt-4 text-lg font-bold text-slate-900">
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

            {/* CTA */}
            <section className="border-t border-slate-200 bg-slate-50 py-12">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
                    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Be part of a connected blood donation community.
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                        Register as a donor or create a blood request through FASTBlood.
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
                            href="/how-it-works"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            How It Works
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

