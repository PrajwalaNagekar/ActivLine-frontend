import React, { useState } from 'react';
import { Plus, Megaphone, MoreVertical, XCircle } from 'lucide-react';
import { INITIAL_CAMPAIGNS_DATA } from '../../data';
import { useTheme } from '../../context/ThemeContext';

const OffersPage = () => {
  const { isDark } = useTheme();
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    target: '',
    offer: ''
  });

  const handleCreateCampaign = () => {
    const campaignToAdd = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      target: newCampaign.target,
      offer: newCampaign.offer,
      conversion: '0%',
      status: 'Active'
    };
    setCampaigns([...campaigns, campaignToAdd]);
    setIsModalOpen(false);
    setNewCampaign({ name: '', target: '', offer: '' });
  };

  return (
    <div className={`rounded-xl shadow-sm border p-6 h-full relative ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dynamic Offers</h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Create segmented campaigns to boost ARPU</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 shadow-sm shadow-blue-900/20"
        >
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className={`border rounded-xl p-6 relative overflow-hidden group hover:shadow-lg transition-all ${isDark ? 'border-slate-700 hover:border-slate-600 bg-slate-900' : 'border-gray-300 hover:border-gray-400 bg-white'}`}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Megaphone className={`w-24 h-24 rotate-12 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded uppercase tracking-wide">{camp.status}</span>
                <button className={isDark ? 'text-slate-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}><MoreVertical className="w-4 h-4" /></button>
              </div>
              <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{camp.name}</h3>
              <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Target: {camp.target}</p>

              <div className={`p-4 rounded-lg border mb-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`text-xs uppercase font-medium mb-1 ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>Offer Details</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{camp.offer}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Conversion Rate</p>
                  <p className="text-xl font-bold text-green-400">{camp.conversion}</p>
                </div>
                <button className="text-sm font-medium text-blue-400 hover:underline">View Analytics</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create New Campaign</h3>
              <button onClick={() => setIsModalOpen(false)} className={isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}>
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g. Summer Sale"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Target Audience</label>
                <input
                  type="text"
                  value={newCampaign.target}
                  onChange={(e) => setNewCampaign({ ...newCampaign, target: e.target.value })}
                  className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g. Inactive Users > 60 Days"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Offer Details</label>
                <input
                  type="text"
                  value={newCampaign.offer}
                  onChange={(e) => setNewCampaign({ ...newCampaign, offer: e.target.value })}
                  className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="e.g. 20% Off for 3 Months"
                />
              </div>
            </div>

            <div className={`p-4 border-t flex gap-3 justify-end rounded-b-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={!newCampaign.name || !newCampaign.offer}
                className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Launch Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersPage;

