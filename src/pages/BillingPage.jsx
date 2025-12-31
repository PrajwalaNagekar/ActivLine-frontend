import React, { useState } from 'react';
import { RefreshCw, AlertTriangle, ChevronDown } from 'lucide-react';
import { TRANSACTIONS_DATA } from '../data';

const BillingPage = () => {
  const [filter, setFilter] = useState('All');

  const filteredTransactions = TRANSACTIONS_DATA.filter(tx => {
    if (filter === 'All') return true;
    return tx.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><RefreshCw className="w-5 h-5"/></div>
            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded">85% Ready</span>
          </div>
          <h3 className="font-bold text-white mb-1">Auto-Billing Status</h3>
          <p className="text-sm text-slate-400 mb-4">Next cycle runs in 4d 12h</p>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <button className="w-full py-2 bg-slate-800 text-white border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-700">Run Manual Batch</button>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-500/10 text-red-400 rounded-lg"><AlertTriangle className="w-5 h-5"/></div>
          </div>
          <h3 className="font-bold text-white mb-1">Pending Dues</h3>
          <p className="text-sm text-slate-400 mb-2">Users at risk of suspension</p>
          <div className="text-3xl font-bold text-white mb-4">₹2.4L</div>
          <button className="w-full py-2 border border-red-500/20 text-red-400 bg-red-500/10 rounded-lg text-sm font-medium hover:bg-red-500/20">Trigger Reminders (SMS/WA)</button>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-800">
          <h3 className="font-bold text-white mb-4">Payment Gateways</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="text-sm font-medium text-slate-300">Razorpay</span>
               </div>
               <span className="text-sm font-bold text-white">99.2% Success</span>
             </div>
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="text-sm font-medium text-slate-300">UPI</span>
               </div>
               <span className="text-sm font-bold text-white">98.5% Success</span>
             </div>
          </div>
          <button className="w-full mt-8 text-sm text-blue-400 font-medium hover:underline text-left">View Settlement Report →</button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Recent Transactions</h3>
            
            <div className="relative">
                <select 
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 appearance-none pr-8 cursor-pointer hover:bg-slate-700 transition-colors"
                >
                    <option value="All">All Transactions</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending Dues</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-slate-500 uppercase border-b border-slate-800">
              <th className="pb-3 font-medium">Invoice ID</th>
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTransactions.map((tx, i) => (
              <tr key={i} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors">
                <td className="py-4 text-slate-500 font-mono text-xs">{tx.id}</td>
                <td className="py-4 font-medium text-white">{tx.user}</td>
                <td className="py-4 font-bold text-white">{tx.amount}</td>
                <td className="py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                        tx.status === 'Paid' 
                            ? 'text-green-400 bg-green-500/10' 
                            : 'text-yellow-400 bg-yellow-500/10'
                    }`}>
                        {tx.status}
                    </span>
                </td>
                <td className="py-4 text-right text-slate-500">{tx.date}</td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
                <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">No transactions found matching your filter.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingPage;

