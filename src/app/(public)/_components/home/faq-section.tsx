"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Who can become a blood donor?",
        answer:
            "Eligibility depends on factors such as age, health, recent donation history and local blood donation guidelines.",
    },
    {
        question: "How do I request blood?",
        answer:
            "Create an account, provide the required blood request information and submit your request through FASTBlood.",
    },
    {
        question: "Can I search for donors by blood group?",
        answer:
            "Yes. Donor search can be filtered using blood group, location and availability.",
    },
    {
        question: "Is my personal information protected?",
        answer:
            "FASTBlood uses role-based access controls to determine which information can be viewed by different users.",
    },
    {
        question: "Can I become a donor without responding to requests?",
        answer:
            "Yes. You can maintain your donor profile and availability status according to your circumstances.",
    },
];

export default function FaqSection() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-4xl px-5 sm:px-6">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-red-600">
                        FAQ
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                        Questions? We've got answers.
                    </h2>
                </div>

                <div className="mt-12 divide-y divide-slate-100">
                    {faqs.map((faq, index) => {
                        const isOpen = open === index;

                        return (
                            <div key={faq.question}>
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                                >
                                    <span className="font-semibold text-slate-900">
                                        {faq.question}
                                    </span>

                                    <ChevronDown
                                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="pb-6 pr-10 text-sm leading-7 text-slate-500">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}