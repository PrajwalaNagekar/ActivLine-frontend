// // // // import React, { useState, useEffect } from 'react';
// // // // import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// // // // import {
// // // //   LayoutDashboard,
// // // //   Users,
// // // //   User,
// // // //   MapPin,
// // // //   CreditCard,
// // // //   Megaphone,
// // // //   MessageSquare,
// // // //   Settings,
// // // //   Bell,
// // // //   Search,
// // // //   Menu,
// // // //   X,
// // // //   LogOut,
// // // //   ChevronLeft,
// // // //   ChevronRight,
// // // // } from 'lucide-react';
// // // // import ActivlineLogo from '../logo/Logo';
// // // // import SidebarItem from '../components/SidebarItem';
// // // // import Breadcrumb from '../components/Breadcrumb';
// // // // import { useAuth } from '../context/AuthContext';
// // // // import { useTheme } from '../context/ThemeContext';
// // // // import ThemeToggle from '../components/ThemeToggle';
// // // // import {
// // // //   adminSidebarItems,
// // // //   franchiseSidebarItems,
// // // //   staffSidebarItems,
// // // // } from "../config/Sidebar.config";


// // // // const MainLayout = () => {
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();
// // // //   const { user, logout, isAdmin } = useAuth();
// // // //   const { isDark } = useTheme();
// // // //   const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar
// // // //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop sidebar collapse

// // // //   const handleSignOut = async () => {
// // // //   await logout();   // 🔥 now calls backend
// // // //   navigate("/login");
// // // // };


// // // //   const toggleSidebar = () => {
// // // //     setSidebarOpen(!sidebarOpen);
// // // //   };

// // // //   const closeSidebar = () => {
// // // //     setSidebarOpen(false);
// // // //   };

// // // //   const toggleSidebarCollapse = () => {
// // // //     setSidebarCollapsed(!sidebarCollapsed);
// // // //   };

// // // //   // Close sidebar when route changes (on mobile)
// // // //   useEffect(() => {
// // // //     closeSidebar();
// // // //   }, [location.pathname]);

// // // //   // Close sidebar on window resize if it becomes desktop size
// // // //   useEffect(() => {
// // // //     const handleResize = () => {
// // // //       if (window.innerWidth >= 768) {
// // // //         setSidebarOpen(false);
// // // //       }
// // // //     };
// // // //     window.addEventListener('resize', handleResize);
// // // //     return () => window.removeEventListener('resize', handleResize);
// // // //   }, []);


// // // //   const getActiveTab = () => {
// // // //     const path = location.pathname;
// // // //     if (path.includes('/dashboard')) return 'Dashboard';
// // // //     if (path.includes('/subscribers')) return 'Subscribers';
// // // //     if (path.includes('/field-staff')) return 'Field Staff';
// // // //     if (path.includes('/billing')) return 'Billing Engine';
// // // //     if (path.includes('/offers')) return 'Offers & Ads';
// // // //     if (path.includes('/support')) return 'Support (WA)';
// // // //     if (path.includes('/settings')) return 'Settings';
// // // //     return 'Dashboard';
// // // //   };

// // // //   const activeTab = getActiveTab();
// // // //   const isAdminUser = isAdmin() || user?.role === 'SUPER_ADMIN';
// // // // const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

// // // //   const getTheme = () => {
// // // //     if (!isDark) {
// // // //       // Light Mode - Purple Theme for Everyone
// // // //       return {
// // // //         primary: "purple",
// // // //         primaryBg: "bg-purple-600",
// // // //         primaryText: "text-purple-600",
// // // //         hoverBg: "hover:bg-purple-50",
// // // //         activeBg: "bg-purple-50",
// // // //         ring: "ring-purple-500/20",
// // // //         border: "border-purple-200",
// // // //         sidebarBorder: "border-r border-purple-100",
// // // //         sidebarBg: "bg-white/80 backdrop-blur-xl",
// // // //       };
// // // //     }

// // // //     // Dark Mode - Keep original role-based colors or enhance them
// // // //     return {
// // // //       primary: isAdminUser ? "blue" : "orange",
// // // //       primaryBg: isAdminUser ? "bg-blue-500" : "bg-orange-500",
// // // //       primaryText: isAdminUser ? "text-blue-400" : "text-orange-400",
// // // //       hoverBg: isAdminUser ? "hover:bg-blue-500/10" : "hover:bg-orange-500/10",
// // // //       activeBg: isAdminUser ? "bg-blue-500/10" : "bg-orange-500/10",
// // // //       ring: isAdminUser ? "ring-blue-500/20" : "ring-orange-500/20",
// // // //       border: isAdminUser ? "border-blue-500/20" : "border-orange-500/20",
// // // //       sidebarBorder: "border-r border-slate-800",
// // // //       sidebarBg: "bg-slate-900",
// // // //     };
// // // //   };

// // // //   const theme = getTheme();

// // // //   const sidebarItemsMap = {
// // // //     admin: adminSidebarItems,
// // // //     SUPER_ADMIN: adminSidebarItems,
// // // //     franchise: franchiseSidebarItems,
// // // //     staff: staffSidebarItems,
// // // //     admin_staff: staffSidebarItems,
// // // //   };

// // // //   const sidebarItems = sidebarItemsMap[user?.role] || []; const isItemActive = (item) =>
// // // //     item.paths.some((path) => location.pathname.startsWith(path));

// // // //   const userDisplayName = user?.name || 'User';
// // // //   const userRole =
// // // //     user?.role === 'admin' || user?.role === 'SUPER_ADMIN'
// // // //       ? 'Super Admin'
// // // //       : user?.role === 'franchise'
// // // //         ? 'Franchise Admin'
// // // //         : ['staff', 'admin_staff'].includes(user?.role)
// // // //           ? 'Staff'
// // // //           : 'User';

