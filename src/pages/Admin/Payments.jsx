import React, { useState, useMemo } from 'react';
import { RefreshCw, AlertTriangle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { TRANSACTIONS_DATA } from '../../data';
import { useTheme } from '../../context/ThemeContext';

const BillingPage = () => {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredTransactions = TRANSACTIONS_DATA.filter(tx => {
    if (filter === 'All') return true;
    return tx.status === filter;
  });

  // Pagination calculations
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    return {
      paginatedTransactions,
      totalPages,
      totalItems: filteredTransactions.length,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, filteredTransactions.length)
    };
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="space-y-6">
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><RefreshCw className="w-5 h-5" /></div>
            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded">85% Ready</span>
          </div>
          <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Auto-Billing Status</h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Next cycle runs in 4d 12h</p>
          <div className={`w-full rounded-full h-1.5 mb-4 ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <button className={`w-full py-2 border rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'}`}>Run Manual Batch</button>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-500/10 text-red-400 rounded-lg"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pending Dues</h3>
          <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Users at risk of suspension</p>
          <div className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>₹2.4L</div>
          <button className="w-full py-2 border border-red-500/20 text-red-400 bg-red-500/10 rounded-lg text-sm font-medium hover:bg-red-500/20">Trigger Reminders (SMS/WA)</button>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Payment Gateways</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Razorpay</span>
              </div>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>99.2% Success</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>UPI</span>
              </div>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>98.5% Success</span>
            </div>
          </div>
          <button className={`w-full mt-8 text-sm font-medium hover:underline text-left ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>View Settlement Report →</button>
        </div>
      </div> */}

      <div className={`rounded-xl shadow-sm border flex flex-col h-full ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <div className={`p-6 border-b flex justify-between items-center flex-shrink-0 ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
          <h1
            className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
              }`}
          >
            Transactions
          </h1>

          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`border text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 appearance-none pr-8 cursor-pointer transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'}`}
            >
              <option value="All">All Transactions</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending Dues</option>
            </select>
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 p-6">
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className={`rounded-lg border overflow-hidden h-full ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
              <div className="overflow-auto h-full">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`${isDark ? 'bg-slate-800/50 border-b border-slate-800' : 'bg-gray-50 border-b border-gray-200'}`}>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Payment ID</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Customer</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Plan</th>

                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Amount</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Status</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Date</th>
                      <th className={`py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Type</th>

                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-gray-200'}`}>
                    {paginationData.paginatedTransactions.length > 0 ? (
                      paginationData.paginatedTransactions.map((tx, i) => (
                        <tr key={i} className={`transition-colors ${isDark ? 'hover:bg-slate-800/50 bg-slate-900/30' : 'hover:bg-gray-50 bg-white'}`}>
                          <td className={`py-4 px-6 font-mono text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{tx.id}</td>
                          <td className={`py-4 px-6 font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{tx.user}</td>
                          <td className={`py-4 px-6 font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{tx.amount}</td>

                          <td className={`py-4 px-6 font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{tx.amount}</td>
                          <td className="py-4 px-6">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tx.status === 'Paid'
                              ? (isDark ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'bg-green-50 text-green-700 border border-green-200')
                              : (isDark ? 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 text-yellow-700 border border-yellow-200')
                              }`}>
                              {tx.status === 'Paid' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 inline-block"></span>}
                              {tx.status}
                            </span>
                          </td>
                          <td className={`py-4 px-6  text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{tx.date}</td>
                          <td className={`py-4 px-6  text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{tx.type}</td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className={`py-12 text-center ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                          No transactions found matching your filter.
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
                          className={`min-w-[36px] px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === page
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
      </div>
    </div>
  );
};

export default BillingPage;
