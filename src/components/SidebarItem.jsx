import React from "react";

const SidebarItem = ({ icon: Icon, label, active, onClick, role, collapsed, isDark }) => {

  const getAccentColor = () => {
    if (!isDark) {
      return role === "admin"
        ? "border-purple-600 text-purple-700 bg-purple-50"
        : "border-purple-500 text-purple-600 bg-purple-50";
    }
    // Dark mode fallback to original role colors
    return role === "admin"
      ? "border-blue-500 text-blue-400 bg-blue-500/10"
      : "border-orange-500 text-orange-400 bg-orange-500/10";
  };

  const accentColor = getAccentColor();

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-3' : 'px-5'} py-3 text-sm font-medium rounded-xl mb-1.5 transition-all duration-300 group relative
        ${active
          ? `${collapsed ? (!isDark ? 'bg-purple-100/80 text-purple-700' : 'bg-blue-500/10') : `border-l-4 ${accentColor} shadow-sm`}`
          : `text-slate-400 ${!isDark ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-white hover:bg-slate-800'}`
        }`}
      title={collapsed ? label : undefined}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${active && !isDark ? 'text-purple-600' : ''}`} />
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}
      {collapsed && active && (
        <span className={`absolute left-full ml-2 px-2 py-1 text-xs font-medium rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 ${!isDark
            ? "bg-purple-600 text-white"
            : (role === "admin" ? "bg-blue-500 text-white" : "bg-orange-500 text-white")
          }`}>
          {label}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;