// // // //   return (
// // // //     <div className={`flex min-h-screen font-sans ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
// // // //       {/* Mobile Overlay */}
// // // //       {sidebarOpen && (
// // // //         <div
// // // //           className="fixed inset-0 bg-black/50 z-40 md:hidden"
// // // //           onClick={closeSidebar}
// // // //         />
// // // //       )}

      

// // // //       {/* Sidebar */}
// // // //       <aside
// // // //         className={`fixed md:sticky md:top-0 md:h-screen inset-y-0 left-0 ${sidebarCollapsed ? 'w-20' : 'w-72'
// // // //           } flex flex-col flex-shrink-0 z-50 transform transition-all duration-300 ease-cubic-bezier(0.4, 0, 0.2, 1) ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
// // // //           } ${theme.sidebarBg} ${theme.sidebarBorder}`}
// // // //       >
        
// // // //         <div className={`h-20 flex items-center justify-between px-6 border-b ${isDark ? 'border-slate-800' : 'border-purple-100/50'}`}>
// // // //           {!sidebarCollapsed && (
// // // //             <ActivlineLogo className={`h-20 ml-2 w-auto ${isDark ? 'text-white' : 'text-gray-900'}`} />
// // // //           )}
// // // //           <div className="flex items-center gap-2 ml-auto">
// // // //             <button
// // // //               onClick={toggleSidebarCollapse}
// // // //               className={`hidden md:flex p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
// // // //               aria-label="Toggle sidebar"
// // // //             >
// // // //               {sidebarCollapsed ? (
// // // //                 <ChevronRight className="w-5 h-5" />
// // // //               ) : (
// // // //                 <ChevronLeft className="w-5 h-5" />
// // // //               )}
// // // //             </button>
// // // //             <button
// // // //               onClick={closeSidebar}
// // // //               className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
// // // //               aria-label="Close sidebar"
// // // //             >
// // // //               <X className="w-5 h-5" />
// // // //             </button>
// // // //           </div>
// // // //         </div>


// // // //         {/* <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
// // // //           {sidebarItems.map((item) => (
// // // //             <SidebarItem
// // // //               key={item.key}
// // // //               icon={item.icon}
// // // //               label={item.label}
// // // //               active={activeTab === item.key}
// // // //               onClick={() => navigate(item.path)}
// // // //             />
// // // //           ))}
// // // //         </nav> */}

// // // //         {/* <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
// // // //           {sidebarItems.map((item) => (
// // // //             <SidebarItem
// // // //               key={item.key}
// // // //               icon={item.icon}
// // // //               label={item.label}
// // // //               active={activeTab === item.key}
// // // //               onClick={() => navigate(item.path)}
// // // //               theme={theme}
// // // //             />
// // // //           ))}
// // // //         </nav> */}

// // // //         {/* <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
// // // //           {sidebarItems.map((item) => (
// // // //             <SidebarItem
// // // //               key={item.key}
// // // //               icon={item.icon}
// // // //               label={item.label}
// // // //               active={activeTab === item.key}
// // // //               onClick={() => navigate(item.path)}
// // // //               role={user?.role}
// // // //             />
// // // //           ))}
// // // //         </nav> */}
// // // //         <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
// // // //           {sidebarItems.map((item) => (
// // // //             <SidebarItem
// // // //               key={item.key}
// // // //               icon={item.icon}
// // // //               label={item.label}
// // // //               active={isItemActive(item)}
// // // //               onClick={() => {
// // // //                 navigate(item.paths[0]);
// // // //                 closeSidebar();
// // // //               }}
// // // //               role={user?.role}
// // // //               collapsed={sidebarCollapsed}
// // // //               isDark={isDark} // Pass theme state
// // // //             />
// // // //           ))}
// // // //         </nav>

// // // // {/* Sidebar Actions */}
// // // // <div
// // // //   className={`flex ${sidebarCollapsed ? 'flex-col items-center' : 'items-center justify-between'}
// // // //   gap-2 mb-4`}
// // // // >
// // // //   {/* Dark Mode */}
// // // //   <button
// // // //     className={`p-2 rounded-lg transition-colors
// // // //       ${isDark
// // // //         ? 'hover:bg-slate-800 text-slate-300'
// // // //         : 'hover:bg-gray-100 text-gray-700'
// // // //       }`}
// // // //   >
// // // //     <ThemeToggle />
// // // //   </button>

// // // //   {/* Notification Bell */}
// // // //   <button
// // // //     onClick={() => {
// // // //       if (user?.role === 'admin' || user?.role === 'SUPER_ADMIN') navigate('/admin-notifications');
// // // //       else if (user?.role === 'franchise') navigate('/franchise-notifications');
// // // //       else if (user?.role === 'staff') navigate('/staff-notifications');
// // // //     }}
// // // //     className={`relative p-2 rounded-lg transition-colors
// // // //       ${isDark
// // // //         ? 'hover:bg-slate-800 text-slate-300'
// // // //         : 'hover:bg-gray-100 text-gray-700'
// // // //       }`}
// // // //   >
// // // //     <Bell className="w-5 h-5" />
// // // //     <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
// // // //   </button>
// // // // </div>

// // // //         <div className={`${sidebarCollapsed ? 'p-2' : 'p-4'} border-t mt-auto ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
// // // //           {!sidebarCollapsed && (
// // // //             <div className={`rounded-xl p-3 mb-3 border ${isDark ? 'bg-slate-800/50 border-slate-700/50' : 'bg-gray-100 border-gray-300'}`}>
// // // //               <p className={`text-xs mb-1 truncate ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Welcome, <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{userDisplayName}</span></p>
// // // //               <p className={`text-[10px] font-medium uppercase tracking-wide truncate ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>You are signed in as {userRole}</p>
// // // //             </div>
// // // //           )}

          

