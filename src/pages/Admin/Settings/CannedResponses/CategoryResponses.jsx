// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getResponsesByCategory,
//   deleteCannedResponse,
//   getCannedCategories,
// } from "../../../../api/cannedResponse.api";
// import { ArrowLeft, Trash2, Copy, Check } from "lucide-react";
// import { useTheme } from "../../../../context/ThemeContext";

// const CategoryResponses = () => {
//   const { isDark } = useTheme();
//   const { categoryId } = useParams();
//   const navigate = useNavigate();

//   const [responses, setResponses] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [copiedId, setCopiedId] = useState(null);

//   /* ---------------- LOAD CATEGORY NAME ---------------- */
//   useEffect(() => {
//     const loadCategoryName = async () => {
//       const res = await getCannedCategories();
//       const cat = res.data.data.find(c => c._id === categoryId);
//       if (cat) setCategoryName(cat.name);
//     };
//     loadCategoryName();
//   }, [categoryId]);

//   /* ---------------- LOAD RESPONSES ---------------- */
//   useEffect(() => {
//     if (!categoryId) return;

//     const fetchResponses = async () => {
//       const res = await getResponsesByCategory(categoryId);
//       setResponses(res.data.data);
//     };

//     fetchResponses();
//   }, [categoryId]);

//   /* ---------------- COPY ---------------- */
//   const handleCopy = (text, id) => {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 1500);
//   };

//   /* ---------------- DELETE ---------------- */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this response?")) return;
//     await deleteCannedResponse(id);
//     setResponses(prev => prev.filter(r => r._id !== id));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <button
//             onClick={() => navigate("/settings/canned/categories")}
//             className="flex items-center gap-2 text-sm text-blue-600 mb-2"
//           >
//             <ArrowLeft size={16} />
//             Back to Categories
//           </button>

//           <h1 className="text-2xl font-bold">
//             {categoryName || "Category Responses"}
//           </h1>
//           <p className={isDark ? "text-gray-400" : "text-gray-600"}>
//             Showing all canned responses under this category
//           </p>
//         </div>
//       </div>

