
"use client";

import Link from "next/link";
import { Eye, EyeOff, HeartPulse, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            // Connect this to your FASTBlood API
            console.log("Login:", formData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Connect this to your Google OAuth endpoint
        console.log("Google Login");
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="grid min-h-screen lg:grid-cols-2">
                {/* Left Side */}
                <div className="relative hidden overflow-hidden bg-primary lg:flex">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex w-fit items-center gap-2 text-primary-foreground"
                        >
                            <div className="flex size-11 items-center justify-center rounded-xl bg-white/15">
                                <HeartPulse className="size-6" />
                            </div>

                            <span className="text-2xl font-bold tracking-tight">
                                FAST<span className="font-normal">Blood</span>
                            </span>
                        </Link>

                        {/* Content */}
                        <div className="max-w-lg">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                                Blood Donation Platform
                            </p>

                            <h1 className="text-4xl font-bold leading-tight text-primary-foreground xl:text-5xl">
                                Every donation can
                                <span className="block text-primary-foreground/80">
                                    save a life.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/75">
                                Connect with blood donors, respond to urgent requests, and
                                help make blood available when it matters most.
                            </p>
                        </div>

                        {/* Footer */}
                        <p className="text-sm text-primary-foreground/60">
                            FASTBlood — Connecting donors with those in need.
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="mb-8 flex justify-center lg:hidden">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                    <HeartPulse className="size-5" />
                                </div>

                                <span className="text-2xl font-bold">
                                    <span className="text-primary">FAST</span>
                                    <span className="text-foreground">Blood</span>
                                </span>
                            </Link>
                        </div>

                        <Card className="border-border/60 shadow-xl">
                            <CardHeader className="space-y-2">
                                <CardTitle className="text-2xl">
                                    Welcome back
                                </CardTitle>

                                <CardDescription>
                                    Sign in to your FASTBlood account
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>

                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>


                                        </div>

                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="pr-10"
                                                required
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword((value) => !value)
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="size-4" />
                                                ) : (
                                                    <Eye className="size-4" />
                                                )}
                                            </button>
                                        </div>
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        className="h-11 w-full"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 size-4 animate-spin" />
                                                Signing in...
                                            </>
                                        ) : (
                                            "Sign in"
                                        )}
                                    </Button>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <Separator />
                                        </div>

                                        <div className="relative flex justify-center">
                                            <span className="bg-card px-3 text-xs text-muted-foreground">
                                                OR
                                            </span>
                                        </div>
                                    </div>

                                    {/* Google */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-11 w-full"
                                        onClick={handleGoogleLogin}
                                    >
                                        <svg
                                            className="mr-2 size-4"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill="#4285F4"
                                                d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.45h3.14c1.84-1.69 2.93-4.18 2.93-7.41Z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.5Z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M6.53 13.58A5.85 5.85 0 0 1 6.22 12c0-.55.1-1.08.31-1.58V7.89H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.11l3.25-2.53Z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.49 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.72 5.39l3.25 2.53c.77-2.31 2.93-4.03 5.47-4.03Z"
                                            />
                                        </svg>

                                        Continue with Google
                                    </Button>
                                </form>

                                {/* Register */}
                                <p className="mt-6 text-center text-sm text-muted-foreground">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/register"
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        Create an account
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>

                        {/* Legal */}
                        <p className="mt-6 px-4 text-center text-xs leading-5 text-muted-foreground">
                            By continuing, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-2 hover:text-foreground"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-2 hover:text-foreground"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

