import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Profile = ({ franchiseUser, onUpdate }) => {
  const { isDark } = useTheme();
  const [form, setForm] = useState(franchiseUser);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdate(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={`max-w-2xl mx-auto p-8 rounded-xl border mt-10 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
       <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}><Settings className="w-5 h-5"/> Profile Settings</h2>
       <div className="space-y-4">
          <div>
             <label className={`text-sm block mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Franchise Name</label>
             <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={`w-full border rounded p-2 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
          </div>
          <div>
             <label className={`text-sm block mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Contact Email</label>
             <input value="sathya@activline-franchise.in" readOnly className={`w-full border rounded p-2 cursor-not-allowed ${isDark ? 'bg-slate-800/50 border-slate-700 text-slate-500' : 'bg-gray-50 border-gray-300 text-gray-500'}`} />
          </div>
          <div>
             <label className={`text-sm block mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Zone Assigned</label>
             <input value={form.zone} readOnly className={`w-full border rounded p-2 cursor-not-allowed ${isDark ? 'bg-slate-800/50 border-slate-700 text-slate-500' : 'bg-gray-50 border-gray-300 text-gray-500'}`} />
          </div>
          <div>
             <label className={`text-sm block mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Change Password</label>
             <input type="password" placeholder="New Password" className={`w-full border rounded p-2 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
          </div>
          <button onClick={handleSave} className="bg-orange-600 text-white px-6 py-2 rounded font-bold hover:bg-orange-500 transition-colors w-full flex justify-center items-center gap-2">
             <Save className="w-4 h-4" /> Save Changes
          </button>
          {saved && <p className="text-green-500 text-center text-sm mt-2">Profile updated successfully!</p>}
       </div>
    </div>
  );
};
export default Profile
