import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/* ---------------- MOCK LOG DATA ---------------- */
const INITIAL_LOGS = [
    { id: 1, timestamp: "2026-01-05 10:12:34", user: "Admin", action: "Created new plan: Super Stream" },
    { id: 2, timestamp: "2026-01-05 09:55:10", user: "Staff - John", action: "Updated subscriber details" },
    { id: 3, timestamp: "2026-01-04 18:21:44", user: "Admin", action: "Suspended subscriber ID #1023" },
    { id: 4, timestamp: "2026-01-04 16:02:11", user: "Staff - Jane", action: "Resolved support ticket #458" },
    { id: 5, timestamp: "2026-01-04 14:45:29", user: "System", action: "Daily backup completed" },
    { id: 6, timestamp: "2026-01-04 11:30:01", user: "Admin", action: "Updated staff role permissions" },
    { id: 7, timestamp: "2026-01-03 19:10:55", user: "System", action: "Auto-renewal cron executed" },
];

/* ---------------- COMPONENT ---------------- */
const Logs = () => {
    const { isDark } = useTheme();

    const [logs] = useState(INITIAL_LOGS);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 5;

    /* ---------------- PAGINATION ---------------- */
    const totalPages = Math.max(1, Math.ceil(logs.length / ITEMS_PER_PAGE));

    const paginatedLogs = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return logs.slice(start, start + ITEMS_PER_PAGE);
    }, [logs, currentPage]);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    System Activity Logs
                </h1>

            </div>

            {/* Logs Table */}
            <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className={isDark ? "bg-slate-800/50" : "bg-gray-50"}>
                            <tr>
                                <th className={`px-6 py-3 text-xs font-semibold uppercase ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                                    Timestamp
                                </th>
                                <th className={`px-6 py-3 text-xs font-semibold uppercase ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                                    User
                                </th>
                                <th className={`px-6 py-3 text-xs font-semibold uppercase ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className={isDark ? "divide-y divide-slate-800" : "divide-y divide-gray-100"}>
                            {paginatedLogs.map(log => (
                                <tr key={log.id} className={isDark ? "hover:bg-slate-800/40" : "hover:bg-gray-50"}>
                                    <td className={`px-6 py-4 text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                                        {log.timestamp}
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {/* <Activity className="w-4 h-4 text-blue-400" /> */}
                                        <span className={isDark ? "text-white" : "text-gray-900"}>
                                            {log.user}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 text-sm ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                                        {log.action}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div
                    className={`p-4 border-t flex items-center justify-between
    ${isDark ? "border-slate-800" : "border-gray-200"}`}
                >
                    <span
                        className={`text-sm ${isDark ? "text-slate-400" : "text-gray-500"}`}
                    >
                        Page {currentPage} of {totalPages}
                    </span>

                    <div className="flex items-center gap-2">
                        {/* Prev */}
                        <button
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg border transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isDark
                                    ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                                    : "border-gray-300 hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border
        ${currentPage === page
                                        ? isDark
                                            ? 'bg-blue-600 text-white border-blue-500'
                                            : 'bg-purple-600 text-white border-purple-500'
                                        : isDark
                                            ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                            : 'border-purple-200 text-purple-700 hover:bg-purple-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg border transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isDark
                                    ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                                    : "border-gray-300 hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Logs;