// // // // <div className="relative">
// // // //   {/* USER BUTTON */}
// // // //   <button
// // // //     onClick={() => setIsUserMenuOpen((prev) => !prev)}
// // // //     className={`w-full flex items-center ${
// // // //       sidebarCollapsed ? 'justify-center' : 'justify-between'
// // // //     } gap-3 ${sidebarCollapsed ? 'p-2' : 'p-3'} rounded-lg transition-colors
// // // //     ${isDark 
// // // //       ? `hover:bg-slate-800 text-slate-300 ${isUserMenuOpen ? 'bg-slate-800 text-white' : ''}` 
// // // //       : `hover:bg-gray-100 text-gray-700 ${isUserMenuOpen ? 'bg-gray-100 text-gray-900' : ''}`
// // // //     }`}
// // // //   >
// // // //     <div className="flex items-center gap-3 min-w-0">
// // // //       <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold
// // // //         ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-200 border-gray-300'}`}>
// // // //         {userDisplayName.charAt(0).toUpperCase()}
// // // //       </div>

// // // //       {!sidebarCollapsed && (
// // // //         <div className="text-left">
// // // //           <p className="text-sm font-bold truncate">{userDisplayName}</p>
// // // //           <p className="text-xs truncate">{userRole}</p>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   </button>

  

// // // //   {/* DROPDOWN */}
// // // //   {isUserMenuOpen && !sidebarCollapsed && (
// // // //     <div
// // // //       className={`absolute bottom-full left-0 w-full mb-2 rounded-xl shadow-xl border z-50 overflow-hidden
// // // //       ${isDark ? 'bg-slate-900 border-slate-700 shadow-black/50' : 'bg-white border-gray-200 shadow-gray-200'}`}
// // // //     >
// // // //       <button
// // // //         onClick={() => {
// // // //           navigate('/profile');
// // // //           setIsUserMenuOpen(false);
// // // //         }}
// // // //         className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors
// // // //         ${isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'}`}
// // // //       >
// // // //         <User className="w-4 h-4" />
// // // //         Profile
// // // //       </button>

// // // //       <button
// // // //         onClick={handleSignOut}
// // // //         className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors
// // // //         ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
// // // //       >
// // // //         <LogOut className="w-4 h-4" />
// // // //         Logout
// // // //       </button>
// // // //     </div>
// // // //   )}
// // // // </div>

// // // //         </div>
// // // //       </aside>

// // // //       {/* Main Content */}
// // // //       <main className="flex-1 flex flex-col min-w-0 md:ml-0">
// // // //         {/* Header */}
// // // //         <header className={`h-20 border-b flex justify-between items-center px-4 md:px-8 shadow-sm z-30 flex-shrink-0 backdrop-blur-md sticky top-0 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/80 border-purple-100'}`}>
// // // //           <button
// // // //             onClick={toggleSidebar}
// // // //             className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
// // // //             aria-label="Toggle sidebar"
// // // //           >
// // // //             <Menu className="w-6 h-6" />
// // // //           </button>

// // // //           {/* <div className="flex-1 max-w-lg hidden md:block">
// // // //             <div className="relative group">
// // // //               <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors w-4 h-4 ${isDark ? 'text-slate-500 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'}`} />
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search users, tickets..."
// // // //                 className={`w-full pl-10 pr-4 py-2 border rounded-full text-sm outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all ${isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
// // // //               />
// // // //             </div>
// // // //           </div> */}

         
// // // //         </header>

// // // //         {/* Content Area */}
// // // //         {/* <div className={`flex-1 p-4 md:p-8 ${isDark ? 'bg-slate-950' : 'bg-gray-100'}`}>
// // // //           <div className="max-w-7xl mx-auto">
// // // //             <Breadcrumb />
// // // //             <Outlet />
// // // //           </div>
// // // //         </div> */}

// // // //         <div className={`flex-1 p-4 md:p-8 ${isDark ? 'bg-slate-950' : 'bg-gray-100'}`}>
// // // //   <Breadcrumb />
// // // //   <Outlet />
// // // // </div>

// // // //       </main>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MainLayout;


// // // import React, { useState, useEffect } from "react";
// // // import { Outlet, useNavigate, useLocation } from "react-router-dom";
// // // import {
// // //   Menu,
// // //   X,
// // //   Bell,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   User,
// // //   LogOut,
// // // } from "lucide-react";

// // // import ActivlineLogo from "./logo.jsx";
// // // import SidebarItem from "../components/SidebarItem";
// // // import Breadcrumb from "../components/Breadcrumb";
// // // import ThemeToggle from "../components/ThemeToggle";

// // // import { useAuth } from "../context/AuthContext";
// // // import { useTheme } from "../context/ThemeContext";

// // // import {
// // //   adminSidebarItems,
// // //   franchiseSidebarItems,
// // //   staffSidebarItems,
// // // } from "../config/Sidebar.config";

// // // const MainLayout = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const { user, logout } = useAuth();
// // //   const { isDark } = useTheme();

// // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
// // //   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
// // //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// // //   /* ---------------- EFFECTS ---------------- */
// // //   useEffect(() => {
// // //   const onResize = () => {
// // //     const mobile = window.innerWidth < 768;
// // //     setIsMobile(mobile);

// // //     if (mobile) {
// // //       setSidebarCollapsed(false); // reset on mobile
// // //     }
// // //   };

// // //   onResize(); // IMPORTANT
// // //   window.addEventListener("resize", onResize);
// // //   return () => window.removeEventListener("resize", onResize);
// // // }, []);


// // //   useEffect(() => {
// // //     setSidebarOpen(false);
// // //   }, [location.pathname]);

