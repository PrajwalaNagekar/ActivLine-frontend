import { useState } from "react";
import { Save, X, MessageSquare } from "lucide-react";

const NewResponse = ({ onSave, isDark, responses, setResponses }) => {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", message: "" });

  const handleSave = () => {
    if (!form.title.trim() || !form.message.trim()) return;

    if (editing) {
      setResponses(
        responses.map((r) =>
          r.id === editing ? { ...r, ...form } : r
        )
      );
    } else {
      setResponses([
        ...responses,
        { id: Date.now(), ...form },
      ]);
    }

    setForm({ title: "", message: "" });
    setEditing(null);
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ title: "", message: "" });
  };

  return (
    <div data-editor className="sticky top-8">
      <div className={`rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 shadow-lg`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
            <MessageSquare className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {editing ? "Edit Response" : "Create New Response"}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {editing ? "Update your template" : "Add a new template"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter response title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border 
                ${isDark 
                  ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                } focus:ring-2 focus:border-transparent transition-colors`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Message *
            </label>
            <textarea
              rows="6"
              placeholder="Enter response message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border resize-none
                ${isDark 
                  ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                } focus:ring-2 focus:border-transparent transition-colors`}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!form.title.trim() || !form.message.trim()}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg font-medium
                transition-all duration-200 ${!form.title.trim() || !form.message.trim()
                  ? (isDark ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
            >
              <Save className="h-4 w-4" />
              {editing ? "Update Response" : "Save Response"}
            </button>

            {editing && (
              <button
                onClick={handleCancel}
                className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg font-medium border
                  ${isDark 
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewResponse;