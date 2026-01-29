
import { useEffect, useState } from "react";
import {
  getCannedCategories,
  createCannedCategory,
  updateCannedCategory,
  deleteCannedCategory,
} from "../../../../api/cannedResponse.api";
import { Plus, Trash2, Edit, Save, X, Folder, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Show temporary message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  /* ---------------- FETCH ALL ---------------- */
  const fetchCategories = async () => {
    try {
      const res = await getCannedCategories();
      setCategories(res.data.data);
    } catch (error) {
      showMessage('error', 'Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------------- CREATE ---------------- */
  const handleCreate = async () => {
    if (!name.trim()) {
      showMessage('error', 'Please enter a category name');
      return;
    }
    
    setLoading(true);
    try {
      await createCannedCategory({ name: name.trim() });
      setName("");
      setShowCreate(false);
      await fetchCategories();
      showMessage('success', 'Category created successfully');
    } catch (error) {
      showMessage('error', 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async (id) => {
    if (!editingName.trim()) {
      showMessage('error', 'Category name cannot be empty');
      return;
    }
    
    try {
      await updateCannedCategory(id, { name: editingName.trim() });
      setEditingId(null);
      setEditingName("");
      fetchCategories();
      showMessage('success', 'Category updated successfully');
    } catch (error) {
      showMessage('error', 'Failed to update category');
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      await deleteCannedCategory(id);
      await fetchCategories();
      showMessage('success', 'Category deleted successfully');
    } catch (error) {
      showMessage('error', 'Failed to delete category');
    } finally {
      setIsDeleting(null);
      setShowDeleteConfirm(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* BACK BUTTON */}
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

        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className={`text-2xl sm:text-3xl font-bold mb-2 truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Canned Response Categories
              </h1>
              <p className={`text-sm sm:text-base ${isDark ? "text-gray-400" : "text-gray-600"} transition-colors duration-200`}>
                Organize your canned responses into categories for easy access
              </p>
            </div>
            
            {/* STATS */}
            <div className={`px-4 py-2 rounded-lg shrink-0 ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <span className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {categories.length}
              </span>
              <span className={`ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {categories.length === 1 ? 'Category' : 'Categories'}
              </span>
            </div>
          </div>
        </div>

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

        {/* CREATE SECTION */}
        <div className="mb-8 sm:mb-10">
          {!showCreate ? (
            <button
              onClick={() => setShowCreate(true)}
              className={`w-full group px-4 sm:px-6 py-3 sm:py-4 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-[1.02] ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-800/30 hover:border-blue-600/50' 
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300'
              }`}
            >
              <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-blue-900/40' : 'bg-blue-100'}`}>
                <Plus className={`h-5 w-5 sm:h-6 sm:w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className={`font-semibold text-sm sm:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Add New Category
                </h3>
                <p className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create a new category for canned responses
                </p>
              </div>
            </button>
          ) : (
            <div className={`rounded-2xl border-2 p-4 sm:p-6 animate-fade-in ${
              isDark 
                ? 'bg-gray-800/50 border-blue-900/30' 
                : 'bg-white border-blue-100'
            }`}>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className={`font-semibold text-base sm:text-lg truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Create New Category
                </h3>
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setName("");
                  }}
                  className={`p-1 sm:p-2 rounded-lg transition-colors shrink-0 ${
                    isDark 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  className={`flex-1 px-4 sm:px-5 py-2 sm:py-3 rounded-xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                    isDark
                      ? "bg-gray-900 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleCreate}
                    disabled={loading}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                      loading
                        ? 'bg-blue-400'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    } text-white shadow-lg text-sm sm:text-base`}
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Creating...</span>
                        <span className="sm:hidden">Create</span>
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        <span>Create</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowCreate(false);
                      setName("");
                    }}
                    className={`px-4 py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    } text-sm sm:text-base`}
                  >
                    <X size={18} />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

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
                    Delete Category
                  </h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Are you sure you want to delete this category? This action cannot be undone.
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
                    'Delete Category'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES GRID */}
        {categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                onMouseEnter={() => setHoveredCard(cat._id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => editingId !== cat._id && !showDeleteConfirm && navigate(`/settings/canned/${cat._id}`)}
                className={`relative cursor-pointer rounded-xl sm:rounded-2xl border p-4 sm:p-6 transition-all duration-300 transform ${
                  hoveredCard === cat._id ? 'sm:scale-[1.02]' : 'scale-100'
                } ${
                  isDeleting === cat._id ? 'opacity-50' : 'opacity-100'
                } ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-900/20"
                    : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100"
                } group`}
              >
                {/* DELETE LOADING OVERLAY */}
                {isDeleting === cat._id && (
                  <div className="absolute inset-0 bg-black/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* TOP SECTION - FLEX CONTAINER */}
                <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                  {/* ICON AND CONTENT */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl shrink-0 transition-all duration-300 ${
                      isDark 
                        ? 'bg-blue-900/30' 
                        : 'bg-blue-100'
                    }`}>
                      <Folder className={`h-5 w-5 sm:h-6 sm:w-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>

                    {/* NAME / EDIT INPUT */}
                    <div className="flex-1 min-w-0">
                      {editingId === cat._id ? (
                        <input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className={`w-full px-3 py-2 rounded-lg border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isDark 
                              ? 'bg-gray-900 border-gray-700 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                          onKeyPress={(e) => e.key === 'Enter' && handleUpdate(cat._id)}
                          autoFocus
                        />
                      ) : (
                        <h3 className={`font-semibold text-sm sm:text-base line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {cat.name}
                        </h3>
                      )}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div 
                    className={`flex gap-1 transition-all duration-300 shrink-0 ${
                      hoveredCard === cat._id || editingId === cat._id ? 'opacity-100' : 'opacity-0 sm:opacity-0'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {editingId === cat._id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleUpdate(cat._id)}
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
                          onClick={handleCancelEdit}
                          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(cat._id);
                            setEditingName(cat.name);
                          }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(cat._id);
                          }}
                          disabled={isDeleting === cat._id}
                          className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          } disabled:opacity-50`}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700/50">
                  <p className={`text-xs sm:text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Click to view responses
                  </p>
                  <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    hoveredCard === cat._id 
                      ? 'bg-green-500 scale-125' 
                      : isDark 
                        ? 'bg-gray-600' 
                        : 'bg-gray-300'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {categories.length === 0 && !showCreate && (
          <div className="text-center py-12 sm:py-20 animate-fade-in">
            <div className={`inline-block p-6 rounded-2xl mb-6 ${
              isDark ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              <Folder className={`h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 ${
                isDark ? 'text-gray-700' : 'text-gray-300'
              }`} />
            </div>
            <h3 className={`text-lg sm:text-xl font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              No categories yet
            </h3>
            <p className={`mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Create your first category to organize and manage canned responses efficiently
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg sm:rounded-xl font-medium flex items-center gap-2 mx-auto transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base"
            >
              <Plus size={18} />
              Create First Category
            </button>
          </div>
        )}

        {/* FOOTER INFO */}
        {categories.length > 0 && (
          <div className={`mt-8 sm:mt-12 pt-4 sm:pt-6 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <p className={`text-xs sm:text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              💡 Tip: Click on any category to view and manage its canned responses
            </p>
          </div>
        )}
      </div>

      {/* Add these styles to your global CSS */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
        }

        /* Smooth transitions */
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
        }
      `}</style>
    </div>
  );
};

export default Categories;