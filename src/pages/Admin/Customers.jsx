import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, XCircle, ChevronDown, ChevronLeft, ChevronRight, Edit, Eye } from 'lucide-react';
import { INITIAL_SUBSCRIBERS_DATA } from '../../data';
import { useTheme } from '../../context/ThemeContext';

const SubscribersPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [newSubscriber, setNewSubscriber] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    plan: 'GigaStream 300'
  });
  const [editSubscriber, setEditSubscriber] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    plan: 'GigaStream 300',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubscriber(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubscriber = () => {
    const newId = `ACT-${Math.floor(1000 + Math.random() * 9000)}`;
    const subscriberToAdd = {
      id: newId,
      name: newSubscriber.name || 'New User',
      location: newSubscriber.location || 'Bangalore',
      plan: newSubscriber.plan,
      tech: 'Fiber To The Home',
      status: 'Active',
      due: '₹0'
    };
    setSubscribers([subscriberToAdd, ...subscribers]);
    setIsModalOpen(false);
    setNewSubscriber({
      name: '',
      mobile: '',
      email: '',
      location: '',
      plan: 'GigaStream 300'
    });
  };

  const handleViewDetail = (subscriber) => {
    navigate(`/customers-details/${subscriber.id}`, { state: { subscriber } });
  };

  const handleEditClick = (subscriber, e) => {
    e.stopPropagation();
    setSelectedSubscriber(subscriber);
    setEditSubscriber({
      name: subscriber.name,
      mobile: subscriber.mobile || '+91 9876543210',
      email: subscriber.email || `${subscriber.name.toLowerCase().replace(' ', '.')}@example.com`,
      location: subscriber.location,
      plan: subscriber.plan,
      status: subscriber.status
    });
    setIsEditModalOpen(true);
  };

  // const handleViewClick = (subscriber, e) => {
  //   e.stopPropagation();
  //   setSelectedSubscriber(subscriber);
  //   setIsViewModalOpen(true);
  // };
  const handleViewClick = (subscriber, e) => {
    e.stopPropagation(); // prevents row click issues (important in tables)
    console.log("debug");

    navigate(`/customer-details/${subscriber.id}`, {
      state: { subscriber }
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditSubscriber(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubscriber = () => {
    if (!selectedSubscriber || !editSubscriber.name) return;

    setSubscribers(subscribers.map(sub =>
      sub.id === selectedSubscriber.id
        ? {
          ...sub,
          name: editSubscriber.name,
          location: editSubscriber.location,
          plan: editSubscriber.plan,
          status: editSubscriber.status
        }
        : sub
    ));
    setIsEditModalOpen(false);
    setSelectedSubscriber(null);
    setEditSubscriber({
      name: '',
      mobile: '',
      email: '',
      location: '',
      plan: 'GigaStream 300',
      status: 'Active'
    });
  };

  // Pagination calculations
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(subscribers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSubscribers = subscribers.slice(startIndex, endIndex);

    return {
      paginatedSubscribers,
      totalPages,
      totalItems: subscribers.length,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, subscribers.length)
    };
  }, [subscribers, currentPage, itemsPerPage]);

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
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Subscribers</h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Manage users, activations, and KYC</p>
        </div>
        <div className="flex gap-3">
          <button className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-gray-300 hover:bg-gray-100 text-gray-700'}`}>
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 shadow-sm shadow-blue-900/20">
            <Plus className="w-4 h-4" /> Add Subscriber
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 p-6">
        <div className="relative mb-6 flex-shrink-0">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
          <input type="text" placeholder="Search by name, mobile, or ID..." className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} />
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <div className={`rounded-lg border overflow-hidden h-full ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
            <div className="overflow-x-auto overflow-y-auto h-full">
              <table className="w-full text-left">
                <thead>
                  <tr className={`${isDark ? 'bg-slate-800/50 border-b border-slate-800' : 'bg-gray-50 border-b border-gray-200'}`}>
                    <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Customer ID</th>
                    <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Customer Name</th>
                    <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Customer Email</th>

                    <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Plan Info</th>
                    <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Status</th>
                    {/* <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Due Amount</th> */}
                    <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider text-right ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-gray-200'}`}>
                  {paginationData.paginatedSubscribers.length > 0 ? (
                    paginationData.paginatedSubscribers.map((sub, i) => (
                      <tr
                        key={i}
                        className={`group transition-all duration-150 ${isDark ? 'hover:bg-slate-800/50 bg-slate-900/30' : 'hover:bg-gray-50 bg-white'}`}
                      >
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0 ${isDark ? 'ring-2 ring-blue-500/20' : 'ring-2 ring-blue-500/10'}`}>
                              {sub.name.charAt(0)}
                            </div>
                            <div className="min-w-0">

                              <div className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{sub.name}</div>
                              <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{sub.id} • {sub.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{sub.plan}</div>
                        </td>

                        <td className="py-5 px-6">
                          <div className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{sub.plan}</div>
                        </td>
                        <td className="py-5 px-6">
                          <div className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{sub.plan}</div>
                          <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{sub.tech}</div>
                        </td>
                        <td className="py-5 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${sub.status === 'Active'
                            ? (isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-700 border border-green-200')
                            : sub.status === 'Suspended'
                              ? (isDark ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-700 border border-red-200')
                              : (isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-gray-100 text-gray-600 border border-gray-300')
                            }`}>
                            {sub.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>}
                            {sub.status}
                          </span>
                        </td>
                        {/* <td className={`py-5 px-6 font-semibold text-sm ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{sub.due}</td> */}
                        <td className="py-5 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => handleViewClick(sub, e)}
                              className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-blue-400' : 'hover:bg-gray-100 text-gray-400 hover:text-blue-600'}`}
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handleEditClick(sub, e)}
                              className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-green-400' : 'hover:bg-gray-100 text-gray-400 hover:text-green-600'}`}
                              title="Edit Subscriber"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className={`py-12 text-center ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        No subscribers found
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
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === 1
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
                    </React.Fragment>
                  );
                })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginationData.totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === paginationData.totalPages
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

      {/* Add Subscriber Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Add New Subscriber</h3>
              <button onClick={() => setIsModalOpen(false)} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Full Name</label>
                  <input type="text" name="name" value={newSubscriber.name} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="Enter customer name" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Mobile Number</label>
                  <input type="tel" name="mobile" value={newSubscriber.mobile} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="+91" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Email</label>
                  <input type="email" name="email" value={newSubscriber.email} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="user@example.com" />
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Installation Address / Area</label>
                  <input type="text" name="location" value={newSubscriber.location} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="e.g. Indiranagar, Bangalore" />
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Select Plan</label>
                  <div className="relative">
                    <select name="plan" value={newSubscriber.plan} onChange={handleInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 appearance-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
                      <option>Basic 50 (50 Mbps)</option>
                      <option>Basic 100 (100 Mbps)</option>
                      <option>GigaStream 300 (300 Mbps)</option>
                      <option>Fiber Stream 500 (500 Mbps)</option>
                      <option>Business 1Gbps (1 Gbps)</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`p-4 border-t flex gap-3 justify-end rounded-b-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <button onClick={() => setIsModalOpen(false)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`}>Cancel</button>
              <button onClick={handleAddSubscriber} disabled={!newSubscriber.name} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all">Create Account</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subscriber Modal */}
      {isEditModalOpen && selectedSubscriber && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Edit Subscriber</h3>
              <button onClick={() => setIsEditModalOpen(false)} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Subscriber ID</label>
                  <input type="text" value={selectedSubscriber.id} disabled className={`w-full p-2.5 border rounded-lg text-sm outline-none ${isDark ? 'bg-slate-800/50 border-slate-700 text-slate-500 cursor-not-allowed' : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'}`} />
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Full Name</label>
                  <input type="text" name="name" value={editSubscriber.name} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="Enter customer name" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Mobile Number</label>
                  <input type="tel" name="mobile" value={editSubscriber.mobile} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="+91" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Email</label>
                  <input type="email" name="email" value={editSubscriber.email} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="user@example.com" />
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Installation Address / Area</label>
                  <input type="text" name="location" value={editSubscriber.location} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`} placeholder="e.g. Indiranagar, Bangalore" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Select Plan</label>
                  <div className="relative">
                    <select name="plan" value={editSubscriber.plan} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 appearance-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
                      <option>Basic 50 (50 Mbps)</option>
                      <option>Basic 100 (100 Mbps)</option>
                      <option>GigaStream 300 (300 Mbps)</option>
                      <option>Fiber Stream 500 (500 Mbps)</option>
                      <option>Business 1Gbps (1 Gbps)</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Status</label>
                  <div className="relative">
                    <select name="status" value={editSubscriber.status} onChange={handleEditInputChange} className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 appearance-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
                      <option>Active</option>
                      <option>Suspended</option>
                      <option>Inactive</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`p-4 border-t flex gap-3 justify-end rounded-b-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <button onClick={() => setIsEditModalOpen(false)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100'}`}>Cancel</button>
              <button onClick={handleUpdateSubscriber} disabled={!editSubscriber.name} className="px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all">Update Subscriber</button>
            </div>
          </div>
        </div>
      )}

      {/* View Subscriber Modal */}
      {isViewModalOpen && selectedSubscriber && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Subscriber Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 flex items-center gap-4 pb-4 border-b">
                  <div className={`w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg flex-shrink-0 ${isDark ? 'ring-2 ring-blue-500/20' : 'ring-2 ring-blue-500/10'}`}>
                    {selectedSubscriber.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedSubscriber.name}</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{selectedSubscriber.id}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Mobile Number</label>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>+91 9876543210</p>
                </div>
                <div className="col-span-2">
                  <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Email</label>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedSubscriber.name.toLowerCase().replace(' ', '.')}@example.com</p>
                </div>
                <div className="col-span-2">
                  <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Installation Address</label>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedSubscriber.location}, Bangalore</p>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Plan</label>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedSubscriber.plan}</p>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Technology</label>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedSubscriber.tech}</p>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${selectedSubscriber.status === 'Active'
                    ? (isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-700 border border-green-200')
                    : selectedSubscriber.status === 'Suspended'
                      ? (isDark ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-700 border border-red-200')
                      : (isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-gray-100 text-gray-600 border border-gray-300')
                    }`}>
                    {selectedSubscriber.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>}
                    {selectedSubscriber.status}
                  </span>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Due Amount</label>
                  <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedSubscriber.due}</p>
                </div>
              </div>
            </div>

            <div className={`p-4 border-t flex gap-3 justify-end rounded-b-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <Link
                to={`/subscribers/${selectedSubscriber.id}`}
                state={{ subscriber: selectedSubscriber }}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors
             bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              >
                View more
              </Link>


              <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-500">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribersPage;
