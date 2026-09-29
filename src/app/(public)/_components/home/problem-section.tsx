import {
    Clock3,
    SearchX,
    PhoneCall,
} from "lucide-react";

const problems = [
    {
        icon: SearchX,
        title: "Finding the right donor is difficult",
        description:
            "Searching through contacts and social media can take valuable time during an emergency.",
    },
    {
        icon: Clock3,
        title: "Every minute matters",
        description:
            "Blood emergencies often require a quick response and reliable donor information.",
    },
    {
        icon: PhoneCall,
        title: "Communication gets complicated",
        description:
            "Coordinating between patients, families, hospitals, and donors can become overwhelming.",
    },
];

export default function ProblemSection() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                            The challenge
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                            When you need blood, searching shouldn't be the hardest part.
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {problems.map((problem) => {
                            const Icon = problem.icon;

                            return (
                                <div
                                    key={problem.title}
                                    className="flex gap-5 rounded-3xl bg-slate-50 p-6"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                                        <Icon className="h-5 w-5 text-red-600" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            {problem.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {problem.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}