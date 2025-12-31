import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const KPICard = ({ title, value, change, trend, sub }) => (
    <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
            <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {change}
            </span>
        </div>
        <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">{value}</span>
            <span className="text-xs text-slate-500 mt-1">{sub}</span>
        </div>
    </div>
);

export default KPICard;