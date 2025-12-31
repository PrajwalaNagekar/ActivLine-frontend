const FieldStaffView = () => {
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [staffData, setStaffData] = useState(INITIAL_FIELD_STAFF_DATA);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    techId: '',
    type: 'Router Installation',
    customer: '',
    address: ''
  });

  const selectedStaff = staffData.find(s => s.id === selectedStaffId);
  const availableStaff = staffData.filter(s => s.status !== 'Busy');

  const completeJobSimulation = (staffId) => {
    setStaffData(prev => prev.map(staff => {
      if (staff.id === staffId) {
        return {
          ...staff,
          status: 'Online',
          color: 'bg-green-500',
          task: {
            ...staff.task,
            status: 'Completed',
            proofUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=300&h=200',
            signatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/John_Hancock_Signature.svg/1200px-John_Hancock_Signature.svg.png'
          }
        };
      }
      return staff;
    }));
  };

  const handleAssignSubmit = () => {
    if (!assignmentForm.techId || !assignmentForm.customer) return;
    setStaffData(prev => prev.map(staff => {
      if (staff.id === parseInt(assignmentForm.techId)) {
        return {
          ...staff,
          status: 'Busy',
          color: 'bg-yellow-500',
          task: {
            id: `TSK-${Math.floor(Math.random() * 10000)}`,
            type: assignmentForm.type,
            customer: assignmentForm.customer,
            address: assignmentForm.address,
            status: 'In Progress',
            startTime: 'Just Now',
            proofUrl: null,
            signatureUrl: null
          }
        };
      }
      return staff;
    }));
    setIsAssignModalOpen(false);
    setAssignmentForm({ techId: '', type: 'Router Installation', customer: '', address: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      {/* Staff List */}
      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 flex flex-col z-10">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-white">Field Staff ({staffData.length})</h2>
          <button className="text-xs text-blue-400 font-medium hover:underline">Auto-Schedule</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {staffData.map(staff => (
            <div key={staff.id} onClick={() => setSelectedStaffId(staff.id)} className={`p-3 rounded-lg border transition-all cursor-pointer group ${selectedStaffId === staff.id ? 'bg-blue-500/20 border-blue-500/50 ring-1 ring-blue-500/50' : 'hover:bg-slate-800 border-transparent hover:border-slate-800'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 relative border border-slate-700">
                  {staff.name.charAt(0)}
                  <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-900 rounded-full ${staff.status === 'Online' ? 'bg-green-500' : staff.status === 'Busy' ? 'bg-yellow-500' : 'bg-slate-500'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-white truncate">{staff.name}</h4>
                    <span className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-300">{staff.task.status}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 flex items-center"><Smartphone className="w-3 h-3 mr-1"/> {staff.battery}%</span>
                    <span className="text-xs text-slate-400 truncate border-l border-slate-700 pl-2">{staff.task.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Assign Staff Button Area */}
        <div className="p-4 bg-slate-800/50 border-t border-slate-800 rounded-b-xl">
          <button onClick={() => setIsAssignModalOpen(true)} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-sm hover:bg-blue-500 transition-colors">
            <Briefcase className="w-4 h-4" /> Assign Staff
          </button>
        </div>
      </div>

      {/* Interactive Map & Detail View */}
      <div className="lg:col-span-2 bg-slate-950 rounded-xl shadow-inner border border-slate-800 relative overflow-hidden flex flex-col md:flex-row">
         
         {/* Detail Panel Overlay (Visible when staff selected) */}
         {selectedStaff && (
           <div className="absolute top-4 left-4 bottom-4 w-80 bg-slate-900/95 backdrop-blur shadow-2xl rounded-xl border border-slate-700 z-20 flex flex-col animate-in slide-in-from-left-4 duration-200">
              <div className="p-4 border-b border-slate-800 flex justify-between items-start">
                 <div>
                   <h3 className="font-bold text-white text-lg">{selectedStaff.name}</h3>
                   <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Started: {selectedStaff.task.startTime}</span>
                      <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> Tracking On</span>
                   </div>
                 </div>
                 <button onClick={() => setSelectedStaffId(null)} className="text-slate-500 hover:text-white"><XCircle className="w-5 h-5"/></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                 {/* Task Info */}
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Current Task</h4>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                       <div className="flex justify-between mb-2">
                          <span className="font-bold text-sm text-white">{selectedStaff.task.id}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                             selectedStaff.task.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                             selectedStaff.task.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                             'bg-slate-700 text-slate-300'
                          }`}>{selectedStaff.task.status}</span>
                       </div>
                       <p className="text-sm font-medium text-slate-200 mb-1">{selectedStaff.task.type}</p>
                       <div className="flex items-start gap-2 text-xs text-slate-400">
                          <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                          {selectedStaff.task.address}
                       </div>
                    </div>
                 </div>

                 {/* Proof of Work */}
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Proof of Work (Photo)</h4>
                    {selectedStaff.task.proofUrl ? (
                      <div className="relative group rounded-lg overflow-hidden border border-slate-700">
                         <img src={selectedStaff.task.proofUrl} alt="Proof" className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                         <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                            Verified via App
                         </div>
                      </div>
                    ) : (
                      <div className="h-32 bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center text-slate-500">
                         <Camera className="w-8 h-8 mb-2 opacity-50" />
                         <span className="text-xs">Waiting for upload...</span>
                      </div>
                    )}
                 </div>

                 {/* Customer Signature */}
                 <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Customer Signature</h4>
                    {selectedStaff.task.signatureUrl ? (
                      <div className="bg-white border border-slate-200 rounded-lg p-2 flex items-center justify-center">
                         <img src={selectedStaff.task.signatureUrl} alt="Signature" className="h-16 opacity-80" />
                      </div>
                    ) : (
                      <div className="h-20 bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center text-slate-500">
                         <PenTool className="w-6 h-6 mb-1 opacity-50" />
                         <span className="text-xs">Waiting for signature...</span>
                      </div>
                    )}
                 </div>
              </div>

              {/* Simulation Controls (Only for Demo) */}
              {selectedStaff.task.status === 'In Progress' && (
                <div className="p-4 border-t border-slate-800 bg-slate-800/50">
                   <button 
                     onClick={() => completeJobSimulation(selectedStaff.id)}
                     className="w-full py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-900/50 transition-all flex items-center justify-center gap-2"
                   >
                     <CheckCircle className="w-4 h-4" /> Simulate Job Completion
                   </button>
                   <p className="text-[10px] text-center text-slate-500 mt-2">Click to simulate receiving data from field app</p>
                </div>
              )}
           </div>
         )}

         {/* Mock Map Layer */}
         <div className="absolute inset-0 bg-slate-950">
            <div className="absolute inset-0 bg-[url('https://api.placeholder.com/assets/map-pattern.png')] opacity-5 mix-blend-overlay"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                {[...Array(36)].map((_, i) => <div key={i} className="border-r border-b border-slate-700"></div>)}
            </div>
            
            {/* Map Markers */}
            {staffData.map((staff, i) => (
              <div 
                  key={staff.id} 
                  onClick={() => setSelectedStaffId(staff.id)}
                  className={`absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer hover:scale-110 z-10 ${selectedStaffId === staff.id ? 'z-30 scale-110' : ''}`}
                  style={{ 
                    top: staff.location.top, 
                    left: staff.location.left 
                  }}
              >
                {/* Pulsing effect for active staff */}
                {staff.status === 'Busy' && <div className="absolute w-full h-full rounded-full bg-yellow-500 animate-ping opacity-20"></div>}
                
                <div className={`w-10 h-10 rounded-full border-4 border-slate-800 shadow-xl flex items-center justify-center text-xs font-bold text-white mb-1 transition-colors ${staff.color}`}>
                  {staff.name.charAt(0)}
                </div>
                <div className="bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-lg text-white whitespace-nowrap border border-slate-700">
                  {staff.name}
                </div>
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button className="p-2 bg-slate-800 text-white rounded shadow-lg border border-slate-700 hover:bg-slate-700"><Plus className="w-4 h-4 text-slate-300"/></button>
              <button className="p-2 bg-slate-800 text-white rounded shadow-lg border border-slate-700 hover:bg-slate-700"><div className="w-4 h-0.5 bg-slate-300"></div></button>
              <button className="p-2 bg-slate-800 text-white rounded shadow-lg border border-slate-700 hover:bg-slate-700 mt-2"><Navigation className="w-4 h-4 text-blue-400"/></button>
            </div>
         </div>
      </div>

      {/* Assignment Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 border border-slate-800">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 rounded-t-xl">
              <h3 className="font-bold text-white">Assign New Task</h3>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Task Type</label>
                <input 
                  type="text" 
                  value={assignmentForm.type}
                  onChange={(e) => setAssignmentForm({...assignmentForm, type: e.target.value})}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Customer Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe"
                  value={assignmentForm.customer}
                  onChange={(e) => setAssignmentForm({...assignmentForm, customer: e.target.value})}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Installation/Service Address</label>
                <textarea 
                  placeholder="Enter full address..."
                  value={assignmentForm.address}
                  onChange={(e) => setAssignmentForm({...assignmentForm, address: e.target.value})}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 transition-colors min-h-[80px]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Available Technician</label>
                <div className="relative">
                  <select 
                    value={assignmentForm.techId}
                    onChange={(e) => setAssignmentForm({...assignmentForm, techId: e.target.value})}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 appearance-none transition-colors"
                  >
                    <option value="">Select a technician...</option>
                    {availableStaff.map(staff => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name} ({staff.status})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {availableStaff.length === 0 && (
                   <p className="text-xs text-red-400 mt-1">No technicians are currently available.</p>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 flex gap-3 justify-end bg-slate-900 rounded-b-xl">
              <button 
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAssignSubmit}
                disabled={!assignmentForm.techId || !assignmentForm.customer}
                className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FieldStaffView