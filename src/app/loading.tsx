
import { Droplets, HeartPulse } from "lucide-react";

export default function Loading() {
    return (
        <main
            className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4"
            role="status"
            aria-live="polite"
            aria-label="Loading page"
        >
            <div className="flex w-full max-w-sm flex-col items-center text-center">
                {/* Animated logo */}
                <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-red-100 opacity-60" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/20">
                        <Droplets className="h-10 w-10 animate-pulse text-white" />
                    </div>

                    <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-50 bg-white">
                        <HeartPulse className="h-4 w-4 text-red-600" />
                    </span>
                </div>

                {/* Brand */}
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    FAST<span className="text-red-600">Blood</span>
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Connecting donors with those in need.
                </p>

                {/* Loading indicator */}
                <div className="mt-8 w-full max-w-52">
                    <div className="h-1.5 overflow-hidden rounded-full bg-red-100">
                        <div className="h-full w-2/5 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-red-600" />
                    </div>

                    <p className="mt-4 animate-pulse text-sm font-medium text-slate-600">
                        Preparing your experience...
                    </p>
                </div>
            </div>

            <style>
                {`
                    @keyframes loading {
                        0 % {
                            transform: translateX(-100 %);
                        }
                        100 % {
                            transform: translateX(250 %);
                        }
                    }

                        @media(prefers - reduced - motion: reduce) {
                                *, *:: before, *::after {
                                animation - duration: 0.01ms!important;
                                animation - iteration - count: 1!important;
                            }
                        }
`}
            </style>
        </main>
    );
}

