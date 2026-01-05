import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SubscriberDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const subscriber = location.state?.subscriber;

  if (!subscriber) {
    return (
      <div className="space-y-6">
        <button onClick={() => navigate('/subscribers')} className={`flex items-center text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <span className="mr-1">←</span> Back to List
        </button>
        <div className={`rounded-xl shadow-sm border p-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <p className={isDark ? 'text-white' : 'text-gray-900'}>Subscriber not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={() => navigate('/subscribers')} className={`flex items-center text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
        <span className="mr-1">←</span> Back to List
      </button>
      <div className={`rounded-xl shadow-sm border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl font-bold">{subscriber.name.charAt(0)}</div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{subscriber.name}</h1>
              <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-bold rounded uppercase">{subscriber.status}</span>
            </div>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>alex@example.com • +91 95765 43210</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div>
            <div className={`text-xs uppercase font-medium ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>Total Due</div>
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>₹0</div>
            <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>Customer ID: {subscriber.id}</div>
          </div>
          <div className="flex gap-2">
            <button className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${isDark ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'}`}>Reset Password</button>
            <button className="px-4 py-2 bg-red-500/10 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/20 border border-red-500/20">Suspend User</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className={`rounded-xl shadow-sm border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className={`flex border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
              <button className="px-6 py-3 text-sm font-medium text-blue-400 border-b-2 border-blue-500">Overview</button>
              <button className={`px-6 py-3 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Plan & Usage</button>
              <button className={`px-6 py-3 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Support Queries</button>
              <button className={`px-6 py-3 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Billing</button>
            </div>
            <div className="p-6">
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Address & Installation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>Installation Address</p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Flat 402, Palm Grove Apts, 12th Main, Indiranagar, Bangalore - 560038</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>Installation Date</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>12 Jan 2022</p>
                  </div>
                  <div>
                    <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>Assigned Node / OLT</p>
                    <p className={`text-sm text-blue-300 font-medium font-mono inline-block px-2 py-1 rounded border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-300'}`}>OLT-BLR-IND-84 / Port 12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`rounded-xl shadow-sm border p-6 h-fit ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>KYC Documents</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className={`aspect-[3/4] rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${isDark ? 'bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-800 hover:text-slate-300' : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              <FileText className="w-8 h-8 mb-2" />
              <span className="text-xs font-medium">Aadhaar Front</span>
            </div>
            <div className={`aspect-[3/4] rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${isDark ? 'bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-800 hover:text-slate-300' : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              <FileText className="w-8 h-8 mb-2" />
              <span className="text-xs font-medium">Aadhaar Back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberDetailPage;
