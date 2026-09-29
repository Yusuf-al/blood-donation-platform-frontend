import {
    FilePlus2,
    UsersRound,
    MessageCircle,
    HeartHandshake,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: FilePlus2,
        title: "Create a request",
        text: "Tell us the blood group, location and required details.",
    },
    {
        number: "02",
        icon: UsersRound,
        title: "Find donors",
        text: "FASTBlood helps identify potential donors who match the request.",
    },
    {
        number: "03",
        icon: MessageCircle,
        title: "Connect",
        text: "Coordinate with available donors through the platform.",
    },
    {
        number: "04",
        icon: HeartHandshake,
        title: "Help someone",
        text: "Complete the donation and make a real difference.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                            How it works
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            From request to connection in four simple steps.
                        </h2>
                    </div>
                </div>

                <div className="mt-14 grid gap-3 md:grid-cols-4">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="relative rounded-3xl bg-white p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                                        <Icon className="h-5 w-5 text-red-600" />
                                    </div>

                                    <span className="text-sm font-black text-slate-200">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mt-8 font-bold text-slate-950">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {step.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}