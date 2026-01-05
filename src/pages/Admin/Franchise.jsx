import React, { useState, useMemo } from "react";
import { INITIAL_FRANCHISE_DATA } from "../../data";
import { Plus, Building, XCircle, Edit, Eye, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from '../../context/ThemeContext';

const FranchisePage = () => {
    const { isDark } = useTheme();
    const [franchises, setFranchises] = useState(INITIAL_FRANCHISE_DATA);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedFranchise, setSelectedFranchise] = useState(null);
    const [newFranchise, setNewFranchise] = useState({
      name: '',
      owner: '',
      email: '',
      location: '',
      share: '15'
    });
    const [editFranchise, setEditFranchise] = useState({
      name: '',
      owner: '',
      email: '',
      location: '',
      share: '15',
      status: 'Active'
    });
    
    const handleAddFranchise = () => {
      const newId = `FR-BLR-0${franchises.length + 1}`;
      const franchiseToAdd = {
        id: newId,
        name: newFranchise.name,
        owner: newFranchise.owner,
        location: newFranchise.location,
        subscribers: 0,
        share: `${newFranchise.share}%`,
        status: 'Pending' // Default to pending until approved
      };
      setFranchises([...franchises, franchiseToAdd]);
      setIsModalOpen(false);
      setNewFranchise({ name: '', owner: '', email: '', location: '', share: '15' });
    };

  const handleEditClick = (franchise, e) => {
    e.stopPropagation();
    setSelectedFranchise(franchise);
    // Extract share number from "15%" format
    const shareNumber = franchise.share.replace('%', '');
    setEditFranchise({
      name: franchise.name,
      owner: franchise.owner,
      email: franchise.email || `${franchise.owner.toLowerCase().replace(' ', '.')}@example.com`,
      location: franchise.location,
      share: shareNumber,
      status: franchise.status
    });
    setIsEditModalOpen(true);
  };

  const handleViewClick = (franchise, e) => {
    e.stopPropagation();
    setSelectedFranchise(franchise);
    setIsViewModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFranchise(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateFranchise = () => {
    if (!selectedFranchise || !editFranchise.name) return;
    
    setFranchises(franchises.map(fran => 
      fran.id === selectedFranchise.id 
        ? {
            ...fran,
            name: editFranchise.name,
            owner: editFranchise.owner,
            location: editFranchise.location,
            share: `${editFranchise.share}%`,
            status: editFranchise.status
          }
        : fran
    ));
    setIsEditModalOpen(false);
    setSelectedFranchise(null);
    setEditFranchise({
      name: '',
      owner: '',
      email: '',
      location: '',
      share: '15',
      status: 'Active'
    });
  };

  // Pagination calculations
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(franchises.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFranchises = franchises.slice(startIndex, endIndex);
    
    return {
      paginatedFranchises,
      totalPages,
      totalItems: franchises.length,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, franchises.length)
    };
  }, [franchises, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };
  
    return (
      <div className={`rounded-xl shadow-sm border flex flex-col h-full relative ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className={`p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Franchise Management</h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Onboard and manage local network partners</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 shadow-sm shadow-blue-900/20"
          >
            <Plus className="w-4 h-4" /> Add Franchise
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pb-0">
           <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-xs uppercase font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Total Partners</p>
              <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{franchises.length}</p>
           </div>
           <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-xs uppercase font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Active Revenue Share</p>
              <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>₹12.4L <span className={`text-xs font-normal ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>/ month</span></p>
           </div>
           <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-xs uppercase font-medium ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Pending Approvals</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">{franchises.filter(f => f.status === 'Pending').length}</p>
           </div>
        </div>
        
        <div className="flex-1 flex flex-col min-h-0 p-6">
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className={`rounded-lg border overflow-hidden h-full ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
              <div className="overflow-x-auto overflow-y-auto h-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`${isDark ? 'bg-slate-800/50 border-b border-slate-800' : 'bg-gray-50 border-b border-gray-200'}`}>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Business Name</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Owner / Contact</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Location</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Subscribers</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Rev. Share</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Status</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider text-right ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-gray-200'}`}>
                    {paginationData.paginatedFranchises.length > 0 ? (
                      paginationData.paginatedFranchises.map((fran, i) => (
                        <tr key={i} className={`group transition-colors ${isDark ? 'hover:bg-slate-800/50 bg-slate-900/30' : 'hover:bg-gray-50 bg-white'}`}>
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs border border-purple-500/20 flex-shrink-0`}>
                                 <Building className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{fran.name}</div>
                                <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{fran.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className={`py-5 px-6 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{fran.owner}</td>
                          <td className={`py-5 px-6 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{fran.location}</td>
                          <td className={`py-5 px-6 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{fran.subscribers}</td>
                          <td className={`py-5 px-6 text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{fran.share}</td>
                          <td className="py-5 px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              fran.status === 'Active' 
                                ? (isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-700 border border-green-200')
                                : (isDark ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-yellow-50 text-yellow-700 border border-yellow-200')
                            }`}>
                              {fran.status}
                            </span>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={(e) => handleViewClick(fran, e)}
                                className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-blue-400' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={(e) => handleEditClick(fran, e)}
                                className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-green-400' : 'hover:bg-gray-100 text-gray-400 hover:text-green-600'}`}
                                title="Edit Franchise"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className={`py-12 text-center ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                          No franchises found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className={`mt-6 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                  className={`px-3 py-1.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>entries</span>
              </div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                Showing <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{paginationData.startIndex}</span> to{' '}
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{paginationData.endIndex}</span> of{' '}
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{paginationData.totalItems}</span> entries
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 1
                    ? isDark
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show first page, last page, current page, and pages around current
                    if (page === 1 || page === paginationData.totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((page, index, array) => {
                    // Add ellipsis
                    const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && (
                          <span className={`px-2 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[36px] px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            currentPage === page
                              ? isDark
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-600 text-white'
                              : isDark
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === paginationData.totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === paginationData.totalPages
                    ? isDark
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
  
        {/* Add Franchise Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`rounded-xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Onboard New Franchise</h3>
                <button onClick={() => setIsModalOpen(false)} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}><XCircle className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Business Name</label>
                    <input type="text" value={newFranchise.name} onChange={(e) => setNewFranchise({...newFranchise, name: e.target.value})} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="e.g. NetLinks Pvt Ltd" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Owner Name</label>
                        <input type="text" value={newFranchise.owner} onChange={(e) => setNewFranchise({...newFranchise, owner: e.target.value})} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} />
                     </div>
                     <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Contact Email</label>
                        <input type="email" value={newFranchise.email} onChange={(e) => setNewFranchise({...newFranchise, email: e.target.value})} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} />
                     </div>
                 </div>
                 <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Operating Area / Location</label>
                    <input type="text" value={newFranchise.location} onChange={(e) => setNewFranchise({...newFranchise, location: e.target.value})} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="e.g. HSR Layout Sector 1-4" />
                 </div>
                 <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Revenue Share (%)</label>
                    <div className="flex items-center gap-4">
                       <input type="range" min="5" max="50" value={newFranchise.share} onChange={(e) => setNewFranchise({...newFranchise, share: e.target.value})} className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`} />
                       <span className={`font-bold w-12 text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>{newFranchise.share}%</span>
                    </div>
                 </div>
              </div>
              <div className={`p-4 border-t flex gap-3 justify-end rounded-b-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                <button onClick={() => setIsModalOpen(false)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`}>Cancel</button>
                <button onClick={handleAddFranchise} disabled={!newFranchise.name} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all">Create Partner Account</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Franchise Modal */}
        {isEditModalOpen && selectedFranchise && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`rounded-xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Edit Franchise</h3>
                <button onClick={() => setIsEditModalOpen(false)} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}><XCircle className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Franchise ID</label>
                    <input type="text" value={selectedFranchise.id} disabled className={`w-full p-2.5 border rounded-lg text-sm outline-none ${isDark ? 'bg-slate-800/50 border-slate-700 text-slate-500 cursor-not-allowed' : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'}`} />
                 </div>
                 <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Business Name</label>
                    <input type="text" name="name" value={editFranchise.name} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="e.g. NetLinks Pvt Ltd" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Owner Name</label>
                        <input type="text" name="owner" value={editFranchise.owner} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} />
                     </div>
                     <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Contact Email</label>
                        <input type="email" name="email" value={editFranchise.email} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} />
                     </div>
                 </div>
                 <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Operating Area / Location</label>
                    <input type="text" name="location" value={editFranchise.location} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="e.g. HSR Layout Sector 1-4" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Revenue Share (%)</label>
                        <div className="flex items-center gap-4">
                           <input type="range" min="5" max="50" name="share" value={editFranchise.share} onChange={handleEditInputChange} className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`} />
                           <span className={`font-bold w-12 text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>{editFranchise.share}%</span>
                        </div>
                     </div>
                     <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Status</label>
                        <div className="relative">
                           <select name="status" value={editFranchise.status} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 appearance-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
                              <option>Active</option>
                              <option>Pending</option>
                           </select>
                           <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
                        </div>
                     </div>
                 </div>
              </div>
              <div className={`p-4 border-t flex gap-3 justify-end rounded-b-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                <button onClick={() => setIsEditModalOpen(false)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`}>Cancel</button>
                <button onClick={handleUpdateFranchise} disabled={!editFranchise.name} className="px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all">Update Franchise</button>
              </div>
            </div>
          </div>
        )}

        {/* View Franchise Modal */}
        {isViewModalOpen && selectedFranchise && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`rounded-xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
              <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Franchise Details</h3>
                <button onClick={() => setIsViewModalOpen(false)} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}><XCircle className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 flex items-center gap-4 pb-4 border-b">
                      <div className={`w-16 h-16 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg flex-shrink-0 border border-purple-500/20`}>
                         <Building className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFranchise.name}</h4>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{selectedFranchise.id}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Owner Name</label>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFranchise.owner}</p>
                    </div>
                    <div className="col-span-2">
                      <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Contact Email</label>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFranchise.email || `${selectedFranchise.owner.toLowerCase().replace(' ', '.')}@example.com`}</p>
                    </div>
                    <div className="col-span-2">
                      <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Operating Area</label>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFranchise.location}</p>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Subscribers</label>
                      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFranchise.subscribers}</p>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Revenue Share</label>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFranchise.share}</p>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Status</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedFranchise.status === 'Active' 
                          ? (isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-700 border border-green-200')
                          : (isDark ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-yellow-50 text-yellow-700 border border-yellow-200')
                      }`}>
                        {selectedFranchise.status}
                      </span>
                    </div>
                 </div>
              </div>
              <div className={`p-4 border-t flex gap-3 justify-end rounded-b-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-500">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  export default FranchisePage;