
const SubscribersView = ({ onViewDetail }) => {
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    plan: 'GigaStream 300'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubscriber(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubscriber = () => {
    const newId = `ACT-${Math.floor(1000 + Math.random() * 9000)}`;
    const subscriberToAdd = {
      id: newId,
      name: newSubscriber.name || 'New User',
      location: newSubscriber.location || 'Bangalore',
      plan: newSubscriber.plan,
      tech: 'Fiber To The Home',
      status: 'Active',
      due: '₹0'
    };
    setSubscribers([subscriberToAdd, ...subscribers]);
    setIsModalOpen(false);
    setNewSubscriber({
      name: '',
      mobile: '',
      email: '',
      location: '',
      plan: 'GigaStream 300'
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 flex flex-col h-full relative">
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Subscribers</h2>
          <p className="text-sm text-slate-400">Manage users, activations, and KYC</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-300 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 shadow-sm shadow-blue-900/20">
            <Plus className="w-4 h-4" /> Add Subscriber
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input type="text" placeholder="Search by name, mobile, or ID..." className="w-full pl-10 pr-4 py-3 bg-slate-800 border-none rounded-lg text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-slate-500 uppercase border-b border-slate-800">
                <th className="py-3 px-4 font-medium">User Details</th>
                <th className="py-3 px-4 font-medium">Plan Info</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Due Amount</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {subscribers.map((sub, i) => (
                <tr key={i} className="hover:bg-slate-800/50 group cursor-pointer transition-colors" onClick={() => sub.name === 'Alex Johnson' && onViewDetail(sub)}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">{sub.name.charAt(0)}</div>
                      <div>
                        <div className="font-semibold text-white">{sub.name}</div>
                        <div className="text-xs text-slate-500">{sub.id} • {sub.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-medium text-slate-200">{sub.plan}</div>
                    <div className="text-xs text-slate-500">{sub.tech}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.status === 'Active' ? 'bg-green-500/10 text-green-400' : sub.status === 'Suspended' ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-300'}`}>
                      {sub.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>}
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-200">{sub.due}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 group-hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border border-slate-800">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 rounded-t-xl">
              <h3 className="font-bold text-white">Add New Subscriber</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
                  <input type="text" name="name" value={newSubscriber.name} onChange={handleInputChange} className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 placeholder-slate-600" placeholder="Enter customer name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Mobile Number</label>
                  <input type="tel" name="mobile" value={newSubscriber.mobile} onChange={handleInputChange} className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 placeholder-slate-600" placeholder="+91" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input type="email" name="email" value={newSubscriber.email} onChange={handleInputChange} className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 placeholder-slate-600" placeholder="user@example.com" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Installation Address / Area</label>
                  <input type="text" name="location" value={newSubscriber.location} onChange={handleInputChange} className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 placeholder-slate-600" placeholder="e.g. Indiranagar, Bangalore" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Select Plan</label>
                  <div className="relative">
                    <select name="plan" value={newSubscriber.plan} onChange={handleInputChange} className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 appearance-none">
                      <option>Basic 50 (50 Mbps)</option>
                      <option>Basic 100 (100 Mbps)</option>
                      <option>GigaStream 300 (300 Mbps)</option>
                      <option>Fiber Stream 500 (500 Mbps)</option>
                      <option>Business 1Gbps (1 Gbps)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800 flex gap-3 justify-end bg-slate-900 rounded-b-xl">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleAddSubscriber} disabled={!newSubscriber.name} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all">Create Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SubscribersView