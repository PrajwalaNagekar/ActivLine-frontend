import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

/* ---------------- MOCK DATA ---------------- */

// Revenue
const revenueData = [
    { period: "Jan", revenue: 120000 },
    { period: "Feb", revenue: 145000 },
    { period: "Mar", revenue: 160000 },
    { period: "Apr", revenue: 190000 },
    { period: "May", revenue: 220000 },
    { period: "Jun", revenue: 260000 },
];

// Churn
const churnData = [
    { month: "Jan", newUsers: 320, churned: 45 },
    { month: "Feb", newUsers: 380, churned: 60 },
    { month: "Mar", newUsers: 420, churned: 55 },
    { month: "Apr", newUsers: 500, churned: 70 },
    { month: "May", newUsers: 560, churned: 90 },
];

// Support
const supportData = [
    { week: "W1", tickets: 120, resolutionTime: 4.2 },
    { week: "W2", tickets: 140, resolutionTime: 3.8 },
    { week: "W3", tickets: 180, resolutionTime: 3.4 },
    { week: "W4", tickets: 210, resolutionTime: 3.1 },
];

const Reports = () => {
    const { isDark } = useTheme();

    const cardStyle = isDark
        ? "bg-slate-900 border-slate-800"
        : "bg-white border-gray-200";

    const titleStyle = isDark ? "text-white" : "text-gray-900";

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className={`text-2xl font-bold ${titleStyle}`}>Reports & Analytics</h1>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-12 gap-6">

                {/* Revenue Report */}
                <div className={`col-span-12 lg:col-span-6 p-4 rounded-xl border ${cardStyle}`}>
                    <h3 className={`font-semibold mb-3 ${titleStyle}`}>
                        Revenue Growth (Monthly)
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Churn Analysis */}
                <div className={`col-span-12 lg:col-span-6 p-4 rounded-xl border ${cardStyle}`}>
                    <h3 className={`font-semibold mb-3 ${titleStyle}`}>
                        Customer Churn Analysis
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={churnData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="newUsers" fill="#22c55e" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Support Performance */}
                <div className={`col-span-12 p-4 rounded-xl border ${cardStyle}`}>
                    <h3 className={`font-semibold mb-3 ${titleStyle}`}>
                        Support Performance
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={supportData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="tickets"
                                stroke="#a855f7"
                                strokeWidth={3}
                                name="Tickets Volume"
                            />
                            <Line
                                type="monotone"
                                dataKey="resolutionTime"
                                stroke="#f59e0b"
                                strokeWidth={3}
                                name="Avg Resolution (hrs)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Reports;
