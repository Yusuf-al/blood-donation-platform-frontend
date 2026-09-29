import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

export default function CtaSection() {
    return (
        <section className="px-5 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-center sm:px-12 lg:py-24">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white">
                    <HeartPulse className="h-7 w-7" />
                </div>

                <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Ready to make a difference?
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-slate-400">
                    Whether you need blood or want to donate, your next action could
                    help someone when they need it most.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/find-blood"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-7 text-sm font-bold text-white transition hover:bg-red-700"
                    >
                        Find Blood
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                        href="/become-donor"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                    >
                        Become a Donor
                    </Link>
                </div>
            </div>
        </section>
    );
}