import React, { useState, useMemo } from "react";
import {
    Plus,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    XCircle,
    Users
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "react-hot-toast";

/* ---------------- MOCK DATA ---------------- */
const INITIAL_STAFFS = [
    { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "Staff", status: "Active" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Staff", status: "Inactive" },
];

/* ---------------- COMPONENT ---------------- */
const Staff = () => {
    const { isDark } = useTheme();

    const [staffs, setStaffs] = useState(INITIAL_STAFFS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 5;

    const initialForm = {
        name: "",
        email: "",
        role: "Staff",
        status: "Active",
    };

    const [formData, setFormData] = useState(initialForm);

    /* ---------------- HANDLERS ---------------- */
    const openModal = (staff = null) => {
        if (staff) {
            setEditingStaff(staff);
            setFormData(staff);
        } else {
            setEditingStaff(null);
            setFormData(initialForm);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingStaff(null);
        setFormData(initialForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingStaff) {
            setStaffs(staffs.map(s => s.id === editingStaff.id ? { ...formData, id: s.id } : s));
            toast.success("Staff updated successfully");
        } else {
            setStaffs([{ ...formData, id: Date.now() }, ...staffs]);
            toast.success("Staff added successfully");
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this staff?")) {
            setStaffs(staffs.filter(s => s.id !== id));
            toast.success("Staff deleted");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /* ---------------- PAGINATION ---------------- */
    const totalPages = Math.ceil(staffs.length / ITEMS_PER_PAGE);

    const paginatedStaffs = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return staffs.slice(start, start + ITEMS_PER_PAGE);
    }, [staffs, currentPage]);

    /* ---------------- UI ---------------- */
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className={`p-4 rounded-xl border flex justify-between items-center ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
                <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    Staff Management
                </h2>

                <button
                    onClick={() => openModal()}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-lg transition-all active:scale-95 ${isDark
                        ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
                        : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'
                        }`}
                >
                    <Plus className="w-4 h-4" />
                    Add Staff
                </button>
            </div>

            {/* Table */}
            <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
                <table className="w-full text-left">
                    <thead className={isDark ? "bg-slate-800/50" : "bg-gray-50"}>
                        <tr>
                            {["Name", "Email", "Role", "Status", "Actions"].map(h => (
                                <th key={h} className={`px-6 py-3 text-xs font-semibold uppercase ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className={isDark ? "divide-y divide-slate-800" : "divide-y divide-gray-100"}>
                        {paginatedStaffs.map(staff => (
                            <tr key={staff.id} className={isDark ? "hover:bg-slate-800/40" : "hover:bg-gray-50"}>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <Users className="w-4 h-4 text-blue-400" />
                                    <span className={isDark ? "text-white" : "text-gray-900"}>{staff.name}</span>
                                </td>
                                <td className={`px-6 py-4 text-sm ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                                    {staff.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border
                    ${staff.role === "Admin"
                                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        }`}>
                                        {staff.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border
                    ${staff.status === "Active"
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                        }`}>
                                        {staff.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button onClick={() => openModal(staff)} className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-green-400' : 'hover:bg-gray-100 text-gray-400 hover:text-green-600'}`}>
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDelete(staff.id)} className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-red-400' : 'hover:bg-gray-100 text-gray-400 hover:text-red-600'}`}>
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div
                    className={`p-4 border-t flex items-center justify-between
    ${isDark ? "border-slate-800" : "border-gray-200"}`}
                >
                    <span
                        className={`text-sm
      ${isDark ? "text-slate-400" : "text-gray-500"}`}
                    >
                        Page {currentPage} of {totalPages}
                    </span>

                    <div className="flex items-center gap-2">
                        {/* Prev */}
                        <button
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg border transition-colors
      disabled:opacity-50 disabled:cursor-not-allowed
      ${isDark
                                    ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                                    : "border-gray-300 hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border
        ${currentPage === page
                                        ? isDark
                                            ? 'bg-blue-600 text-white border-blue-500'
                                            : 'bg-purple-600 text-white border-purple-500'
                                        : isDark
                                            ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                                            : 'border-purple-200 text-purple-700 hover:bg-purple-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg border transition-colors
      disabled:opacity-50 disabled:cursor-not-allowed
      ${isDark
                                    ? "border-slate-700 hover:bg-slate-800 text-slate-300"
                                    : "border-gray-300 hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>

            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className={`w-full max-w-lg rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200
        ${isDark
                                ? "bg-slate-900 border border-slate-700"
                                : "bg-white border border-gray-200 ring-4 ring-gray-100"
                            }`}
                    >
                        {/* Modal Header */}
                        <div
                            className={`p-6 border-b flex justify-between items-center
          ${isDark ? "border-slate-800" : "border-gray-200"}`}
                        >
                            <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                                {editingStaff ? "Edit Staff" : "Add Staff"}
                            </h2>

                            <button
                                onClick={closeModal}
                                className={`p-1 rounded-full transition-colors
            ${isDark
                                        ? "text-slate-400 hover:bg-slate-800"
                                        : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                    }`}
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter staff name"
                                        className={`w-full p-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition-all
                ${isDark
                                                ? "bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20"
                                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                                            }`}
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        className={`w-full p-2.5 rounded-lg border text-sm outline-none focus:ring-2 transition-all
                ${isDark
                                                ? "bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20"
                                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                                            }`}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Role */}
                                <div className="space-y-2">
                                    <label className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className={`w-full p-2.5 rounded-lg border text-sm outline-none cursor-pointer focus:ring-2 transition-all
                ${isDark
                                                ? "bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20"
                                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                                            }`}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Staff">Staff</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <label className={`text-sm font-medium ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className={`w-full p-2.5 rounded-lg border text-sm outline-none cursor-pointer focus:ring-2 transition-all
                ${isDark
                                                ? "bg-slate-800 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20"
                                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                                            }`}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
              ${isDark
                                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className={`px-6 py-2 text-sm font-bold text-white rounded-lg shadow-lg transition-all active:scale-95
              ${isDark
                                            ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                                            : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                                        }`}
                                >
                                    {editingStaff ? "Update Staff" : "Create Staff"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Staff;
