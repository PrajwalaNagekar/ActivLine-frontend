import { useState } from "react";
import { INITIAL_FIELD_STAFF_DATA } from "../../data";  
import { INITIAL_STAFF } from "../../data";
import { Smartphone, XCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const LocalStaff = () => {
  const { isDark } = useTheme();
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const assignTask = (id) => {
    // Simulate assigning a task
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, status: 'Busy', task: { ...s.task, status: 'Assigned Just Now' } } : s));
    setSelectedStaff(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      <div className={`rounded-xl shadow-sm border flex flex-col ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
          <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Technicians ({staffList.length})</h2>
        </div>
        <div className="flex-1 p-2 space-y-2">
          {staffList.map(staff => (
            <div 
              key={staff.id} 
              onClick={() => setSelectedStaff(staff)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedStaff?.id === staff.id ? 'bg-orange-500/10 border-orange-500' : isDark ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isDark ? 'bg-slate-800 border-slate-600 text-slate-300' : 'bg-gray-100 border-gray-300 text-gray-700'}`}>
                  {staff.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{staff.name}</h4>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${staff.status === 'Busy' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>{staff.status}</span>
                  </div>
                  <div className={`flex items-center gap-2 mt-1 text-xs ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>
                     <Smartphone className="w-3 h-3" /> {staff.battery}%
                     <span className={`truncate w-24 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>• {staff.task.address}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`lg:col-span-2 rounded-xl border relative overflow-hidden flex items-center justify-center ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
         <div className="absolute inset-0 bg-[url('https://api.placeholder.com/assets/map-pattern.png')] opacity-5"></div>
         <div className={`absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none ${isDark ? '' : 'border-gray-300'}`}>
            {[...Array(36)].map((_, i) => <div key={i} className={isDark ? 'border-r border-b border-slate-700' : 'border-r border-b border-gray-300'}></div>)}
         </div>
         
         {selectedStaff && (
            <div className={`absolute bottom-4 left-4 right-4 border p-4 rounded-xl shadow-xl z-20 animate-in slide-in-from-bottom-2 ${isDark ? 'bg-slate-900/95 border-slate-700' : 'bg-white border-gray-200'}`}>
               <div className="flex justify-between items-start">
                  <div>
                     <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedStaff.name}</h3>
                     <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Current Location: {selectedStaff.task.address}</p>
                  </div>
                  <button onClick={() => setSelectedStaff(null)} className={isDark ? 'text-slate-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}><XCircle className="w-5 h-5"/></button>
               </div>
               <div className="mt-3 flex gap-2">
                  <button className={`flex-1 py-1.5 text-xs rounded border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>View History</button>
                  {selectedStaff.status !== 'Busy' && (
                     <button onClick={() => assignTask(selectedStaff.id)} className="flex-1 py-1.5 bg-orange-600 text-white text-xs rounded hover:bg-orange-500">Assign New Task</button>
                  )}
               </div>
            </div>
         )}

         {staffList.map(staff => (
            <div 
              key={staff.id} 
              onClick={() => setSelectedStaff(staff)}
              className="absolute flex flex-col items-center cursor-pointer hover:scale-110 transition-transform" 
              style={{ top: staff.location.top, left: staff.location.left }}
            >
               <div className={`w-8 h-8 rounded-full border-2 shadow-lg flex items-center justify-center text-xs font-bold text-white ${staff.color} ${isDark ? 'border-slate-900' : 'border-white'}`}>
                  {staff.name.charAt(0)}
               </div>
               <div className={`mt-1 px-2 py-0.5 rounded text-[10px] whitespace-nowrap border ${isDark ? 'bg-slate-900/80 text-white border-slate-700' : 'bg-white/90 text-gray-900 border-gray-300'}`}>{staff.name}</div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default LocalStaff
