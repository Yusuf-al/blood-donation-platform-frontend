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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profileImage: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("phone", formData.phone);

      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      // TODO: Connect to FASTBlood API
      //
      // const response = await fetch(
      //   `${ process.env.NEXT_PUBLIC_API_URL } /auth/register`,
      //   {
      //     method: "POST",
      //     body: data,
      //   }
      // );

      console.log("Signup data:", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profileImage: formData.profileImage,
      });
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Connect Google OAuth endpoint
    console.log("Google signup");
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center gap-3 pb-2">
                    <label
                      htmlFor="profileImage"
                      className="group relative flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted transition-colors hover:border-primary"
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile preview"
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <ImagePlus className="size-6" />
                          <span className="text-[10px]">
                            Photo
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Change
                      </div>
                    </label>

                    <input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <p className="text-xs text-muted-foreground">
                      Profile photo · JPG, PNG or WebP
                    </p>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full name
                    </Label>

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

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

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone number
                    </Label>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+880 1XXXXXXXXX"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={
                          showPassword ? "text" : "password"
                        }
                        placeholder="Create a password"
                        autoComplete="new-password"
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
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm password
                    </Label>

                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pr-10"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (value) => !value
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
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
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative py-1">
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
                    onClick={handleGoogleSignup}
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

