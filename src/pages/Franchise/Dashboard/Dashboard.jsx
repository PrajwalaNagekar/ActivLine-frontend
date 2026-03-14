import React, { useEffect, useMemo, useState } from 'react'
import FullScreenLoader from '../../../components/loaders/FullscreenLoaderWithLogo';
import KPICard from '../../../components/KPICard';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { getFranchiseReportSummary } from '../../../api/reportapi';

const formatAmount = (value, currency = 'INR') => {
    const amount = Number(value || 0);
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    }).format(Number.isNaN(amount) ? 0 : amount);
};

const formatDateTime = (value) => {
    if (!value) return '--';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '--';
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

const Dashboard = () => {
    const { isDark } = useTheme();
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [summary, setSummary] = useState(null);

    const resolvedAccountId = useMemo(
        () => user?.accountId || user?.AccountId || user?.account_id || '',
        [user]
    );

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                setIsLoading(true);
                setError('');

                if (!resolvedAccountId) {
                    throw new Error('Missing accountId for dashboard reports');
                }

                const data = await getFranchiseReportSummary({
                    accountId: resolvedAccountId,
                    months: 6,
                });

                if (mounted) setSummary(data || null);
            } catch (err) {
                if (mounted) {
                    setSummary(null);
                    setError(err?.response?.data?.message || err?.message || 'Failed to load dashboard reports');
                }
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        load();

        return () => {
            mounted = false;
        };
    }, [resolvedAccountId]);

    const kpis = useMemo(() => {
        const totalCollectedAmount = summary?.totalCollectedAmount ?? 0;
        const customersCreatedThisMonth = summary?.customersCreatedThisMonth ?? 0;
        const resolvedTicketsThisMonth = summary?.resolvedTicketsThisMonth ?? 0;
        const openTicketCustomers = summary?.openTicketCustomers ?? 0;

        return [
            {
                title: 'Total Collected',
                value: formatAmount(totalCollectedAmount),
                sub: 'Last 6 months',
            },
            {
                title: 'Customers Created',
                value: String(customersCreatedThisMonth),
                sub: 'This month',
            },
            {
                title: 'Resolved Tickets',
                value: String(resolvedTicketsThisMonth),
                sub: 'This month',
            },
            {
                title: 'Open Ticket Customers',
                value: String(openTicketCustomers),
                sub: 'Currently open',
            },
        ];
    }, [summary]);

    const resolvedTickets = useMemo(() => {
        const rows = Array.isArray(summary?.resolvedTicketsThisMonthList)
            ? summary.resolvedTicketsThisMonthList
            : [];
        return rows
            .slice()
            .sort((a, b) => new Date(b?.resolvedAt || 0) - new Date(a?.resolvedAt || 0))
            .slice(0, 6);
    }, [summary]);

    return (
        <>
            <FullScreenLoader show={isLoading} />

            {!isLoading && (
                <div className="space-y-6">
                    {error && (
                        <div className={`rounded-lg px-4 py-2 text-sm border ${isDark ? 'bg-red-500/10 border-red-500/20 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpis.map((kpi, index) => (
                            <KPICard key={index} {...kpi} />
                        ))}
                    </div>

                    <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recently Resolved Tickets</h3>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>This month</p>
                            </div>
                        </div>

                        {resolvedTickets.length === 0 ? (
                            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>No resolved tickets yet.</p>
                        ) : (
                            <div className="overflow-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                                            <th className="text-left py-2 pr-4">Ticket</th>
                                            <th className="text-left py-2 pr-4">Customer</th>
                                            <th className="text-left py-2 pr-4">Assigned Staff</th>
                                            <th className="text-left py-2 pr-4">Resolved At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resolvedTickets.map((t) => (
                                            <tr key={t?._id || t?.ticketId} className={`${isDark ? 'border-slate-800' : 'border-gray-200'} border-t`}>
                                                <td className={`py-2 pr-4 ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
                                                    <div className="font-medium">{t?.ticketName || '--'}</div>
                                                    <div className={`${isDark ? 'text-slate-400' : 'text-gray-500'} text-xs`}>
                                                        #{t?.ticketId || t?._id || '--'}
                                                    </div>
                                                </td>
                                                <td className={`py-2 pr-4 ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
                                                    <div className="font-medium">{t?.customer?.name || '--'}</div>
                                                    <div className={`${isDark ? 'text-slate-400' : 'text-gray-500'} text-xs`}>
                                                        {t?.customer?.phoneNumber || t?.customer?.email || '--'}
                                                    </div>
                                                </td>
                                                <td className={`py-2 pr-4 ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
                                                    {t?.assignedStaffName || t?.assignedStaffEmail || t?.assignedStaff || 'Super Admin'}
                                                </td>
                                                <td className={`py-2 pr-4 ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
                                                    {formatDateTime(t?.resolvedAt)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard
