const SubscriberDetail = ({ subscriber, onBack }) => (
  <div className="space-y-6 animate-fade-in-up">
    <button onClick={onBack} className="flex items-center text-sm text-slate-400 hover:text-white transition-colors">
      <span className="mr-1">←</span> Back to List
    </button>
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl font-bold">{subscriber.name.charAt(0)}</div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{subscriber.name}</h1>
            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-bold rounded uppercase">{subscriber.status}</span>
          </div>
          <p className="text-slate-500 text-sm mt-1">alex@example.com • +91 95765 43210</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-right">
        <div>
          <div className="text-xs text-slate-500 uppercase font-medium">Total Due</div>
          <div className="text-2xl font-bold text-white">₹0</div>
          <div className="text-xs text-slate-500">Customer ID: {subscriber.id}</div>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 border border-slate-700">Reset Password</button>
           <button className="px-4 py-2 bg-red-500/10 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/20 border border-red-500/20">Suspend User</button>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
             <div className="flex border-b border-slate-800">
                <button className="px-6 py-3 text-sm font-medium text-blue-400 border-b-2 border-blue-500">Overview</button>
                <button className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white">Plan & Usage</button>
                <button className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white">Support Queries</button>
                <button className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white">Billing</button>
             </div>
             <div className="p-6">
                <h3 className="font-bold text-white mb-4">Address & Installation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <p className="text-xs text-slate-500 uppercase font-medium mb-1">Installation Address</p>
                      <p className="text-sm text-slate-300 leading-relaxed">Flat 402, Palm Grove Apts, 12th Main, Indiranagar, Bangalore - 560038</p>
                   </div>
                   <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-medium mb-1">Installation Date</p>
                        <p className="text-sm text-white font-medium">12 Jan 2022</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-medium mb-1">Assigned Node / OLT</p>
                        <p className="text-sm text-blue-300 font-medium font-mono bg-slate-800 inline-block px-2 py-1 rounded border border-slate-700">OLT-BLR-IND-84 / Port 12</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 h-fit">
          <h3 className="font-bold text-white mb-4">KYC Documents</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-800 hover:text-slate-300 cursor-pointer transition-colors">
               <FileText className="w-8 h-8 mb-2" />
               <span className="text-xs font-medium">Aadhaar Front</span>
            </div>
            <div className="aspect-[3/4] bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-800 hover:text-slate-300 cursor-pointer transition-colors">
               <FileText className="w-8 h-8 mb-2" />
               <span className="text-xs font-medium">Aadhaar Back</span>
            </div>
          </div>
       </div>
    </div>
  </div>
);
export default SubscriberDetail