import {
    Users,
    HeartHandshake,
    Activity,
    MapPinned,
} from "lucide-react";

const stats = [
    {
        value: "12K+",
        label: "Registered Donors",
        icon: Users,
    },
    {
        value: "8K+",
        label: "Successful Donations",
        icon: HeartHandshake,
    },
    {
        value: "2K+",
        label: "Blood Requests",
        icon: Activity,
    },
    {
        value: "64",
        label: "Districts Reached",
        icon: MapPinned,
    },
];

export default function ImpactSection() {
    return (
        <section className="bg-slate-950 py-20 text-white">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                        Our impact
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                        Together, we can make every drop count.
                    </h2>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className="rounded-3xl bg-white/5 p-6 transition hover:bg-white/10"
                            >
                                <Icon className="h-6 w-6 text-red-400" />

                                <p className="mt-8 text-4xl font-black">
                                    {stat.value}
                                </p>

                                <p className="mt-2 text-sm text-slate-400">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}