// // //   /* ---------------- HELPERS ---------------- */
// // //   const handleLogout = async () => {
// // //     await logout();
// // //     navigate("/login");
// // //   };

// // //   const handleNotificationClick = () => {
// // //     const role = user?.role;
// // //     if (role === "admin" || role === "SUPER_ADMIN") {
// // //       navigate("/admin-notifications");
// // //     } else if (role === "franchise") {
// // //       navigate("/franchise-notifications");
// // //     } else if (role === "staff" || role === "admin_staff") {
// // //       navigate("/staff-notifications");
// // //     }
// // //   };

// // //   const sidebarItemsMap = {
// // //     admin: adminSidebarItems,
// // //     SUPER_ADMIN: adminSidebarItems,
// // //     franchise: franchiseSidebarItems,
// // //     staff: staffSidebarItems,
// // //     admin_staff: staffSidebarItems,
// // //   };

// // //   const sidebarItems = sidebarItemsMap[user?.role] || [];

// // //   const isItemActive = (item) =>
// // //     item.paths.some((p) => location.pathname.startsWith(p));

// // //   // 🔑 KEY LOGIC
// // // const collapsedView = sidebarCollapsed;




// // //   /* ---------------- UI ---------------- */
// // //   return (
// // //     <div
// // //       className={`flex min-h-screen ${
// // //         isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-900"
// // //       }`}
// // //     >
// // //       {/* MOBILE OVERLAY */}
// // //       {sidebarOpen && isMobile && (
// // //         <div
// // //           className="fixed inset-0 bg-black/50 z-40"
// // //           onClick={() => setSidebarOpen(false)}
// // //         />
// // //       )}

// // //       {/* SIDEBAR */}
// // //       <aside
// // //        className={`fixed md:sticky top-0 h-screen left-0 z-50
// // //         ${collapsedView ? "w-20" : "w-72"}
// // //         transform transition-all duration-300
// // //         ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// // //         ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}
// // //         border-r flex flex-col`}
// // //       >
// // //         {/* LOGO HEADER */}
// // //         <div
// // //           className={`h-20 flex items-center border-b transition-all duration-300
// // //           ${collapsedView ? "justify-center pl-3 gap-1" : "justify-between px-6"}
// // //           ${isDark ? "border-slate-800" : "border-gray-200"}`}
// // //         >
// // //           <ActivlineLogo collapsed={collapsedView} />

// // //           {!isMobile && (
// // //             <button
// // //               onClick={() => setSidebarCollapsed((p) => !p)}
// // //               className={`p-1.5 rounded-lg transition shrink-0
// // //               ${
// // //                 isDark
// // //                   ? "text-slate-400 hover:bg-slate-800 hover:text-white"
// // //                   : "text-gray-600 hover:bg-gray-100"
// // //               }`}
// // //             >
// // //               {sidebarCollapsed ? (
// // //                 <ChevronRight size={18} />
// // //               ) : (
// // //                 <ChevronLeft size={18} />
// // //               )}
// // //             </button>
// // //           )}

// // //           {isMobile && (
// // //             <button
// // //               onClick={() => setSidebarOpen(false)}
// // //               className="p-2 rounded-lg md:hidden"
// // //             >
// // //               <X />
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* NAV */}
// // //         <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
// // //           {sidebarItems.map((item) => (
// // //             <SidebarItem
// // //               key={item.key}
// // //               icon={item.icon}
// // //               label={item.label}
// // //               active={isItemActive(item)}
// // //               collapsed={collapsedView}
// // //               onClick={() => {
// // //                 navigate(item.paths[0]);
// // //                 setSidebarOpen(false);
// // //               }}
// // //               role={user?.role}
// // //               isDark={isDark}
// // //             />
// // //           ))}
// // //         </nav>

// // //         {/* FOOTER */}
// // //         <div
// // //           className={`p-4 border-t ${
// // //             isDark ? "border-slate-800 bg-slate-900" : "border-gray-200 bg-white"
// // //           }`}
// // //         >
// // //           {!collapsedView && (
// // //             <div className="relative">
// // //               <button
// // //                 onClick={() => setIsUserMenuOpen((p) => !p)}
// // //                 className={`w-full flex items-center gap-3 p-3 rounded-lg
// // //                 ${isDark ? "hover:bg-slate-800" : "hover:bg-gray-100"}`}
// // //               >
// // //                 <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold">
// // //                   {user?.name?.[0]?.toUpperCase() || "U"}
// // //                 </div>
// // //                 <div className="text-left">
// // //                   <p className="text-sm font-bold">{user?.name}</p>
// // //                   <p className="text-xs">{user?.role}</p>
// // //                 </div>
// // //               </button>

// // //               {isUserMenuOpen && (
// // //                 <div
// // //                   className={`absolute bottom-full mb-2 w-full rounded-xl border shadow-lg
// // //                   ${
// // //                     isDark
// // //                       ? "bg-slate-900 border-slate-700"
// // //                       : "bg-white border-gray-200"
// // //                   }`}
// // //                 >
// // //                   <button
// // //                     onClick={() => navigate("/profile")}
// // //                     className="w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-gray-100"
// // //                   >
// // //                     <User size={16} />
// // //                     Profile
// // //                   </button>
// // //                   <button
// // //                     onClick={handleLogout}
// // //                     className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-500 hover:bg-red-50"
// // //                   >
// // //                     <LogOut size={16} />
// // //                     Logout
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </aside>

// // //       {/* MAIN */}
// // //       <main className="flex-1 flex flex-col">
// // //         <header
// // //           className={`h-20 flex items-center px-4 border-b sticky top-0 z-30
// // //           ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}
// // //         >
// // //           <button
// // //             onClick={() => setSidebarOpen(true)}
// // //             className="md:hidden p-2"
// // //           >
// // //             <Menu />
// // //           </button>
// // //           <div className="flex items-center gap-4 ml-auto">
// // //             <ThemeToggle />
// // //             <button
// // //               onClick={handleNotificationClick}
// // //               className="relative p-2 rounded-lg"
// // //             >
// // //               <Bell size={20} />
// // //               <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
// // //             </button>
// // //           </div>
// // //         </header>

// // //         <div className="flex-1 p-4 md:p-8">
// // //           <Breadcrumb />
// // //           <Outlet />
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default MainLayout;

// // import React, { useState, useEffect } from "react";
// // import { Outlet, useNavigate, useLocation } from "react-router-dom";
// // import {
// //   Menu,
// //   X,
// //   Bell,
// //   ChevronLeft,
// //   ChevronRight,
// //   User,
// //   LogOut,
// // } from "lucide-react";

// // import ActivlineLogo from "./logo.jsx";
// // import SidebarItem from "../components/SidebarItem";
// // import Breadcrumb from "../components/Breadcrumb";
// // import ThemeToggle from "../components/ThemeToggle";

// // import { useAuth } from "../context/AuthContext";
// // import { useTheme } from "../context/ThemeContext";

// // import {
// //   adminSidebarItems,
// //   franchiseSidebarItems,
// //   staffSidebarItems,
// // } from "../config/Sidebar.config";

// // const MainLayout = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const { user, logout } = useAuth();
// //   const { isDark } = useTheme();

// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
// //   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// //   /* ---------------- EFFECTS ---------------- */
// //   useEffect(() => {
// //     const onResize = () => {
// //       const mobile = window.innerWidth < 768;
// //       setIsMobile(mobile);
// //       if (mobile) setSidebarCollapsed(false);
// //     };

// //     onResize();
// //     window.addEventListener("resize", onResize);
// //     return () => window.removeEventListener("resize", onResize);
// //   }, []);

// //   useEffect(() => {
// //     setSidebarOpen(false);
// //   }, [location.pathname]);

// //   /* ---------------- HELPERS ---------------- */
// //   const handleLogout = async () => {
// //     await logout();
// //     navigate("/login");
// //   };

// //   const handleNotificationClick = () => {
// //     const role = user?.role;
// //     if (role === "admin" || role === "SUPER_ADMIN") {
// //       navigate("/admin-notifications");
// //     } else if (role === "franchise") {
// //       navigate("/franchise-notifications");
// //     } else {
// //       navigate("/staff-notifications");
// //     }
// //   };

// //   const sidebarItemsMap = {
// //     admin: adminSidebarItems,
// //     SUPER_ADMIN: adminSidebarItems,
// //     franchise: franchiseSidebarItems,
// //     staff: staffSidebarItems,
// //     admin_staff: staffSidebarItems,
// //   };

// //   const sidebarItems = sidebarItemsMap[user?.role] || [];
// //   const isItemActive = (item) =>
// //     item.paths.some((p) => location.pathname.startsWith(p));

// //   const collapsedView = sidebarCollapsed;

// //   /* ---------------- UI ---------------- */
// //   return (
// //     <div
// //       className={`flex min-h-screen ${
// //         isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-900"
// //       }`}
// //     >
// //       {/* MOBILE OVERLAY */}
// //       {sidebarOpen && isMobile && (
// //         <div
// //           className="fixed inset-0 bg-black/50 z-40"
// //           onClick={() => setSidebarOpen(false)}
// //         />
// //       )}

// //       {/* SIDEBAR */}
// //       <aside
// //         className={`fixed md:sticky top-0 h-screen left-0 z-50
// //         ${collapsedView ? "w-20" : "w-72"}
// //         transition-all duration-300
// //         ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// //         ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}
// //         border-r flex flex-col`}
// //       >
// //         {/* LOGO HEADER */}
// //         <div
// //           className={`h-20 flex items-center border-b
// //           ${collapsedView ? "justify-center" : "justify-between px-6"}
// //           ${isDark ? "border-slate-800" : "border-gray-200"}`}
// //         >
// //           <ActivlineLogo collapsed={collapsedView} />

// //           {!isMobile && (
// //             <button
// //               onClick={() => setSidebarCollapsed((p) => !p)}
// //               className="p-1.5 rounded-lg hover:bg-slate-800"
// //             >
// //               {sidebarCollapsed ? (
// //                 <ChevronRight size={18} />
// //               ) : (
// //                 <ChevronLeft size={18} />
// //               )}
// //             </button>
// //           )}

// //           {isMobile && (
// //             <button onClick={() => setSidebarOpen(false)}>
// //               <X />
// //             </button>
// //           )}
// //         </div>

// //         {/* NAV */}
// //         <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
// //           {sidebarItems.map((item) => (
// //             <SidebarItem
// //               key={item.key}
// //               icon={item.icon}
// //               label={item.label}
// //               active={isItemActive(item)}
// //               collapsed={collapsedView}
// //               onClick={() => {
// //                 navigate(item.paths[0]);
// //                 setSidebarOpen(false);
// //               }}
// //               role={user?.role}
// //               isDark={isDark}
// //             />
// //           ))}
// //         </nav>

// //         {/* FOOTER */}
// //         {!collapsedView && (
// //           <div className="p-4 border-t">
// //             <button
// //               onClick={() => setIsUserMenuOpen((p) => !p)}
// //               className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800"
// //             >
// //               <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
// //                 {user?.name?.[0]?.toUpperCase()}
// //               </div>
// //               <div className="text-left">
// //                 <p className="text-sm font-semibold">{user?.name}</p>
// //                 <p className="text-xs opacity-70">{user?.role}</p>
// //               </div>
// //             </button>

