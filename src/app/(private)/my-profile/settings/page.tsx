
"use client";

import { useProfile } from "@/hooks";
import { useRouter } from "next/navigation";
import SettingsPage from "./setting-page";

export default function SettingsRoute() {
    const router = useRouter();
    const { data, isPending, isError } = useProfile();

    const user = data?.data;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const usage = user?.requestUsage?.find(
        (item: { year: number; month: number }) =>
            item.year === currentYear &&
            item.month === currentMonth
    );

    if (isPending) {
        return <div className="p-6">Loading settings...</div>;
    }

    if (isError || !user) {
        return <div className="p-6">Unable to load settings.</div>;
    }

    return (
        <SettingsPage
            user={{
                isPremiumUser: user.isPremiumUser,
            }}
            usage={{
                year: usage?.year ?? currentYear,
                month: usage?.month ?? currentMonth,
                requestCount: usage?.requestCount ?? 0,
            }}
            subscriptionStartDate={
                usage?.subscriptionStartDate ?? null
            }
            onUpgrade={() => router.push("/premium")}
        />
    );
}