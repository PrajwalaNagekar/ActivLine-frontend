import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const KPICard = ({ title, value, change, trend, sub }) => {
    const { isDark } = useTheme();

    return (
        <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{title}</h3>
                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? (isDark ? 'text-green-400 bg-green-500/10' : 'text-green-600 bg-green-50') : (isDark ? 'text-red-400 bg-red-500/10' : 'text-red-600 bg-red-50')}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {change}
                </span>
            </div>
            <div className="flex flex-col">
                <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</span>
                <span className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{sub}</span>
            </div>
        </div>
    );
};

export default KPICard;