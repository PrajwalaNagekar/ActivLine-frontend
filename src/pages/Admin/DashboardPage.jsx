import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { KPI_DATA } from "../../data";
import KPICard from "../../components/KPICard";
import FullScreenLoader from "../../components/loaders/FullscreenLoaderWithLogo";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../animations/kpiAnimations";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

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
          {/* KPI CARDS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {KPI_DATA.map((kpi, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="cursor-pointer"
              >
                <KPICard {...kpi} />
              </motion.div>
            ))}
          </motion.div>



          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* FORECAST */}
            <div className={`lg:col-span-2 p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    AI Revenue Forecast
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    Predicted growth based on current usage trends
                  </p>
                </div>
                <select className={`text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}>
                  <option>Next 6 Months</option>
                  <option>Next Year</option>
                </select>
              </div>

              <div className={`h-64 w-full rounded-lg flex items-end justify-between px-4 pb-4 relative overflow-hidden border ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-gray-50 border-gray-200'}`}>
                <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                  <path
                    d="M0,200 Q150,150 300,180 T600,100 T900,50"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    className="opacity-50"
                  />
                  <path
                    d="M0,200 Q150,150 300,180 T600,100 T900,50 V256 H0 Z"
                    fill="url(#gradient)"
                    className="opacity-20"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className={`w-full flex justify-between text-xs z-10 pt-4 border-t ${isDark ? 'text-slate-500 border-slate-700' : 'text-gray-500 border-gray-300'}`}>
                  <span>Jun</span><span>Jul</span><span>Aug</span>
                  <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  Actual
                </div>
                <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-500' : 'bg-gray-400'}`}></div>
                  AI Prediction
                </div>
              </div>
            </div>

            {/* HEATMAP */}
            <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
             
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Demand Heatmap
              </h3>
              <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                High lead density areas for new coverage
              </p>

              <div className={`aspect-square rounded-lg relative overflow-hidden flex items-center justify-center border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`absolute inset-0 opacity-20 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
                <div className="w-32 h-32 rounded-full bg-red-500 blur-3xl opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

                <div className={`relative z-10 backdrop-blur-sm px-4 py-2 rounded shadow-sm text-xs font-bold border flex items-center gap-1 ${isDark ? 'bg-slate-900/80 text-red-400 border-red-900/30' : 'bg-white/80 text-red-600 border-red-300'}`}>
                  <MapPin className="w-3 h-3" />
                  Sector 4
                </div>
              </div>

              <button className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'text-blue-400 bg-blue-500/10 hover:bg-blue-500/20' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'}`}>
                View Coverage Requests
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
