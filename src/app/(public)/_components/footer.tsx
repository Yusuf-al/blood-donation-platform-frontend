
import Link from "next/link";
import { HeartPulse, Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex w-fit items-center gap-2">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <HeartPulse className="size-5" />
                            </div>

                            <span className="text-xl font-bold tracking-tight">
                                <span className="text-primary">FAST</span>
                                <span className="text-foreground">Blood</span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                            Connecting blood donors with people in need. FASTBlood
                            makes it easier to find donors, respond to emergency
                            blood requests, and help save lives.
                        </p>

                        <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="size-4" />
                                <a
                                    href="mailto:support@fastblood.com"
                                    className="transition-colors hover:text-primary"
                                >
                                    support@fastblood.com
                                </a>
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone className="size-4" />
                                <a
                                    href="tel:+8801000000000"
                                    className="transition-colors hover:text-primary"
                                >
                                    +880 1000-000000
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="text-sm font-semibold">
                            Platform
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/find-donors"
                                    className="transition-colors hover:text-primary"
                                >
                                    Find Blood Donors
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/blood-requests"
                                    className="transition-colors hover:text-primary"
                                >
                                    Blood Requests
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/become-donor"
                                    className="transition-colors hover:text-primary"
                                >
                                    Become a Donor
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/emergency"
                                    className="transition-colors hover:text-primary"
                                >
                                    Emergency Requests
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold">
                            Company
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/about"
                                    className="transition-colors hover:text-primary"
                                >
                                    About FASTBlood
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="transition-colors hover:text-primary"
                                >
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/privacy"
                                    className="transition-colors hover:text-primary"
                                >
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/terms"
                                    className="transition-colors hover:text-primary"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} FASTBlood. All rights reserved.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Built to connect people. Built to save lives.
                    </p>
                </div>
            </div>
        </footer>
    );
}

