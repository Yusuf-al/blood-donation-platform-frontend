import { Droplets } from "lucide-react";

export default function FindDonorsHeader() {
    return (
        <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-red-600">
                        <Droplets className="h-4 w-4" />
                        FASTBlood Donor Network
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Find a Blood Donor
                    </h1>

                    <p className="mt-3 text-base leading-7 text-slate-600">
                        Search for blood donors by blood group, location,
                        and availability.
                    </p>
                </div>
            </div>
        </section>
    );
}