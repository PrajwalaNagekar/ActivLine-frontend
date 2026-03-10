// FrenchisePlans.jsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Wifi,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-hot-toast';
import { getPlans } from '../../api/frenchise/frenchiseplans'; // ← your axios instance (adjust path if needed)

const Plans = () => {
  const { isDark } = useTheme();

  // ── State ───────────────────────────────────────────────
  const [plans, setPlans]             = useState([]);
  const [total, setTotal]             = useState(0);
  const [searchTerm, setSearchTerm]   = useState('');
  const [typeFilter, setTypeFilter]   = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage                  = 10; // should match backend default or be configurable

  const [loading, setLoading]         = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const initialFormState = {
    name:   '',
    speed:  '',
    price:  '',
    type:   'Home',
    status: 'Active',
  };
  const [formData, setFormData] = useState(initialFormState);

  // ── Derived / Memo ──────────────────────────────────────
  const accountId = "YOUR_FRANCHISE_ACCOUNT_ID_HERE"; // ← important! replace or get from context/auth

  const filtersActive = searchTerm.trim() !== '' || typeFilter !== 'All';

  // ── Fetch plans ─────────────────────────────────────────
  const fetchPlans = async (page = currentPage) => {
    if (!accountId || accountId === "YOUR_FRANCHISE_ACCOUNT_ID_HERE") {
      toast.error("Account ID is not set");
      return;
    }

    setLoading(true);
    try {
      const params = {
        page,
        limit: itemsPerPage,
      };

      if (searchTerm.trim())   params.search = searchTerm.trim();
      if (typeFilter !== 'All') params.type   = typeFilter;

      const res = await getPlans(accountId, params);

      if (!res.data.success) throw new Error(res.data.message || "Request failed");

      // Adjust transformation according to your real response shape
      const rawItems = res.data.data || [];

      const transformed = rawItems.map(item => {
        const profile = item.Profile || item || {};

        // Try to map fields that likely exist in your real data
        const bandwidth = profile.bandwidth || profile.speed || 'N/A';
        const pkgType   = profile.packageType || profile.type || profile.planType || 'Unknown';
        const priceRaw  = profile.price || profile.totalPrice || 0;

        return {
          id:     profile.id || profile._id || '??',
          name:   profile.name   || 'Unnamed Plan',
          speed:  String(bandwidth).replace(/template/gi, '').trim() || 'N/A',
          price:  Number(priceRaw).toFixed(2),
          type:   pkgType.charAt(0).toUpperCase() + pkgType.slice(1).toLowerCase(),
          status: profile.deactivated === 0 || profile.active ? 'Active' : 'Inactive',
        };
      });

      setPlans(transformed);
      setTotal(res.data.meta?.total || transformed.length);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Could not load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [currentPage, searchTerm, typeFilter]); // ← auto-refetch on filter/page change

  // ── Handlers ────────────────────────────────────────────
  const handleOpenModal = (plan = null) => {
    setEditingPlan(plan);
    setFormData(plan || initialFormState);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: implement POST / PUT to real endpoint
    toast("Plan create/update → API endpoint not implemented yet", { icon: "⚠️" });
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this plan?")) return;
    // TODO: implement DELETE to real endpoint
    toast("Plan delete → API endpoint not implemented yet", { icon: "⚠️" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── Pagination math ─────────────────────────────────────
  const totalPages = Math.ceil(total / itemsPerPage) || 1;

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* Controls */}
      <div className={`p-5 rounded-xl shadow border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search plan name..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border focus:ring-2 outline-none transition-all ${
                isDark
                  ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-500 focus:ring-blue-500/30'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-purple-400/30'
              }`}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={typeFilter}
              onChange={e => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 text-sm rounded-lg border cursor-pointer min-w-[140px] ${
                isDark
                  ? 'bg-slate-800 border-slate-600 text-white'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <option value="All">All Types</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              {/* Add more real types your backend returns */}
            </select>

            <button
              onClick={() => handleOpenModal()}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow transition active:scale-95 ${
                isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-purple-600 hover:bg-purple-600/90'
              }`}
            >
              <Plus size={16} /> Add Plan
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-xl shadow border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`${isDark ? 'bg-slate-800/60' : 'bg-gray-50'}`}>
                <th className={`py-4 px-6 text-xs uppercase font-semibold tracking-wider ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Plan</th>
                <th className={`py-4 px-6 text-xs uppercase font-semibold tracking-wider ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Speed</th>
                <th className={`py-4 px-6 text-xs uppercase font-semibold tracking-wider ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Price (₹)</th>
                <th className={`py-4 px-6 text-xs uppercase font-semibold tracking-wider ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Type</th>
                <th className={`py-4 px-6 text-xs uppercase font-semibold tracking-wider ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Status</th>
                <th className={`py-4 px-6 text-xs uppercase font-semibold tracking-wider text-right ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-gray-100'}`}>
              {loading ? (
                <tr><td colSpan={6} className="py-16 text-center text-slate-400">Loading plans...</td></tr>
              ) : plans.length === 0 ? (
                <tr><td colSpan={6} className="py-16 text-center text-slate-500">No plans found{filtersActive ? " matching filters" : ""}</td></tr>
              ) : (
                plans.map(plan => (
                  <tr key={plan.id} className={`group hover:${isDark ? 'bg-slate-800/40' : 'bg-purple-50/40'}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-700 text-blue-400' : 'bg-purple-100 text-purple-600'}`}>
                          <Wifi size={16} />
                        </div>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{plan.name}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{plan.speed}</td>
                    <td className={`py-4 px-6 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{plan.price}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        plan.type === 'Home'
                          ? isDark ? 'bg-blue-900/30 text-blue-300 border-blue-700/40' : 'bg-blue-50 text-blue-700 border-blue-200'
                          : isDark ? 'bg-purple-900/30 text-purple-300 border-purple-700/40' : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {plan.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        plan.status === 'Active'
                          ? isDark ? 'bg-green-900/30 text-green-300 border-green-700/40' : 'bg-green-50 text-green-700 border-green-200'
                          : isDark ? 'bg-red-900/30 text-red-300 border-red-700/40' : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${plan.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                        {plan.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(plan)} title="Edit" className={`p-2 rounded hover:${isDark ? 'bg-slate-700 text-green-400' : 'bg-gray-100 text-green-600'}`}>
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(plan.id)} title="Delete" className={`p-2 rounded hover:${isDark ? 'bg-slate-700 text-red-400' : 'bg-gray-100 text-red-600'}`}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > 0 && (
          <div className={`px-6 py-4 border-t flex items-center justify-between text-sm ${isDark ? 'border-slate-700 text-slate-300' : 'border-gray-200 text-gray-600'}`}>
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, total)} of {total}
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className={`p-2 rounded border disabled:opacity-40 ${isDark ? 'border-slate-600 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const page = currentPage <= 4 ? i + 1 : (i + currentPage - 3);
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded border text-sm font-medium ${
                      page === currentPage
                        ? isDark ? 'bg-blue-600 text-white border-blue-500' : 'bg-purple-600 text-white border-purple-500'
                        : isDark ? 'border-slate-600 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className={`p-2 rounded border disabled:opacity-40 ${isDark ? 'border-slate-600 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal – keep your original styling/structure */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg mx-4 rounded-2xl shadow-2xl ${isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-purple-100'}`}>
            <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-slate-700' : 'border-purple-100'}`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h2>
              <button onClick={handleCloseModal}>
                <XCircle className={isDark ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-700'} size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block mb-1.5 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Plan Name</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} required className={`w-full px-4 py-2.5 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300'}`} />
                </div>
                <div>
                  <label className={`block mb-1.5 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Speed</label>
                  <input name="speed" value={formData.speed} onChange={handleInputChange} required className={`w-full px-4 py-2.5 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300'}`} />
                </div>
                {/* Add price, type, status, etc. fields similarly */}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={handleCloseModal} className={`px-5 py-2.5 rounded-lg ${isDark ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`px-6 py-2.5 rounded-lg text-white font-semibold ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-purple-600 hover:bg-purple-500'}`}>
                  {editingPlan ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;