import React, { useEffect, useState } from 'react'
import FullScreenLoader from '../../components/loaders/FullscreenLoaderWithLogo';
import { FRANCHISE_KPI_DATA } from '../../data';
import KPICard from '../../components/KPICard';
import { MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Dashboard = () => {
    const { isDark } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <FullScreenLoader show={isLoading} />

            {!isLoading && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FRANCHISE_KPI_DATA.map((kpi, index) => (
                            <KPICard key={index} {...kpi} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Local Collections Chart */}
                        <div className={`lg:col-span-2 p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Monthly Collections</h3>
                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Cash vs Online Payments</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}><div className="w-2 h-2 rounded-full bg-blue-500"></div> Online</span>
                                    <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}><div className="w-2 h-2 rounded-full bg-green-500"></div> Cash</span>
                                </div>
                            </div>
                            <div className={`h-64 w-full rounded-lg flex items-end justify-between px-4 pb-4 relative overflow-hidden border ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-gray-50 border-gray-200'}`}>
                                <div className="absolute inset-x-0 bottom-0 h-full flex items-end justify-around px-4">
                                    {[65, 70, 45, 80, 55, 90].map((h, i) => (
                                        <div key={i} className={`w-8 rounded-t-sm relative group h-full flex items-end ${isDark ? 'bg-slate-700' : 'bg-gray-300'}`}>
                                            <div style={{ height: `${h}%` }} className="w-full bg-blue-500 rounded-t-sm relative"></div>
                                            <div style={{ height: `${h * 0.4}%` }} className="w-full bg-green-500 absolute bottom-0 left-0 rounded-t-sm opacity-80"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className={`w-full flex justify-between text-xs z-10 pt-4 border-t mt-auto ${isDark ? 'text-slate-500 border-slate-700' : 'text-gray-600 border-gray-300'}`}>
                                    <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                                </div>
                            </div>
                        </div>

                        {/* Local Area Map */}
                        <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>My Coverage Area</h3>
                            <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Sector 4, Indiranagar</p>
                            <div className={`aspect-square rounded-lg relative overflow-hidden flex items-center justify-center border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
                                <div className="absolute inset-0 bg-[url('https://api.placeholder.com/assets/map-pattern.png')] opacity-10"></div>
                                {/* Outline of sector */}
                                <div className="w-40 h-40 border-2 border-orange-500/50 rounded-full flex items-center justify-center bg-orange-500/5">
                                    <MapPin className="text-orange-500 w-6 h-6" />
                                </div>
                                <div className={`absolute bottom-4 left-4 px-3 py-1 rounded text-xs border ${isDark ? 'bg-slate-900/80 text-white border-slate-700' : 'bg-white/90 text-gray-900 border-gray-300'}`}>
                                    850 Active Users
                                </div>
                            </div>
                            <button className="w-full mt-4 py-2 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 rounded-lg text-sm font-medium transition-colors">
                                View Detailed Map
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard