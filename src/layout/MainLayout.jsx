import React from 'react';
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
  LogOut,
} from 'lucide-react';
import ActivlineLogo from '../logo/Logo';
import SidebarItem from '../components/SidebarItem';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const adminUser = {
    name: "Admin User",
    role: "Super Admin"
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate('/login');
  };

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

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20">
        <div className="h-16 flex items-center justify-center px-6 border-b border-slate-800">
          <ActivlineLogo className="h-10 w-auto text-white mt-1" />
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === 'Dashboard'} 
            onClick={() => navigate('/dashboard')} 
          />
          <SidebarItem 
            icon={Users} 
            label="Subscribers" 
            active={activeTab === 'Subscribers'} 
            onClick={() => navigate('/subscribers')} 
          />
          <SidebarItem 
            icon={MapPin} 
            label="Field Staff" 
            active={activeTab === 'Field Staff'} 
            onClick={() => navigate('/field-staff')} 
          />
          <SidebarItem 
            icon={CreditCard} 
            label="Billing Engine" 
            active={activeTab === 'Billing Engine'} 
            onClick={() => navigate('/billing')} 
          />
          {/* <SidebarItem 
            icon={Megaphone} 
            label="Offers & Ads" 
            active={activeTab === 'Offers & Ads'} 
            onClick={() => navigate('/offers')} 
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="Support (WA)" 
            active={activeTab === 'Support (WA)'} 
            onClick={() => navigate('/support')} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={activeTab === 'Settings'} 
            onClick={() => navigate('/settings')} 
          /> */}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
           <div className="bg-slate-800/50 rounded-xl p-4 mb-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Welcome, <span className="font-bold text-white">{adminUser.name}</span></p>
              <p className="text-[10px] text-blue-400 font-medium uppercase tracking-wide">You are signed in as {adminUser.role}</p>
           </div>
           
           <div className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-slate-800 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-white font-bold">
                  {adminUser.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                   <p className="text-sm font-bold text-white truncate">{adminUser.name}</p>
                   <p className="text-xs text-slate-500 truncate">{adminUser.role}</p>
                </div>
              </div>
              <button 
                onClick={handleSignOut}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-8 shadow-sm z-10">
          <button className="md:hidden text-slate-400 hover:text-white"><Menu className="w-6 h-6"/></button>
          
          <div className="flex-1 max-w-lg hidden md:block">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 group-hover:text-blue-400 transition-colors w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search users, tickets..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-sm text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-600"
                />
             </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
             </button>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-7xl mx-auto h-full">
              <Outlet />
           </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
