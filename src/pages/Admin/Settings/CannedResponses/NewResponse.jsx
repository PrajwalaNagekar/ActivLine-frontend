// // import { useState } from "react";
// // import { Save, X, MessageSquare } from "lucide-react";
// // import { createCannedResponse } from "../../../../api/cannedResponse.api";
// // import { toast } from "react-hot-toast";

// // const NewResponse = ({ onSave, isDark, responses, setResponses, selectedCategory }) => {
// //   const [editing, setEditing] = useState(null);
// //   const [form, setForm] = useState({ title: "", message: "" });
// //   const [loading, setLoading] = useState(false);

// // const handleSave = async () => {
// //     if (!form.title.trim() || !form.message.trim()) {
// //       toast.error("Please fill in all fields");
// //       return;
// //     }

// //     if (!selectedCategory) {
// //       toast.error("Please select a category first");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const res = await createCannedResponse({
// //         categoryId: selectedCategory,
// //         title: form.title,
// //         message: form.message,
// //       });

// //       if (res.data && res.data.success) {
// //         setResponses((prev) => [...prev, res.data.data]);
// //         setForm({ title: "", message: "" });
// //         toast.success("Response created successfully");
// //       }
// //     } catch (err) {
// //       console.error("Failed to save response", err);
// //       toast.error(err.response?.data?.message || "Failed to create response");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };


// //   const handleCancel = () => {
// //     setEditing(null);
// //     setForm({ title: "", message: "" });
// //   };

// //   return (
// //     <div data-editor className="sticky top-8">
// //       <div className={`rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 shadow-lg`}>
// //         <div className="flex items-center gap-3 mb-6">
// //           <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
// //             <MessageSquare className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
// //           </div>
// //           <div>
// //             <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
// //               {editing ? "Edit Response" : "Create New Response"}
// //             </h3>
// //             <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
// //               {editing ? "Update your template" : "Add a new template"}
// //             </p>
// //           </div>
// //         </div>

// //         <div className="space-y-4">
// //           <div>
// //             <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
// //               Title *
// //             </label>
// //             <input
// //               type="text"
// //               placeholder="Enter response title"
// //               value={form.title}
// //               onChange={(e) => setForm({ ...form, title: e.target.value })}
// //               className={`w-full px-4 py-3 rounded-lg border 
// //                 ${isDark 
// //                   ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500' 
// //                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
// //                 } focus:ring-2 focus:border-transparent transition-colors`}
// //             />
// //           </div>

// //           <div>
// //             <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
// //               Message *
// //             </label>
// //             <textarea
// //               rows="6"
// //               placeholder="Enter response message..."
// //               value={form.message}
// //               onChange={(e) => setForm({ ...form, message: e.target.value })}
// //               className={`w-full px-4 py-3 rounded-lg border resize-none
// //                 ${isDark 
// //                   ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500' 
// //                   : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
// //                 } focus:ring-2 focus:border-transparent transition-colors`}
// //             />
// //           </div>

// //           <div className="flex gap-3 pt-2">
// //             <button
// //               onClick={handleSave}
// //               disabled={loading || !form.title.trim() || !form.message.trim()}
// //               className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg font-medium
// //                 transition-all duration-200 ${loading || !form.title.trim() || !form.message.trim()
// //                   ? (isDark ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-500 cursor-not-allowed')
// //                   : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
// //                 }`}
// //             >
// //               <Save className="h-4 w-4" />
// //               {loading ? "Saving..." : (editing ? "Update Response" : "Save Response")}
// //             </button>

// //             {editing && (
// //               <button
// //                 onClick={handleCancel}
// //                 className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg font-medium border
// //                   ${isDark 
// //                     ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
// //                     : 'border-gray-300 text-gray-700 hover:bg-gray-50'
// //                   } transition-colors`}
// //               >
// //                 <X className="h-4 w-4" />
// //                 Cancel
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NewResponse;


// import { useState } from "react";
// import { Save, X, MessageSquare, Loader2 } from "lucide-react";
// import { createCannedResponse } from "../../../../api/cannedResponse.api";

// const NewResponse = ({
//   isDark,
//   selectedCategory,
//   setResponses,
// }) => {
//   const [form, setForm] = useState({ title: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSave = async () => {
//     if (!selectedCategory) {
//       setError("Please select a category first");
//       return;
//     }

//     if (!form.title.trim() || !form.message.trim()) return;

//     try {
//       setLoading(true);
//       setError("");

