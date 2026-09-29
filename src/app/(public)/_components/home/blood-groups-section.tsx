const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

export default function BloodGroupsSection() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] bg-slate-950 p-8 sm:p-12 lg:p-16">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                                Find your match
                            </p>

                            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">
                                Every blood group matters.
                            </h2>

                            <p className="mt-5 max-w-md leading-7 text-slate-400">
                                Search for available donors by blood group and location when
                                you need help.
                            </p>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {bloodGroups.map((group) => (
                                <div
                                    key={group}
                                    className="flex aspect-square items-center justify-center rounded-2xl bg-white/5 text-2xl font-black text-white transition hover:bg-red-600"
                                >
                                    {group}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}