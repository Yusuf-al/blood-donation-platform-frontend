"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  HeartPulse,
  ImagePlus,
  Loader2,
} from "lucide-react";

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
import SignupForm from "../_components/SignUpForm";

export default function SignupPage() {

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
                Join FASTBlood
              </p>

              <h1 className="text-4xl font-bold leading-tight text-primary-foreground xl:text-5xl">
                Be there when
                <span className="block text-primary-foreground/80">
                  someone needs you.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/75">
                Create your account and become part of a community
                connecting blood donors with people in need.
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
                  Create an account
                </CardTitle>

                <CardDescription>
                  Join FASTBlood and help save lives
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SignupForm />

                {/* Login */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Legal */}
            <p className="mt-6 px-4 text-center text-xs leading-5 text-muted-foreground">
              By creating an account, you agree to our{" "}
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

