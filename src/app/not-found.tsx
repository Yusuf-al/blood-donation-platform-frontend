"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Droplets,
    Home,
    SearchX,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    const router = useRouter();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.replace("/");
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />

            <div className="relative w-full max-w-lg text-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="mb-10 inline-flex items-center gap-2"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
                        <Droplets className="h-6 w-6 text-white" />
                    </span>

                    <span className="text-xl font-extrabold tracking-tight text-slate-900">
                        FAST<span className="text-red-600">Blood</span>
                    </span>
                </Link>

                {/* Illustration */}
                <div className="relative mx-auto mb-7 flex h-40 w-40 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-red-100/70" />
                    <div className="absolute inset-4 rounded-full border border-red-200" />

                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-red-900/5">
                        <SearchX className="h-12 w-12 text-red-600" />
                    </div>

                    <span className="absolute right-1 top-3 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white shadow-md">
                        404
                    </span>
                </div>

                {/* Message */}
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">
                    Page not found
                </p>

                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    Oops! You&apos;re off the map.
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                    The page you&apos;re looking for may have been moved,
                    deleted, or never existed. Let&apos;s get you back on track.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button
                        type="button"
                        onClick={handleGoBack}
                        variant="outline"
                        className="h-11 gap-2 border-slate-300 bg-white px-5 text-slate-700 hover:bg-slate-100"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </Button>

                    <Button
                        className="h-11 gap-2 bg-red-600 px-5 text-white hover:bg-red-700"
                    >
                        <Link href="/" className="flex justify-evenly" >
                            <Home className="h-4 w-4 gap-1" />
                            <span className="mx-3"> Back to Home </span>
                            <ArrowRight className="h-4 w-4 gap-1" />
                        </Link>
                    </Button>
                </div>

                <p className="mt-10 text-xs text-slate-400">
                    FASTBlood · Connecting donors with those in need.
                </p>
            </div>
        </main>
    );
}

