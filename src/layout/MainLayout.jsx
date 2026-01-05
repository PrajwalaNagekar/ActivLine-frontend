import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MapPin,
  CreditCard,
  Megaphone,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import ActivlineLogo from '../logo/Logo';
import SidebarItem from '../components/SidebarItem';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import {
  adminSidebarItems,
  franchiseSidebarItems,
} from "../config/Sidebar.config";


const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop sidebar collapse

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Close sidebar when route changes (on mobile)
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  // Close sidebar on window resize if it becomes desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/subscribers')) return 'Subscribers';
    if (path.includes('/field-staff')) return 'Field Staff';
    if (path.includes('/billing')) return 'Billing Engine';
    if (path.includes('/offers')) return 'Offers & Ads';
    if (path.includes('/support')) return 'Support (WA)';
    if (path.includes('/settings')) return 'Settings';
    return 'Dashboard';
  };

  const activeTab = getActiveTab();
  const isAdminUser = isAdmin();

  const getTheme = () => {
    if (!isDark) {
      // Light Mode - Purple Theme for Everyone
      return {
        primary: "purple",
        primaryBg: "bg-purple-600",
        primaryText: "text-purple-600",
        hoverBg: "hover:bg-purple-50",
        activeBg: "bg-purple-50",
        ring: "ring-purple-500/20",
        border: "border-purple-200",
        sidebarBorder: "border-r border-purple-100",
        sidebarBg: "bg-white/80 backdrop-blur-xl",
      };
    }

    // Dark Mode - Keep original role-based colors or enhance them
    return {
      primary: isAdminUser ? "blue" : "orange",
      primaryBg: isAdminUser ? "bg-blue-500" : "bg-orange-500",
      primaryText: isAdminUser ? "text-blue-400" : "text-orange-400",
      hoverBg: isAdminUser ? "hover:bg-blue-500/10" : "hover:bg-orange-500/10",
      activeBg: isAdminUser ? "bg-blue-500/10" : "bg-orange-500/10",
      ring: isAdminUser ? "ring-blue-500/20" : "ring-orange-500/20",
      border: isAdminUser ? "border-blue-500/20" : "border-orange-500/20",
      sidebarBorder: "border-r border-slate-800",
      sidebarBg: "bg-slate-900",
    };
  };

  const theme = getTheme();

  // Define sidebar items based on role
  // const adminSidebarItems = [
  //   { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', key: 'Dashboard' },
  //   { icon: Users, label: 'Subscribers', path: '/subscribers', key: 'Subscribers' },
  //   { icon: MapPin, label: 'Field Staff', path: '/field-staff', key: 'Field Staff' },
  //   { icon: CreditCard, label: 'Billing Engine', path: '/billing', key: 'Billing Engine' },
  //   { icon: Megaphone, label: 'Offers & Ads', path: '/offers', key: 'Offers & Ads' },
  //   { icon: MessageSquare, label: 'Support (WA)', path: '/support', key: 'Support (WA)' },
  //   { icon: Settings, label: 'Settings', path: '/settings', key: 'Settings' },
  // ];

  // const franchiseSidebarItems = [
  //   { icon: LayoutDashboard, label: 'Dashboard', path: '/franchise-dashboard', key: 'Dashboard' },
  //   { icon: Users, label: 'My Subscribers', path: '/my-subscribers', key: 'Subscribers' },
  //   { icon: MapPin, label: 'Local Staff', path: '/local-staff', key: 'Field Staff' },
  //   { icon: Megaphone, label: 'Collections', path: '/collections', key: 'Offers & Ads' },
  //   { icon: MessageSquare, label: 'Zone Support', path: '/zone-support', key: 'Support (WA)' },
  //   { icon: Settings, label: 'Profile', path: '/profile', key: 'Settings' },
  // ];

  const sidebarItems = isAdmin() ? adminSidebarItems : franchiseSidebarItems;
  const isItemActive = (item) =>
    item.paths.some((path) => location.pathname.startsWith(path));

  const userDisplayName = user?.name || 'User';
  const userRole = user?.role === 'admin' ? 'Super Admin' : 'Franchise Admin';

  return (
    <div className={`flex min-h-screen font-sans ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 ${sidebarCollapsed ? 'w-20' : 'w-72'
          } flex flex-col flex-shrink-0 z-50 transform transition-all duration-300 ease-cubic-bezier(0.4, 0, 0.2, 1) ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } ${theme.sidebarBg} ${theme.sidebarBorder}`}
      >
        <div className={`h-20 flex items-center justify-between px-6 border-b ${isDark ? 'border-slate-800' : 'border-purple-100/50'}`}>
          {!sidebarCollapsed && (
            <ActivlineLogo className={`h-10 w-auto ${isDark ? 'text-white' : 'text-gray-900'}`} />
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={toggleSidebarCollapse}
              className={`hidden md:flex p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={closeSidebar}
              className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.key}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav> */}

        {/* <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.key}
              onClick={() => navigate(item.path)}
              theme={theme}
            />
          ))}
        </nav> */}

        {/* <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.key}
              onClick={() => navigate(item.path)}
              role={user?.role}
            />
          ))}
        </nav> */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={isItemActive(item)}
              onClick={() => {
                navigate(item.paths[0]);
                closeSidebar();
              }}
              role={user?.role}
              collapsed={sidebarCollapsed}
              isDark={isDark} // Pass theme state
            />
          ))}
        </nav>


        <div className={`${sidebarCollapsed ? 'p-2' : 'p-4'} border-t mt-auto ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
          {!sidebarCollapsed && (
            <div className={`rounded-xl p-3 mb-3 border ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-gray-100 border-gray-300'}`}>
              <p className={`text-xs mb-1 truncate ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Welcome, <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{userDisplayName}</span></p>
              <p className={`text-[10px] font-medium uppercase tracking-wide truncate ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>You are signed in as {userRole}</p>
            </div>
          )}

          <button
            onClick={handleSignOut}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} gap-3 ${sidebarCollapsed ? 'p-2' : 'p-3'} rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-gray-100 text-gray-700'}`}
            title={sidebarCollapsed ? "Sign Out" : undefined}
          >
            {!sidebarCollapsed ? (
              <>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold flex-shrink-0 ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`}>
                    {userDisplayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden min-w-0 flex-1">
                    <p className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{userDisplayName}</p>
                    <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{userRole}</p>
                  </div>
                </div>
                <LogOut className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-slate-400' : 'text-gray-600'}`} />
              </>
            ) : (
              <LogOut className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-gray-700'}`} />
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 md:ml-0">
        {/* Header */}
        <header className={`h-20 border-b flex justify-between items-center px-4 md:px-8 shadow-sm z-30 flex-shrink-0 backdrop-blur-md sticky top-0 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/80 border-purple-100'}`}>
          <button
            onClick={toggleSidebar}
            className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative group">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors w-4 h-4 ${isDark ? 'text-slate-500 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'}`} />
              <input
                type="text"
                placeholder="Search users, tickets..."
                className={`w-full pl-10 pr-4 py-2 border rounded-full text-sm outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all ${isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <button className={`relative p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
              <Bell className="w-5 h-5" />
              <span className={`absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 ${isDark ? 'border-slate-900' : 'border-white'}`}></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className={`flex-1 p-4 md:p-8 ${isDark ? 'bg-slate-950' : 'bg-gray-100'}`}>
          <div className="max-w-7xl mx-auto">
            <Breadcrumb />
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
