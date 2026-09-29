import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function DonorSection() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-[2rem] bg-red-50">
                    <div className="grid items-center lg:grid-cols-2">
                        <div className="p-8 sm:p-12 lg:p-16">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white">
                                <Heart className="h-5 w-5 fill-current" />
                            </div>

                            <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                Your blood could be someone's second chance.
                            </h2>

                            <p className="mt-5 max-w-lg leading-7 text-slate-500">
                                Become a FASTBlood donor and make yourself available to people
                                who may need your blood group.
                            </p>

                            <Link
                                href="/become-donor"
                                className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-red-600 px-7 text-sm font-bold text-white transition hover:bg-red-700"
                            >
                                Become a Donor
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="hidden min-h-[400px] bg-red-600 lg:block">
                            <div className="flex h-full items-center justify-center">
                                <Heart className="h-40 w-40 fill-white text-white opacity-90" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}