import React from "react";

const SidebarItem = ({ icon: Icon, label, active, onClick, role, collapsed, isDark }) => {

  const getAccentColor = () => {
    if (!isDark) {
      switch (role) {
        case "admin":
          return "border-purple-600 text-purple-700 bg-purple-50";
        case "franchise":
          return "border-purple-500 text-purple-600 bg-purple-50";
        case "staff":
          return "border-green-600 text-green-700 bg-green-50";
        default:
          return "border-gray-400 text-gray-600 bg-gray-50";
      }
    }

    // 🌙 Dark mode
    switch (role) {
      case "admin":
        return "border-blue-500 text-blue-400 bg-blue-500/10";
      case "franchise":
        return "border-orange-500 text-orange-400 bg-orange-500/10";
      case "staff":
        return "border-emerald-500 text-emerald-400 bg-emerald-500/10";
      default:
        return "border-slate-600 text-slate-400 bg-slate-800";
    }
  };
  const getIconColor = () => {
    if (!active) return "";

    if (!isDark) {
      switch (role) {
        case "admin":
          return "text-purple-600";
        case "franchise":
          return "text-purple-600";
        case "staff":
          return "text-green-600";
        default:
          return "text-gray-600";
      }
    }

    // dark mode
    switch (role) {
      case "admin":
        return "text-blue-400";
      case "franchise":
        return "text-orange-400";
      case "staff":
        return "text-emerald-400";
      default:
        return "text-slate-400";
    }
  };
  const getHoverColor = () => {
    if (isDark) {
      return "hover:text-white hover:bg-slate-800";
    }

    switch (role) {
      case "admin":
        return "hover:text-purple-600 hover:bg-purple-50";
      case "franchise":
        return "hover:text-purple-600 hover:bg-purple-50";
      case "staff":
        return "hover:text-green-600 hover:bg-green-50";
      default:
        return "hover:text-gray-600 hover:bg-gray-100";
    }
  };


  const accentColor = getAccentColor();

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} gap-3
    ${collapsed ? 'px-3' : 'px-5'} py-3 text-sm font-medium rounded-xl mb-1.5
    transition-all duration-300 group relative
    ${active
          ? `${collapsed
            ? (!isDark ? 'bg-purple-100/80 text-purple-700' : 'bg-blue-500/10')
            : `border-l-4 ${accentColor} shadow-sm`
          }`
          : `text-slate-400 ${getHoverColor()}`
        }
  `}
    >

      <Icon
        className={`w-5 h-5 flex-shrink-0 transition-colors ${getIconColor()}`}
      />

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