//       {/* EMPTY STATE */}
//       {responses.length === 0 ? (
//         <div className="text-center py-16 text-gray-500">
//           No responses found for this category.
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {responses.map((res) => (
//             <div
//               key={res._id}
//               className={`rounded-xl border p-5 transition hover:shadow-lg
//                 ${
//                   isDark
//                     ? "bg-gray-800 border-gray-700"
//                     : "bg-white border-gray-200"
//                 }`}
//             >
//               <h3 className="font-semibold mb-2">{res.title}</h3>

//               <p className="text-sm text-gray-500 mb-4">
//                 {res.message}
//               </p>

//               <div className="flex justify-between items-center">
//                 <button
//                   onClick={() => handleCopy(res.message, res._id)}
//                   className="flex items-center gap-2 text-sm text-blue-600"
//                 >
//                   {copiedId === res._id ? (
//                     <>
//                       <Check size={16} /> Copied
//                     </>
//                   ) : (
//                     <>
//                       <Copy size={16} /> Copy
//                     </>
//                   )}
//                 </button>

//                 <button
//                   onClick={() => handleDelete(res._id)}
//                   className="text-red-500"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryResponses;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getResponsesByCategory,
  deleteCannedResponse,
  getCannedCategories,
  createCannedResponse,
  updateCannedResponse,
} from "../../../../api/cannedResponse.api";
import { 
  ArrowLeft, 
  Trash2, 
  Copy, 
  Check, 
  Plus, 
  Edit, 
  Save, 
  X, 
  MessageSquare,
  Folder,
  AlertCircle,
  Search
} from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

const CategoryResponses = () => {
  const { isDark } = useTheme();
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [responses, setResponses] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newResponse, setNewResponse] = useState({ title: "", message: "" });
  const [editResponse, setEditResponse] = useState({ title: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  // Show temporary message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  /* ---------------- LOAD CATEGORY NAME ---------------- */
  useEffect(() => {
    const loadCategoryName = async () => {
      try {
        const res = await getCannedCategories();
        const cat = res.data.data.find(c => c._id === categoryId);
        if (cat) {
          setCategoryName(cat.name);
        } else {
          showMessage('error', 'Category not found');
          navigate("/settings/canned/categories");
        }
      } catch (error) {
        showMessage('error', 'Failed to load category');
      }
    };
    loadCategoryName();
  }, [categoryId]);

  /* ---------------- LOAD RESPONSES ---------------- */
  useEffect(() => {
    if (!categoryId) return;

    const fetchResponses = async () => {
      setLoading(true);
      try {
        const res = await getResponsesByCategory(categoryId);
        setResponses(res.data.data);
      } catch (error) {
        showMessage('error', 'Failed to load responses');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [categoryId]);

  /* ---------------- CREATE RESPONSE ---------------- */
  const handleCreate = async () => {
    if (!newResponse.title.trim() || !newResponse.message.trim()) {
      showMessage('error', 'Please fill in both title and message');
      return;
    }

    setLoading(true);
    try {
      await createCannedResponse({
        ...newResponse,
        categoryId
      });
      setNewResponse({ title: "", message: "" });
      setShowCreate(false);
      const res = await getResponsesByCategory(categoryId);
      setResponses(res.data.data);
      showMessage('success', 'Response created successfully');
    } catch (error) {
      showMessage('error', 'Failed to create response');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE RESPONSE ---------------- */
  const handleUpdate = async (id) => {
    if (!editResponse.title.trim() || !editResponse.message.trim()) {
      showMessage('error', 'Title and message cannot be empty');
      return;
    }

    try {
      await updateCannedResponse(id, {
        ...editResponse,
        categoryId // Include categoryId in the update payload
      });
      setEditingId(null);
      setEditResponse({ title: "", message: "" });
      const res = await getResponsesByCategory(categoryId);
      setResponses(res.data.data);
      showMessage('success', 'Response updated successfully');
    } catch (error) {
      showMessage('error', 'Failed to update response');
    }
  };

  /* ---------------- COPY ---------------- */
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showMessage('success', 'Response copied to clipboard');
    setTimeout(() => setCopiedId(null), 1500);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      await deleteCannedResponse(id);
      setResponses(prev => prev.filter(r => r._id !== id));
      showMessage('success', 'Response deleted successfully');
    } catch (error) {
      showMessage('error', 'Failed to delete response');
    } finally {
      setIsDeleting(null);
      setShowDeleteConfirm(null);
    }
  };

  /* ---------------- FILTERED RESPONSES ---------------- */
  const filteredResponses = responses.filter(response =>
    response.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    response.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (response) => {
    setEditingId(response._id);
    setEditResponse({ title: response.title, message: response.message });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditResponse({ title: "", message: "" });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* MESSAGE TOAST */}
        {message.text && (
          <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 animate-slide-in max-w-xs sm:max-w-md`}>
            <div className={`flex items-start gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-lg shadow-xl transform transition-all duration-300 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <Check className="text-green-600 shrink-0 mt-0.5" size={20} />
              ) : (
                <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
              )}
              <span className="font-medium text-sm sm:text-base break-words">{message.text}</span>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/settings/canned")}
            className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:-translate-x-1 ${
              isDark 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <Folder className={`h-6 w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h1 className={`text-2xl sm:text-3xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {categoryName || "Loading..."}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`h-2 w-2 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
                    <p className={`text-sm sm:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {responses.length} {responses.length === 1 ? 'response' : 'responses'} in this category
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCreate(true)}
              className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
              } shadow-lg text-sm sm:text-base`}
            >
              <Plus size={18} />
              <span>Add Response</span>
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search responses by title or content..."
              className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-white border-gray-300 placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400"
              }`}
            />
          </div>
        </div>

        {/* CREATE RESPONSE FORM */}
        {showCreate && (
          <div className={`rounded-2xl border-2 p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in ${
            isDark 
              ? 'bg-gray-800/50 border-blue-900/30' 
              : 'bg-white border-blue-100'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold text-lg sm:text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Create New Response
              </h3>
              <button
                onClick={() => {
                  setShowCreate(false);
                  setNewResponse({ title: "", message: "" });
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={newResponse.title}
                onChange={(e) => setNewResponse({ ...newResponse, title: e.target.value })}
                placeholder="Response Title (e.g., Greeting, Technical Support)"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }`}
              />

              <textarea
                value={newResponse.message}
                onChange={(e) => setNewResponse({ ...newResponse, message: e.target.value })}
                placeholder="Enter your response content here..."
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  isDark
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border-gray-300"
                }`}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setNewResponse({ title: "", message: "" });
                  }}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className={`px-5 py-2.5 rounded-lg font-medium text-white transition-colors flex items-center gap-2 ${
                    loading
                      ? 'bg-blue-400'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Create Response
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className={`max-w-md w-full rounded-2xl p-6 transform transition-all duration-300 animate-scale-in ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-full ${
                  isDark ? 'bg-red-900/30' : 'bg-red-100'
                }`}>
                  <AlertCircle className="text-red-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Delete Response
                  </h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Are you sure you want to delete this response? This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  disabled={isDeleting === showDeleteConfirm}
                  className={`px-5 py-2.5 rounded-lg font-medium text-white transition-colors flex items-center gap-2 ${
                    isDeleting === showDeleteConfirm
                      ? 'bg-red-400'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isDeleting === showDeleteConfirm ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete Response'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESPONSES GRID */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className={`h-12 w-12 border-4 ${isDark ? 'border-blue-500' : 'border-blue-400'} border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading responses...</p>
            </div>
          </div>
        ) : filteredResponses.length === 0 ? (
          <div className="text-center py-12 sm:py-20 animate-fade-in">
            <div className={`inline-block p-6 rounded-2xl mb-6 ${
              isDark ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              <MessageSquare className={`h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 ${
                isDark ? 'text-gray-700' : 'text-gray-300'
              }`} />
            </div>
            <h3 className={`text-lg sm:text-xl font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {searchTerm ? 'No matching responses found' : 'No responses yet'}
            </h3>
            <p className={`mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              {searchTerm 
                ? 'Try a different search term or create a new response'
                : 'Add your first response to this category'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreate(true)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl font-medium flex items-center gap-2 mx-auto transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base"
              >
                <Plus size={18} />
                Add First Response
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredResponses.map((res) => (
              <div
                key={res._id}
                className={`group relative rounded-xl sm:rounded-2xl border p-4 sm:p-6 transition-all duration-300 transform hover:scale-[1.01] ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-900/20"
                    : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100"
                }`}
              >
                {/* DELETE LOADING OVERLAY */}
                {isDeleting === res._id && (
                  <div className="absolute inset-0 bg-black/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* HEADER */}
                <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                  {editingId === res._id ? (
                    <input
                      value={editResponse.title}
                      onChange={(e) => setEditResponse({ ...editResponse, title: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                          ? 'bg-gray-900 border-gray-700 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      autoFocus
                    />
                  ) : (
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-base sm:text-lg truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {res.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`h-1.5 w-1.5 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {res.message.length} characters
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className={`flex gap-1 transition-all duration-300 shrink-0 ${
                    editingId === res._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {editingId === res._id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(res._id)}
                          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' 
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                          title="Save"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(res)}
                          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' 
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(res._id)}
                          disabled={isDeleting === res._id}
                          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          } disabled:opacity-50`}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* MESSAGE CONTENT */}
                <div className="mb-4 sm:mb-6">
                  {editingId === res._id ? (
                    <textarea
                      value={editResponse.message}
                      onChange={(e) => setEditResponse({ ...editResponse, message: e.target.value })}
                      rows={4}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        isDark 
                          ? 'bg-gray-900 border-gray-700 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  ) : (
                    <div className={`rounded-lg p-3 sm:p-4 max-h-40 overflow-y-auto ${
                      isDark ? 'bg-gray-900/50' : 'bg-gray-50'
                    }`}>
                      <p className={`text-sm sm:text-base whitespace-pre-wrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {res.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-700/50">
                  <button
                    onClick={() => handleCopy(res.message, res._id)}
                    disabled={editingId === res._id}
                    className={`flex items-center gap-2 text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.05] ${
                      copiedId === res._id
                        ? isDark 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-green-100 text-green-600'
                        : isDark
                          ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {copiedId === res._id ? (
                      <>
                        <Check size={16} />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span className="hidden sm:inline">Copy Response</span>
                        <span className="sm:hidden">Copy</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      Updated: {new Date(res.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER STATS */}
        {filteredResponses.length > 0 && (
          <div className={`mt-8 sm:mt-12 pt-4 sm:pt-6 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Showing {filteredResponses.length} of {responses.length} responses
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
              <div className={`px-3 py-1.5 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {responses.length}
                </span>
                <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  total responses
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryResponses;