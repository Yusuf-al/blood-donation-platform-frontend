
import {
    Activity,
    Droplets,
    HeartHandshake,
    Users,
} from "lucide-react";

const stats = [
    {
        title: "Total Users",
        value: "0",
        description: "Registered users",
        icon: Users,
    },
    {
        title: "Total Donors",
        value: "0",
        description: "Registered donors",
        icon: HeartHandshake,
    },
    {
        title: "Blood Requests",
        value: "0",
        description: "Total blood requests",
        icon: Droplets,
    },
    {
        title: "Completed Donations",
        value: "0",
        description: "Successful donations",
        icon: Activity,
    },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Welcome to the FASTBlood administration dashboard.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                                    <Icon className="h-5 w-5 text-red-600" />
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm font-medium text-slate-500">
                                    {stat.title}
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {stat.value}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Welcome Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                        <Droplets className="h-5 w-5 text-red-600" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            FASTBlood Administration
                        </h2>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                            Manage users, donors, blood requests, donations,
                            subscriptions, payments, and other platform activities
                            from the administration panel.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

