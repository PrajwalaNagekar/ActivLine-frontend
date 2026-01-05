import { useState } from "react";
import { INITIAL_SUBSCRIBERS } from "../../data";
import { Wallet, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Collections = ({ cashInHand, setCashInHand }) => {
  const { isDark } = useTheme();
  const [showDefaulters, setShowDefaulters] = useState(false);
  const [depositMsg, setDepositMsg] = useState('');
  // const [cashInHand, setCashInHand] = useState(12450);
  const handleDeposit = () => {
    if (cashInHand === 0) return;
    setCashInHand(0);
    setDepositMsg('Successfully deposited to HQ account!');
    setTimeout(() => setDepositMsg(''), 3000);
  };

  const pending = INITIAL_SUBSCRIBERS.filter(s => s.due > 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl border relative ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Cash Handover</h3>
          <div className={`p-4 rounded-lg border mb-4 flex justify-between items-center ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
            <div>
              <p className={`text-xs uppercase ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Cash in Hand</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{cashInHand.toLocaleString()}</p>
            </div>
            <Wallet className="text-green-500 w-8 h-8" />
          </div>
          <button
            onClick={handleDeposit}
            disabled={cashInHand === 0}
            className="w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Deposit to Company
          </button>
          {depositMsg && (
            <div className="absolute top-4 right-4 bg-green-900/90 text-green-200 text-xs px-2 py-1 rounded animate-fade-in flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> {depositMsg}
            </div>
          )}
        </div>
        <div className={`p-6 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pending Collections</h3>
          <div className="space-y-3">
            {(showDefaulters ? pending : pending.slice(0, 2)).map(sub => (
              <div key={sub.id} className={`flex justify-between items-center p-3 rounded border ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{sub.name}</span>
                <span className="text-red-400 font-bold text-sm">₹{sub.due}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowDefaulters(!showDefaulters)}
            className={`w-full mt-4 py-2 font-medium rounded-lg border transition-colors ${isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-gray-100 text-gray-700 hover:text-gray-900 border-gray-300'}`}
          >
            {showDefaulters ? 'Show Less' : 'View All Defaulters'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Collections