//       const res = await createCannedResponse({
//         categoryId: selectedCategory,
//         title: form.title.trim(),
//         message: form.message.trim(),
//       });

//       // ✅ API response safe handling
//       if (res?.data?.success) {
//         setResponses((prev) => [...prev, res.data.data]);
//         setForm({ title: "", message: "" });
//       }
//     } catch (err) {
//       console.error(err);
//       setError(
//         err?.response?.data?.message || "Failed to create response"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="sticky top-8">
//       <div
//         className={`rounded-2xl border p-6 shadow-lg ${
//           isDark
//             ? "bg-gray-800 border-gray-700"
//             : "bg-white border-gray-200"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <div
//             className={`p-2 rounded-lg ${
//               isDark ? "bg-blue-900/30" : "bg-blue-100"
//             }`}
//           >
//             <MessageSquare
//               className={`h-5 w-5 ${
//                 isDark ? "text-blue-400" : "text-blue-600"
//               }`}
//             />
//           </div>
//           <div>
//             <h3
//               className={`font-semibold ${
//                 isDark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Create New Response
//             </h3>
//             <p
//               className={`text-sm ${
//                 isDark ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               Add a reusable canned message
//             </p>
//           </div>
//         </div>

//         {/* Error */}
//         {error && (
//           <p className="mb-4 text-sm text-red-500">{error}</p>
//         )}

//         {/* Title */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">
//             Title *
//           </label>
//           <input
//             type="text"
//             value={form.title}
//             onChange={(e) =>
//               setForm({ ...form, title: e.target.value })
//             }
//             placeholder="Internet Error"
//             className={`w-full px-4 py-3 rounded-lg border ${
//               isDark
//                 ? "bg-gray-900 border-gray-700 text-white"
//                 : "bg-white border-gray-300"
//             } focus:ring-2 focus:ring-blue-500`}
//           />
//         </div>

//         {/* Message */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">
//             Message *
//           </label>
//           <textarea
//             rows={5}
//             value={form.message}
//             onChange={(e) =>
//               setForm({ ...form, message: e.target.value })
//             }
//             placeholder="Please restart your router and wait 5 minutes."
//             className={`w-full px-4 py-3 rounded-lg border resize-none ${
//               isDark
//                 ? "bg-gray-900 border-gray-700 text-white"
//                 : "bg-white border-gray-300"
//             } focus:ring-2 focus:ring-blue-500`}
//           />
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={handleSave}
//           disabled={loading || !form.title || !form.message}
//           className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
//           }`}
//         >
//           {loading ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <Save className="h-4 w-4" />
//           )}
//           Save Response
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewResponse;

import { useEffect, useState } from "react";
import {
  getCannedCategories,
  createCannedResponse,
} from "../../../../api/cannedResponse.api";
import { Save, MessageSquare, Loader2 } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

const CreateCannedResponse = () => {
  const { isDark } = useTheme();

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [form, setForm] = useState({ title: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------------- LOAD CATEGORIES ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCannedCategories();
        setCategories(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  /* ---------------- SAVE RESPONSE ---------------- */
  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!categoryId) {
      setError("Please select a category");
      return;
    }

    if (!form.title.trim() || !form.message.trim()) {
      setError("Title and message are required");
      return;
    }

    try {
      setLoading(true);

      const res = await createCannedResponse({
        categoryId,
        title: form.title.trim(),
        message: form.message.trim(),
      });

      if (res?.data?.success) {
        setSuccess("Canned response created successfully");
        setForm({ title: "", message: "" });
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to create response"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            isDark ? "bg-blue-900/30" : "bg-blue-100"
          }`}
        >
          <MessageSquare
            className={`h-6 w-6 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Create Canned Response</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Create reusable support replies
          </p>
        </div>
      </div>

      {/* CARD */}
      <div
        className={`rounded-2xl border p-6 shadow-lg ${
          isDark
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* ERROR */}
        {error && (
          <p className="mb-4 text-sm text-red-500">{error}</p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="mb-4 text-sm text-green-500">{success}</p>
        )}

        {/* CATEGORY */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Category *
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              isDark
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-300"
            } focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* TITLE */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            type="text"
            placeholder="Internet Error"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-lg border ${
              isDark
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-300"
            } focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* MESSAGE */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Response Message *
          </label>
          <textarea
            rows={5}
            placeholder="Please restart your router and wait 5 minutes."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-lg border resize-none ${
              isDark
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-300"
            } focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          }`}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Response
        </button>
      </div>
    </div>
  );
};

export default CreateCannedResponse;
