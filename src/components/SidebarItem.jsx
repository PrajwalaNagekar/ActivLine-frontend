import React from 'react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors rounded-lg mb-1 ${
      active 
        ? 'text-blue-400 bg-blue-500/10 border-l-4 border-blue-500' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
);

export default SidebarItem;