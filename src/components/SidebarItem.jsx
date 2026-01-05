// import React from 'react';

// const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors rounded-lg mb-1 ${
//       active 
//         ? 'text-blue-400 bg-blue-500/10 border-l-4 border-blue-500' 
//         : 'text-slate-400 hover:text-white hover:bg-slate-800'
//     }`}
//   >
//     <Icon className="w-5 h-5" />
//     {label}
//   </button>
// );

// export default SidebarItem;

// const SidebarItem = ({ icon: Icon, label, active, onClick, theme }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
//         ${
//           active
//             ? `${theme.primaryBg} text-white shadow-lg`
//             : `text-slate-400 ${theme.hoverBg}`
//         }`}
//     >
//       <Icon
//         className={`w-5 h-5 ${
//           active ? "text-white" : theme.primaryText
//         }`}
//       />
//       <span>{label}</span>
//     </button>
//   );
// };

// export default SidebarItem;


import React from "react";

const SidebarItem = ({ icon: Icon, label, active, onClick, role, collapsed }) => {
  const accentColor =
    role === "admin"
      ? "border-blue-500 text-blue-400 bg-blue-500/10"
      : "border-orange-500 text-orange-400 bg-orange-500/10";

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-3' : 'px-6'} py-3 text-sm font-medium rounded-lg mb-1 transition-colors group relative
        ${active
          ? `${collapsed ? 'bg-blue-500/10' : `border-l-4 ${accentColor}`}`
          : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`}
      title={collapsed ? label : undefined}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}
      {collapsed && active && (
        <span className={`absolute left-full ml-2 px-2 py-1 text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 ${
          role === "admin"
            ? "bg-blue-500 text-white"
            : "bg-orange-500 text-white"
        }`}>
          {label}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;
