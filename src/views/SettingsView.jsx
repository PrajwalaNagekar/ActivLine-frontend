const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [showSuccess, setShowSuccess] = useState(false);
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Kods Technologies',
    supportEmail: 'support@activline.in',
    currency: 'INR (₹)',
    timezone: 'Asia/Kolkata (GMT+5:30)'
  });

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: 'General', label: 'General' },
    { id: 'Team', label: 'Team & Roles' },
    { id: 'Security', label: 'Security' },
    { id: 'API', label: 'Integrations & API' }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 space-y-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-500/10 text-blue-400 font-medium border-l-2 border-blue-500'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-8 relative overflow-hidden">
        
        {/* Success Toast */}
        {showSuccess && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Changes Saved Successfully
          </div>
        )}

        {activeTab === 'General' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white mb-2">General Settings</h2>
            <p className="text-sm text-slate-400 mb-8 border-b border-slate-800 pb-4">Manage company details and basic configuration</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Company Name</label>
                <input 
                  type="text" 
                  value={generalSettings.companyName}
                  onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Support Email</label>
                <input 
                  type="email" 
                  value={generalSettings.supportEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Currency</label>
                <div className="relative">
                  <select 
                    value={generalSettings.currency}
                    onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 appearance-none cursor-pointer"
                  >
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Timezone</label>
                <div className="relative">
                  <select 
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 appearance-none cursor-pointer"
                  >
                    <option>Asia/Kolkata (GMT+5:30)</option>
                    <option>UTC</option>
                    <option>America/New_York (EST)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button 
                onClick={handleSave}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Team' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white mb-2">Team & Roles</h2>
            <p className="text-sm text-slate-400 mb-8 border-b border-slate-800 pb-4">Manage access and permissions</p>
            
            <div className="space-y-4">
              {[
                { name: 'Admin User', role: 'Super Admin', email: 'admin@activline.in', status: 'Active' },
                { name: 'Sarah Connor', role: 'Field Manager', email: 'sarah@activline.in', status: 'Active' },
                { name: 'Mike Ross', role: 'Support Agent', email: 'mike@activline.in', status: 'Away' }
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{member.name}</div>
                      <div className="text-xs text-slate-400">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">{member.role}</span>
                    <button className="text-slate-400 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Invite Team Member
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white mb-2">Security</h2>
            <p className="text-sm text-slate-400 mb-8 border-b border-slate-800 pb-4">Password and authentication settings</p>
            
            <div className="max-w-2xl space-y-6">
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Two-Factor Authentication</h4>
                  <p className="text-xs text-slate-400 mt-1">Secure your account with 2FA</p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-white text-sm">Change Password</h4>
                <input type="password" placeholder="Current Password" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500" />
                <input type="password" placeholder="New Password" className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500" />
                <button onClick={handleSave} className="px-4 py-2 bg-slate-700 text-white text-sm font-bold rounded-lg hover:bg-slate-600">Update Password</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'API' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white mb-2">Integrations & API</h2>
            <p className="text-sm text-slate-400 mb-8 border-b border-slate-800 pb-4">Manage external connections</p>
            
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="text-sm font-medium text-slate-400 mb-1 block">Public API Key</label>
                <div className="flex gap-2">
                  <input readOnly value="pk_live_51Mz..." type="password" className="flex-1 p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-500 font-mono" />
                  <button className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white"><RefreshCw className="w-4 h-4"/></button>
                </div>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="text-yellow-400 font-bold text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Webhooks</h4>
                <p className="text-xs text-yellow-500/80 mt-1">Your webhook endpoint is currently inactive. Configure it to receive real-time updates.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default SettingsView