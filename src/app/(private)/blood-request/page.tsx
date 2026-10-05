
import {

    CheckCircle2,
    Droplets,
    ShieldCheck,

} from "lucide-react";
import BloodRequestForm from "../_components/blood-request-form";


export default function BloodRequestFormPage() {

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Droplets className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Create blood request
                    </h1>
                    <p className="text-sm text-slate-500">
                        Share the details so suitable donors can respond.
                    </p>
                </div>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                {/* Form */}
                <BloodRequestForm />

                {/* Info panel */}
                <aside className="space-y-4 lg:sticky lg:top-24">


                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="text-sm font-semibold text-slate-900">
                            What happens next
                        </h2>
                        <ol className="mt-4 space-y-4">
                            {[
                                "Your request is published to matching donors.",
                                "Available donors accept and contact you.",
                                "Confirm the donation and track its status.",
                            ].map((step, index) => (
                                <li key={step} className="flex gap-3 text-sm text-slate-600">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-semibold text-red-600">
                                        {index + 1}
                                    </span>
                                    <span className="leading-6">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="text-sm font-semibold text-slate-900">
                            Tips for a faster response
                        </h2>
                        <ul className="mt-3 space-y-3">
                            {[
                                "Use a phone number that is always reachable.",
                                "Add the ward or room number in the notes.",
                                "Mark urgency honestly so real emergencies come first.",
                            ].map((tip) => (
                                <li key={tip} className="flex gap-2.5 text-sm text-slate-600">
                                    <CheckCircle2
                                        className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                                        aria-hidden="true"
                                    />
                                    <span className="leading-5">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="flex items-start gap-2 px-1 text-xs leading-5 text-slate-500">
                        <ShieldCheck
                            className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                            aria-hidden="true"
                        />
                        Your phone number is only shared with donors who respond to this
                        request.
                    </p>
                </aside>
            </div>
        </div>
    );
}