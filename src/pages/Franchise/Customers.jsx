import { useState } from "react";
import { INITIAL_SUBSCRIBERS } from "../../data";
import { CheckCircle, MoreVertical, Plus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const MySubscribers = ({ onUpdateCash }) => {
  const { isDark } = useTheme();
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSub, setNewSub] = useState({ name: '', plan: 'Basic 100', location: 'Sec 4, Indiranagar' });

  const handleCollect = (id, amount) => {
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, due: 0, status: 'Active' } : s));
    onUpdateCash(amount);
  };

  const handleAdd = () => {
    const id = `ACT-${Math.floor(Math.random() * 9000) + 1000}`;
    setSubscribers([...subscribers, { ...newSub, id, status: 'Active', due: 0 }]);
    setIsModalOpen(false);
    setNewSub({ name: '', plan: 'Basic 100', location: 'Sec 4, Indiranagar' });
  };

  return (
    <div className={`rounded-xl shadow-sm border flex flex-col h-full ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
      <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Franchise Subscribers</h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Users in Indiranagar Sector 4</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-500 shadow-sm">
          <Plus className="w-4 h-4" /> New Installation
        </button>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-xs uppercase border-b ${isDark ? 'text-slate-500 border-slate-800' : 'text-gray-600 border-gray-200'}`}>
                <th className="py-3 px-4 font-medium">User</th>
                <th className="py-3 px-4 font-medium">Plan</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Due</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={isDark ? 'divide-y divide-slate-800' : 'divide-y divide-gray-200'}>
              {subscribers.map((sub, i) => (
                <tr key={i} className={`transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{sub.name}</div>
                        <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>{sub.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`py-4 px-4 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{sub.plan}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sub.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className={`py-4 px-4 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{sub.due}</td>
                  <td className="py-4 px-4 text-right">
                    {sub.due > 0 ? (
                      <button
                        onClick={() => handleCollect(sub.id, sub.due)}
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium mr-3 border border-blue-500/30 px-2 py-1 rounded hover:bg-blue-500/10"
                      >
                        Collect Cash
                      </button>
                    ) : (
                      <span className="text-green-500 text-xs mr-3 flex items-center inline-flex"><CheckCircle className="w-3 h-3 mr-1" /> Paid</span>
                    )}
                    <button className={isDark ? 'text-slate-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-xl w-full max-w-md border p-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>New Installation</h3>
            <div className="space-y-4">
              <input
                placeholder="Customer Name"
                className={`w-full p-2 rounded border outline-none focus:border-orange-500 ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-gray-900 border-gray-300'}`}
                value={newSub.name}
                onChange={e => setNewSub({ ...newSub, name: e.target.value })}
              />
              <select
                className={`w-full p-2 rounded border outline-none focus:border-orange-500 ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-gray-900 border-gray-300'}`}
                value={newSub.plan}
                onChange={e => setNewSub({ ...newSub, plan: e.target.value })}
              >
                <option>Basic 100</option>
                <option>GigaStream 300</option>
                <option>Business 1Gbps</option>
              </select>
              <input
                placeholder="Address"
                className={`w-full p-2 rounded border outline-none focus:border-orange-500 ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-gray-900 border-gray-300'}`}
                value={newSub.location}
                onChange={e => setNewSub({ ...newSub, location: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className={isDark ? 'px-4 py-2 text-slate-400 hover:text-white' : 'px-4 py-2 text-gray-600 hover:text-gray-900'}>Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500">Create Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MySubscribers
