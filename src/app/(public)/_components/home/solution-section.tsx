import {
    Search,
    UserCheck,
    BellRing,
    HeartPulse,
} from "lucide-react";

const solutions = [
    {
        number: "01",
        icon: Search,
        title: "Find compatible donors",
        text: "Search based on blood group, location and availability.",
    },
    {
        number: "02",
        icon: UserCheck,
        title: "Connect with verified donors",
        text: "Get access to donor information through a structured platform.",
    },
    {
        number: "03",
        icon: BellRing,
        title: "Respond faster",
        text: "Keep donors informed when someone needs help.",
    },
    {
        number: "04",
        icon: HeartPulse,
        title: "Make an impact",
        text: "Turn a simple donation into meaningful support for someone.",
    },
];

export default function SolutionSection() {
    return (
        <section className="bg-red-50 py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                        Our solution
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                        A simpler way to connect people who can help with people who need help.
                    </h2>
                </div>

                <div className="mt-14 grid gap-4 md:grid-cols-2">
                    {solutions.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.number}
                                className="group rounded-[2rem] bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                                        <Icon className="h-5 w-5 text-red-600" />
                                    </div>

                                    <span className="text-sm font-black text-slate-200">
                                        {item.number}
                                    </span>
                                </div>

                                <h3 className="mt-10 text-xl font-bold text-slate-950">
                                    {item.title}
                                </h3>

                                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                                    {item.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}