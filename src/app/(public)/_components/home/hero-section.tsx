"use client";

import Link from "next/link";
import {
    ArrowRight,
    HeartPulse,
    ShieldCheck,
    Users,
} from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
                <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                    {/* Content */}
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                            <HeartPulse className="h-4 w-4" />
                            Connecting donors with people in need
                        </div>

                        <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                            One donation can
                            <span className="text-red-600"> save a life.</span>
                        </h1>

                        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
                            FASTBlood makes it easier to find compatible blood donors,
                            respond to emergencies, and make a meaningful difference when
                            every second matters.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/find-blood"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-7 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
                            >
                                Find Blood
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/become-donor"
                                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
                            >
                                Become a Donor
                            </Link>
                        </div>

                        <div className="mt-9 flex flex-wrap gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                Verified donors
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-red-600" />
                                Real-time matching
                            </div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-[2rem] bg-red-600 p-4 shadow-2xl shadow-red-900/10">
                            <div className="rounded-[1.5rem] bg-red-500 p-8 sm:p-10">
                                <HeartPulse className="h-16 w-16 text-white" />

                                <p className="mt-16 text-sm font-medium text-red-100">
                                    Every contribution matters
                                </p>

                                <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                                    Give blood.
                                    <br />
                                    Give hope.
                                </h2>

                                <div className="mt-10 grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                                        <p className="text-2xl font-bold text-white">12K+</p>
                                        <p className="mt-1 text-xs text-red-100">
                                            Registered donors
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                                        <p className="text-2xl font-bold text-white">8K+</p>
                                        <p className="mt-1 text-xs text-red-100">
                                            Donations
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-xl sm:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                                    <ShieldCheck className="h-5 w-5 text-green-600" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-slate-900">
                                        Trusted platform
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Built for safer connections
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}