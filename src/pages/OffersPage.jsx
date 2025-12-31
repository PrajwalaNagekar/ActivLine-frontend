import React, { useState } from 'react';
import { Plus, Megaphone, MoreVertical, XCircle } from 'lucide-react';
import { INITIAL_CAMPAIGNS_DATA } from '../data';

const OffersPage = () => {
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
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 h-full relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white">Dynamic Offers</h2>
          <p className="text-sm text-slate-400">Create segmented campaigns to boost ARPU</p>
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
          <div key={camp.id} className="border border-slate-700 rounded-xl p-6 relative overflow-hidden group hover:shadow-lg hover:border-slate-600 transition-all bg-slate-900">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Megaphone className="w-24 h-24 rotate-12 text-white" />
            </div>
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                 <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded uppercase tracking-wide">{camp.status}</span>
                 <button className="text-slate-500 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
               </div>
               <h3 className="text-lg font-bold text-white mb-1">{camp.name}</h3>
               <p className="text-sm text-slate-400 mb-6">Target: {camp.target}</p>
               
               <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 mb-4">
                  <p className="text-xs text-slate-500 uppercase font-medium mb-1">Offer Details</p>
                  <p className="font-bold text-white">{camp.offer}</p>
               </div>

               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-xs text-slate-400">Conversion Rate</p>
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
          <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 border border-slate-800">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 rounded-t-xl">
              <h3 className="font-bold text-white">Create New Campaign</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Campaign Name</label>
                <input 
                  type="text" 
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. Summer Sale"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Target Audience</label>
                <input 
                  type="text" 
                  value={newCampaign.target}
                  onChange={(e) => setNewCampaign({...newCampaign, target: e.target.value})}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. Inactive Users > 60 Days"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Offer Details</label>
                <input 
                  type="text"
                  value={newCampaign.offer}
                  onChange={(e) => setNewCampaign({...newCampaign, offer: e.target.value})}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. 20% Off for 3 Months"
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 flex gap-3 justify-end bg-slate-900 rounded-b-xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
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

