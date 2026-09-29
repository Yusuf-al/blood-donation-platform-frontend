import {
    ShieldCheck,
    Zap,
    Bell,
    LockKeyhole,
    MapPin,
    CreditCard,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified donor profiles",
        text: "Build trust with structured donor information and verification.",
    },
    {
        icon: Zap,
        title: "Fast blood matching",
        text: "Find potential donors based on blood group and location.",
    },
    {
        icon: Bell,
        title: "Real-time notifications",
        text: "Keep donors and requesters informed throughout the process.",
    },
    {
        icon: LockKeyhole,
        title: "Privacy focused",
        text: "Sensitive contact information stays protected based on access rules.",
    },
    {
        icon: MapPin,
        title: "Location based search",
        text: "Find donors around the city or area where help is needed.",
    },
    {
        icon: CreditCard,
        title: "Premium access",
        text: "Support advanced platform features through subscription plans.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                        Why FASTBlood
                    </p>

                    <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                        Everything you need when blood matters most.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-slate-500">
                        Designed to make blood donation and emergency requests easier,
                        faster and more organized.
                    </p>
                </div>

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="rounded-3xl border-0 bg-slate-50 p-7 transition hover:bg-red-50"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                                    <Icon className="h-5 w-5 text-red-600" />
                                </div>

                                <h3 className="mt-7 font-bold text-slate-950">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {feature.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}