// //             {isUserMenuOpen && (
// //               <div className="mt-2 rounded-xl border overflow-hidden">
// //                 <button
// //                   onClick={() => navigate("/profile")}
// //                   className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
// //                 >
// //                   <User size={16} /> Profile
// //                 </button>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-red-50"
// //                 >
// //                   <LogOut size={16} /> Logout
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </aside>

// //       {/* MAIN */}
// //       <main className="flex-1 flex flex-col">
// //         {/* 🔥 TOP BAR */}
// //         <header
// //           className={`sticky top-0 z-30
// //           h-24 px-6 flex items-center
// //           rounded-b-2xl shadow-md
// //           backdrop-blur-md
// //           ${
// //             isDark
// //               ? "bg-slate-900/90 border-slate-800"
// //               : "bg-white/90 border-gray-200"
// //           } border-b`}
// //         >
// //           <button onClick={() => setSidebarOpen(true)} className="md:hidden">
// //             <Menu />
// //           </button>

// //           {/* TEXT */}
// //           <div className="ml-4">
// //             <h1 className="text-xl font-bold">
// //               Welcome back, {user?.name || "User"} 👋
// //             </h1>
// //             <p className="text-sm opacity-70">
// //               Manage your dashboard & activities
// //             </p>
// //           </div>

// //           {/* ACTIONS */}
// //           <div className="ml-auto flex items-center gap-4">
// //             <ThemeToggle />
// //             <button
// //               onClick={handleNotificationClick}
// //               className="relative p-2 rounded-lg hover:bg-slate-800"
// //             >
// //               <Bell size={20} />
// //               <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
// //             </button>
// //           </div>
// //         </header>

// //         {/* CONTENT */}
// //         <div className="flex-1 p-6 md:p-8">
// //           <Breadcrumb />
// //           <Outlet />
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default MainLayout;


// import React, { useState, useEffect } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Bell,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   LogOut,
// } from "lucide-react";

// import ActivlineLogo from "./logo.jsx";
// import SidebarItem from "../components/SidebarItem";
// import Breadcrumb from "../components/Breadcrumb";
// import ThemeToggle from "../components/ThemeToggle";

// import { useAuth } from "../context/AuthContext";
// import { useTheme } from "../context/ThemeContext";

// import {
//   adminSidebarItems,
//   franchiseSidebarItems,
//   staffSidebarItems,
// } from "../config/Sidebar.config";

