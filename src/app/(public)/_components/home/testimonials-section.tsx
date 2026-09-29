const testimonials = [
    {
        quote:
            "FASTBlood made it much easier to organize a blood request when our family needed help.",
        name: "Rahim Ahmed",
        role: "Requester",
    },
    {
        quote:
            "I wanted to donate regularly but didn't know how to find people who needed my blood group.",
        name: "Nusrat Jahan",
        role: "Donor",
    },
    {
        quote:
            "Having donor information organized in one platform can make emergency coordination much easier.",
        name: "Dr. Hasan",
        role: "Healthcare Professional",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                        Community stories
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                        Real people. Real impact.
                    </h2>
                </div>

                <div className="mt-14 grid gap-4 md:grid-cols-3">
                    {testimonials.map((item) => (
                        <div
                            key={item.name}
                            className="rounded-3xl bg-white p-7 shadow-sm"
                        >
                            <div className="text-4xl font-black text-red-100">“</div>

                            <p className="mt-3 leading-7 text-slate-600">
                                {item.quote}
                            </p>

                            <div className="mt-8 border-t border-slate-100 pt-5">
                                <p className="font-bold text-slate-950">{item.name}</p>
                                <p className="mt-1 text-xs text-slate-400">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}