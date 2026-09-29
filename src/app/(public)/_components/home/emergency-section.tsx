import Link from "next/link";
import { ArrowRight, Siren } from "lucide-react";

export default function EmergencySection() {
    return (
        <section className="bg-red-600 py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                    <div className="flex gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                            <Siren className="h-7 w-7 text-white" />
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-red-100">
                                Emergency blood request
                            </p>

                            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Need blood urgently?
                            </h2>

                            <p className="mt-3 max-w-xl text-red-100">
                                Create a request and start connecting with potential donors.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/request-blood"
                        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-red-600 transition hover:bg-red-50"
                    >
                        Request Blood
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}