// const MainLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { user, logout } = useAuth();
//   const { isDark } = useTheme();

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   /* ---------------- EFFECTS ---------------- */
//   useEffect(() => {
//     const onResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (mobile) setSidebarCollapsed(false);
//     };
//     onResize();
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   useEffect(() => {
//     setSidebarOpen(false);
//   }, [location.pathname]);

//   /* ---------------- HELPERS ---------------- */
//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

//   const handleNotificationClick = () => {
//     const role = user?.role;
//     if (role === "admin" || role === "SUPER_ADMIN") {
//       navigate("/admin-notifications");
//     } else if (role === "franchise") {
//       navigate("/franchise-notifications");
//     } else {
//       navigate("/staff-notifications");
//     }
//   };

//   const sidebarItemsMap = {
//     admin: adminSidebarItems,
//     SUPER_ADMIN: adminSidebarItems,
//     franchise: franchiseSidebarItems,
//     staff: staffSidebarItems,
//     admin_staff: staffSidebarItems,
//   };

//   const sidebarItems = sidebarItemsMap[user?.role] || [];
//   const isItemActive = (item) =>
//     item.paths.some((p) => location.pathname.startsWith(p));

//   /* ---------------- UI ---------------- */
//   return (
//     <div
//       className={`flex min-h-screen transition-colors duration-300
//       ${isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-900"}`}
//     >
//       {/* MOBILE OVERLAY */}
//       {sidebarOpen && isMobile && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed md:sticky top-0 left-0 z-50 h-screen
//         ${sidebarCollapsed ? "w-24" : "w-80"}
//         transition-all duration-300 ease-in-out
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//         ${
//           isDark
//             ? "bg-slate-900 border-slate-800"
//             : "bg-white border-gray-200"
//         }
//         border-r flex flex-col`}
//       >
//         {/* LOGO */}
//         <div
//           className={`h-24 flex items-center border-b
//           ${sidebarCollapsed ? "justify-center" : "justify-between px-6"}
//           ${isDark ? "border-slate-800" : "border-gray-200"}`}
//         >
//           <ActivlineLogo collapsed={sidebarCollapsed} />

//           {!isMobile && (
//             <button
//               onClick={() => setSidebarCollapsed((p) => !p)}
//               className="p-2 rounded-lg hover:bg-slate-800/60 transition"
//             >
//               {sidebarCollapsed ? (
//                 <ChevronRight size={18} />
//               ) : (
//                 <ChevronLeft size={18} />
//               )}
//             </button>
//           )}

//           {isMobile && (
//             <button onClick={() => setSidebarOpen(false)}>
//               <X />
//             </button>
//           )}
//         </div>

//         {/* NAV */}
//         <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//           {sidebarItems.map((item) => (
//             <SidebarItem
//               key={item.key}
//               icon={item.icon}
//               label={item.label}
//               active={isItemActive(item)}
//               collapsed={sidebarCollapsed}
//               onClick={() => {
//                 navigate(item.paths[0]);
//                 setSidebarOpen(false);
//               }}
//               role={user?.role}
//               isDark={isDark}
//             />
//           ))}
//         </nav>

//         {/* FOOTER */}
//         {!sidebarCollapsed && (
//           <div
//             className={`p-4 border-t ${
//               isDark ? "border-slate-800" : "border-gray-200"
//             }`}
//           >
//             <button
//               onClick={() => setIsUserMenuOpen((p) => !p)}
//               className="w-full flex items-center gap-3 p-3 rounded-xl
//               hover:bg-slate-800/70 transition"
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">
//                 {user?.name?.[0]?.toUpperCase()}
//               </div>
//               <div className="text-left">
//                 <p className="text-base font-semibold">{user?.name}</p>
//                 <p className="text-xs opacity-70 uppercase tracking-wide">
//                   {user?.role}
//                 </p>
//               </div>
//             </button>

//             {isUserMenuOpen && (
//               <div className="mt-2 rounded-xl border overflow-hidden">
//                 <button
//                   onClick={() => navigate("/profile")}
//                   className="w-full px-4 py-3 flex items-center gap-3
//                   hover:bg-gray-100 dark:hover:bg-slate-800 transition"
//                 >
//                   <User size={16} /> Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full px-4 py-3 flex items-center gap-3
//                   text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
//                 >
//                   <LogOut size={16} /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 flex flex-col">
//         {/* TOP BAR */}
//         <header
//           className={`sticky top-0 z-30 h-24 px-6 flex items-center
//           backdrop-blur-md border-b shadow-sm
//           ${
//             isDark
//               ? "bg-slate-900/90 border-slate-800"
//               : "bg-white/90 border-gray-200"
//           }`}
//         >
//           <button onClick={() => setSidebarOpen(true)} className="md:hidden">
//             <Menu />
//           </button>

//           <div className="ml-4">
//             <h1 className="text-2xl font-bold tracking-tight">
//               Welcome back, {user?.name || "User"} 👋
//             </h1>
//             <p className="text-sm opacity-70">
//               Manage your dashboard & activities
//             </p>
//           </div>

//           <div className="ml-auto flex items-center gap-4">
//             <ThemeToggle />
//             <button
//               onClick={handleNotificationClick}
//               className="relative p-2 rounded-lg hover:bg-slate-800/60 transition"
//             >
//               <Bell size={20} />
//               <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
//             </button>
//           </div>
//         </header>

//         {/* CONTENT */}
//         <div className="flex-1 p-6 md:p-8">
//           <Breadcrumb />
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MainLayout;


import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";

import ActivlineLogo from "./logo.jsx";
import SidebarItem from "../components/SidebarItem";
import Breadcrumb from "../components/Breadcrumb";
import ThemeToggle from "../components/ThemeToggle";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import {
  adminSidebarItems,
  franchiseSidebarItems,
  staffSidebarItems,
} from "../config/Sidebar.config";
import { getStaffUnreadCount } from "../api/staffnotification.api";
import { getUnreadCountApi } from "../api/notification.api";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [notificationCount, setNotificationCount] = useState(0);

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchCount = async () => {
      if (!user) return;
      const role = user.role?.toLowerCase();

      try {
        if (["staff", "admin_staff"].includes(role)) {
          const count = await getStaffUnreadCount();
          setNotificationCount(count);
        } else if (["admin", "super_admin"].includes(role)) {
          const count = await getUnreadCountApi();
          setNotificationCount(count);
        }
      } catch (error) {
        console.error("Failed to fetch notification count", error);
        setNotificationCount(0);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [user]);

  /* ---------------- HELPERS ---------------- */
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNotificationClick = () => {
    const role = user?.role;
    if (role === "admin" || role === "SUPER_ADMIN") {
      navigate("/admin-notifications");
    } else if (role === "franchise") {
      navigate("/franchise-notifications");
    } else {
      navigate("/staff-notifications");
    }
  };

  const sidebarItemsMap = {
    admin: adminSidebarItems,
    super_admin: adminSidebarItems,
    franchise: franchiseSidebarItems,
    staff: staffSidebarItems,
    admin_staff: staffSidebarItems,
  };

  const sidebarItems = sidebarItemsMap[user?.role?.toLowerCase()] || [];
  const isItemActive = (item) =>
    item.paths.some((p) => location.pathname.startsWith(p));

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`flex min-h-screen transition-all duration-500 ease-out
      ${isDark 
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900"}`}
    >
      {/* GLOW EFFECTS */}
      {!isMobile && (
        <>
          <div className={`fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse
            ${isDark ? 'bg-blue-500' : 'bg-purple-300'}`}
            style={{ transform: 'translate(-30%, -30%)' }}
          />
          <div className={`fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse delay-1000
            ${isDark ? 'bg-emerald-500' : 'bg-emerald-300'}`}
            style={{ transform: 'translate(30%, 30%)' }}
          />
        </>
      )}

      {/* MOBILE OVERLAY */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen
        ${sidebarCollapsed ? "w-24" : "w-80"}
        transition-all duration-500 ease-out
        ${sidebarOpen ? "translate-x-0 animate-in slide-in-from-left-80" : "-translate-x-full md:translate-x-0"}
        ${
          isDark
            ? "bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-lg border-slate-800/50 shadow-2xl shadow-slate-900/50"
            : "bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-lg border-gray-200 shadow-2xl shadow-gray-200/50"
        }
        border-r flex flex-col`}
      >
        {/* LOGO */}
        <div
          className={`h-24 flex items-center border-b
          ${sidebarCollapsed ? "justify-center" : "justify-between px-6"}
          ${isDark ? "border-slate-800/50" : "border-gray-200/50"} transition-all duration-300`}
        >
          <ActivlineLogo collapsed={sidebarCollapsed} />

          {!isMobile && (
            <button
              onClick={() => setSidebarCollapsed((p) => !p)}
              className={`p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110
                ${isDark 
                  ? "hover:bg-slate-800/80 shadow-lg shadow-slate-800/50" 
                  : "hover:bg-gray-100 shadow-lg shadow-gray-200/50"}`}
            >
              {sidebarCollapsed ? (
                <ChevronRight size={20} className={isDark ? "text-slate-400" : "text-gray-600"} />
              ) : (
                <ChevronLeft size={20} className={isDark ? "text-slate-400" : "text-gray-600"} />
              )}
            </button>
          )}

          {isMobile && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className={`p-2.5 rounded-xl transition-all duration-300
                ${isDark 
                  ? "hover:bg-slate-800/80" 
                  : "hover:bg-gray-100"}`}
            >
              <X size={20} className={isDark ? "text-slate-400" : "text-gray-600"} />
            </button>
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-transparent hover:scrollbar-thumb-gray-400/20">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={isItemActive(item)}
              collapsed={sidebarCollapsed}
              onClick={() => {
                navigate(item.paths[0]);
                setSidebarOpen(false);
              }}
              role={user?.role}
              isDark={isDark}
            />
          ))}
        </nav>

        {/* FOOTER */}
        {!sidebarCollapsed && (
          <div
            className={`p-4 border-t transition-all duration-300
              ${isDark ? "border-slate-800/50" : "border-gray-200/50"}`}
          >
            <button
              onClick={() => setIsUserMenuOpen((p) => !p)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl
                transition-all duration-300 transform hover:scale-[1.02] group
                ${isDark 
                  ? "hover:bg-slate-800/70 shadow-lg shadow-slate-900/30" 
                  : "hover:bg-gray-100 shadow-lg shadow-gray-200/30"}`}
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br 
                  ${isDark 
                    ? "from-blue-500 to-purple-600" 
                    : "from-indigo-500 to-purple-600"
                  } text-white flex items-center justify-center font-bold text-lg`}
                >
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 
                  ${isDark ? "border-slate-900" : "border-white"}
                  ${user?.role === "admin" || user?.role === "SUPER_ADMIN" 
                    ? "bg-emerald-500" 
                    : user?.role === "franchise"
                    ? "bg-orange-500"
                    : "bg-blue-500"}`}
                />
              </div>
              <div className="text-left">
                <p className="text-base font-semibold group-hover:text-purple-600 dark:group-hover:text-blue-400 transition-colors">
                  {user?.name}
                </p>
                <p className={`text-xs uppercase tracking-wider font-medium
                  ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            </button>

            {isUserMenuOpen && (
              <div className={`mt-2 rounded-xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-2 duration-300
                ${isDark 
                  ? "bg-slate-800/80 border border-slate-700/50 backdrop-blur-lg" 
                  : "bg-white border border-gray-200/50 backdrop-blur-lg"}`}
              >
                <button
                  onClick={() => navigate("/profile")}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-lg font-medium
                    transition-all duration-300 hover:pl-5
                    ${isDark 
                      ? "hover:bg-slate-700/50 text-slate-300" 
                      : "hover:bg-gray-100 text-gray-700"}`}
                >
                  <User size={18} className="text-purple-500 dark:text-blue-400" /> Profile
                </button>
                <button
                  onClick={handleLogout}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-lg font-medium
                    transition-all duration-300 hover:pl-5
                    ${isDark 
                      ? "text-red-400 hover:bg-red-500/10" 
                      : "text-red-500 hover:bg-red-50"}`}
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <header
          className={`sticky top-0 z-30 h-24 px-6 md:px-8 flex items-center
            backdrop-blur-xl transition-all duration-500
            border-b shadow-xl
            ${
              isDark
                ? "bg-slate-900/80 border-slate-800/50 shadow-slate-900/30"
                : "bg-white/80 border-gray-200/50 shadow-gray-200/30"
            }`}
        >
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="md:hidden p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110"
          >
            <Menu size={24} className={isDark ? "text-slate-400" : "text-gray-600"} />
          </button>

          <div className="ml-4 md:ml-6">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r 
                from-purple-600 to-blue-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Welcome back, {user?.name?.split(' ')[0] || "User"} 👋
              </h1>
              <Sparkles size={20} className="text-yellow-500 animate-pulse" />
            </div>
            <p className={`text-base ${isDark ? "text-slate-400" : "text-gray-600"}`}>
              Manage your dashboard & activities efficiently
            </p>
          </div>

          <div className="ml-auto flex items-center gap-4">
            {/* Theme Toggle Enhanced */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg
                ${isDark 
                  ? "bg-slate-800/50 hover:bg-slate-700/50 shadow-slate-900/50" 
                  : "bg-gray-100 hover:bg-gray-200 shadow-gray-200/50"}`}
            >
              {isDark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-indigo-600" />
              )}
            </button>

            <button
              onClick={handleNotificationClick}
              className={`relative p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg
                ${isDark 
                  ? "hover:bg-slate-800/80 shadow-slate-900/50" 
                  : "hover:bg-gray-100 shadow-gray-200/50"}`}
            >
              <Bell size={22} className={isDark ? "text-slate-300" : "text-gray-700"} />
              {notificationCount > 0 && (
                <>
                  <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full animate-ping" />
                  <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{notificationCount}</span>
                  </span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400/20">
          <div className="mb-6">
            <Breadcrumb />
          </div>
          <div className={`rounded-2xl p-6 md:p-8 transition-all duration-500
            ${isDark 
              ? "bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 shadow-2xl shadow-slate-900/20" 
              : "bg-white backdrop-blur-sm border border-gray-200/50 shadow-2xl shadow-gray-200/20"}`}
          >
            <Outlet />
          </div>
        </div>

        {/* FOOTER */}
        <footer className={`py-4 px-6 border-t text-center text-sm transition-colors duration-500
          ${isDark 
            ? "border-slate-800/50 text-slate-500" 
            : "border-gray-200/50 text-gray-500"}`}
        >
          <p>© {new Date().getFullYear()} Activline Dashboard. All rights reserved.</p>
          <p className="text-xs mt-1">v2.0.0 • Enhanced with modern UI</p>
        </footer>
      </main>
    </div>
  );
};

export default MainLayout;