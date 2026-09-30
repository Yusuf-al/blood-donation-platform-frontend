import Link from "next/link";
import {
    Check,
    Crown,
    HeartPulse,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
    Zap,
} from "lucide-react";

const plans = [
    {
        name: "Free",
        description: "For occasional blood requests.",
        price: "৳0",
        period: "forever",
        icon: HeartPulse,
        lead: null,
        features: [
            "3 blood requests per month",
            "Standard donor matching",
            "Browse available donor profiles",
            "Create and manage requests",
            "Track request status",
            "Basic request history",
        ],
        buttonText: "Get started free",
        href: "/signup",
        featured: false,
    },
    {
        name: "Premium",
        description: "For when you need a donor fast.",
        price: "৳149",
        period: "per year",
        icon: Crown,
        lead: "Everything in Free, plus:",
        features: [
            "10 blood requests per month",
            "Fast Matching for quicker donor discovery",
            "Donor contact number and address",
            "Direct messages to donors",
            "Priority donor matching",
            "Detailed request and donation history",
            "Priority support for urgent requests",
        ],
        buttonText: "Get Premium",
        href: "/premium",
        featured: true,
    },
];

const trust = [
    { icon: ShieldCheck, label: "Secure payments" },
    { icon: Phone, label: "Direct donor contact" },
    { icon: MessageCircle, label: "Direct messaging" },
    { icon: MapPin, label: "Location-based matching" },
];

export default function PremiumPricingSection() {
    return (
        <section className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Find a donor faster when every second matters
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
                        Start free. Upgrade to Premium for faster matching and direct
                        contact with donors.
                    </p>
                </div>

                {/* Plans */}
                <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:grid-cols-2 md:gap-8">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        const f = plan.featured;

                        return (
                            <div
                                key={plan.name}
                                className={`relative flex flex-col rounded-2xl p-6 sm:p-8 ${f
                                    ? "bg-red-600 text-white shadow-xl shadow-red-600/20"
                                    : "border border-slate-200 bg-white text-slate-900"
                                    }`}
                            >
                                {f && (
                                    <span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white sm:right-8 sm:top-8">
                                        Most popular
                                    </span>
                                )}

                                {/* Plan header */}
                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${f ? "bg-white text-red-600" : "bg-red-50 text-red-600"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </div>

                                <h3 className="mt-5 text-xl font-semibold">{plan.name}</h3>
                                <p
                                    className={`mt-1 text-sm ${f ? "text-red-100" : "text-slate-500"
                                        }`}
                                >
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <p className="mt-6 flex items-baseline gap-2">
                                    <span className="text-5xl font-bold tracking-tight">
                                        {plan.price}
                                    </span>
                                    <span
                                        className={`text-sm ${f ? "text-red-100" : "text-slate-500"
                                            }`}
                                    >
                                        {plan.period}
                                    </span>
                                </p>

                                {/* CTA sits above features so it is always visible */}
                                <Link
                                    href={plan.href}
                                    className={`mt-6 flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${f
                                        ? "bg-white text-red-700 hover:bg-red-50 focus-visible:ring-white focus-visible:ring-offset-red-600"
                                        : "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900 focus-visible:ring-offset-white"
                                        }`}
                                >
                                    {plan.buttonText}
                                </Link>

                                <p
                                    className={`mt-3 h-4 text-center text-xs ${f ? "text-red-100" : "text-transparent"
                                        }`}
                                    aria-hidden={!f}
                                >
                                    {f ? "Cancel anytime. No long-term commitment." : "."}
                                </p>

                                {/* Features */}
                                <div
                                    className={`mt-6 flex-1 border-t pt-6 ${f ? "border-white/20" : "border-slate-200"
                                        }`}
                                >
                                    {plan.lead && (
                                        <p className="mb-4 text-sm font-semibold">{plan.lead}</p>
                                    )}
                                    <ul className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <Check
                                                    className={`mt-0.5 h-4 w-4 shrink-0 ${f ? "text-white" : "text-red-600"
                                                        }`}
                                                    strokeWidth={3}
                                                    aria-hidden="true"
                                                />
                                                <span
                                                    className={`text-sm leading-6 ${f ? "text-red-50" : "text-slate-600"
                                                        }`}
                                                >
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Urgent callout */}
                <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <Zap className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Need a donor right now?
                            </h3>
                            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                                Fast Matching and direct donor contact help you coordinate
                                urgently, without waiting for replies.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/premium"
                        className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-red-600 px-5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                    >
                        Upgrade for ৳149
                    </Link>
                </div>

                {/* Trust points */}
                <ul className="mt-10 grid grid-cols-2 gap-4 text-sm text-slate-600 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-8">
                    {trust.map(({ icon: Icon, label }) => (
                        <li key={label} className="flex items-center gap-2">
                            <Icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}