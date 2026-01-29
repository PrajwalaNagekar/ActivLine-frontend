// import React, { useEffect } from "react";
// import {
//   MessageSquare,
//   Clock,
//   DollarSign,
//   Users,
//   ChevronRight,
//   ArrowUpRight,
//   TrendingUp,
//   MoreVertical,
//   Search,
//   Filter,
//   Download,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { useTheme } from "../../../context/ThemeContext";
// import { topCardsData, lightModeCardData, recentTickets, recentPayments, lightModeAvatarColors } from "../../../data/dashboardData";

// const DashboardPage = () => {
//   const { theme, toggleTheme, isDark } = useTheme();

//   // Add initial load animation
//   useEffect(() => {
//     document.body.style.opacity = '0';
//     document.body.style.transition = 'opacity 0.5s ease-in-out';
//     requestAnimationFrame(() => {
//       document.body.style.opacity = '1';
//     });
//   }, []);

//   // Get icon component by name
//   const getIconComponent = (iconName) => {
//     const icons = {
//       MessageSquare,
//       Clock,
//       DollarSign,
//       Users
//     };
//     return icons[iconName] || MessageSquare;
//   };

//   return (
//     <div className={`min-h-screen p-6 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 animate-fade-in">
//         <div>
//           <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
//           <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back! Here's what's happening today.</p>
//         </div>
//       </div>

//       {/* TOP CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {topCardsData.map((card, index) => {
//           const IconComponent = getIconComponent(card.iconName);
//           const lightModeData = lightModeCardData[index] || {};
          
//           return (
//             <DashboardCard
//               key={card.id}
//               title={card.title}
//               value={card.value}
//               change={card.change}
//               icon={<IconComponent className="h-6 w-6" />}
//               iconBg={isDark ? card.iconBg : lightModeData.iconBg}
//               iconColor={isDark ? card.iconColor : lightModeData.iconColor}
//               trend={card.trend}
//               isDark={isDark}
//               index={index}
//             />
//           );
//         })}
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* RECENT TICKETS */}
//         <div className={`rounded-2xl overflow-hidden animate-slide-up ${isDark ? 'bg-gray-800 shadow-xl shadow-black/20' : 'bg-white shadow-lg'}`} style={{ animationDelay: '0.3s' }}>
//           <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Tickets</h2>
//                 <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Latest customer support requests</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className={isDark ? 'bg-gray-900/50' : 'bg-gray-50'}>
//                 <tr>
//                   <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Subject</th>
//                   <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Customer</th>
//                 </tr>
//               </thead>
//               <tbody className={isDark ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}>
//                 {recentTickets.map((ticket, index) => (
//                   <TicketRow
//                     key={ticket.id}
//                     subject={`${ticket.ticketNumber} - ${ticket.subject}`}
//                     customer={ticket.customer}
//                     isDark={isDark}
//                     index={index}
//                   />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div> 

//         {/* RECENT PAYMENTS */}
//         <div className={`rounded-2xl overflow-hidden animate-slide-up ${isDark ? 'bg-gray-800 shadow-xl shadow-black/20' : 'bg-white shadow-lg'}`} style={{ animationDelay: '0.4s' }}>
//           <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Payments</h2>
//                 <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Latest payment transactions</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className={isDark ? 'bg-gray-900/50' : 'bg-gray-50'}>
//                 <tr>
//                   <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Customer</th>
//                   <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Amount</th>
//                   <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
//                 </tr>
//               </thead>
//               <tbody className={isDark ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}>
//                 {recentPayments.map((payment, index) => (
//                   <PaymentRow 
//                     key={payment.id}
//                     name={payment.name}
//                     amount={payment.amount}
//                     status={payment.status}
//                     avatarColor={isDark ? payment.avatarColor : lightModeAvatarColors[index] || lightModeAvatarColors[0]}
//                     isDark={isDark}
//                     index={index}
//                   />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Add animation styles */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes cardEntrance {
//           from {
//             opacity: 0;
//             transform: translateY(20px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
        
//         @keyframes rowEntrance {
//           from {
//             opacity: 0;
//             transform: translateX(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes pulseGlow {
//           0%, 100% {
//             box-shadow: 0 0 0 rgba(59, 130, 246, 0);
//           }
//           50% {
//             box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-5px);
//           }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.6s ease-out forwards;
//         }
        
//         .animate-slide-up {
//           animation: slideUp 0.5s ease-out forwards;
//           opacity: 0;
//         }
        
//         .animate-card-entrance {
//           animation: cardEntrance 0.4s ease-out forwards;
//           opacity: 0;
//         }
        
//         .animate-row-entrance {
//           animation: rowEntrance 0.3s ease-out forwards;
//           opacity: 0;
//         }
        
//         .animate-pulse-glow {
//           animation: pulseGlow 2s infinite;
//         }
        
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
        
//         .hover-lift {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-4px);
//         }
        
//         .hover-glow {
//           transition: all 0.3s ease;
//         }
        
//         .hover-glow:hover {
//           box-shadow: ${isDark ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)'};
//         }
//       `}</style>
//     </div>
//   );
// };

// /* CARD COMPONENT */
// const DashboardCard = ({ title, value, change, icon, iconBg, iconColor, trend, isDark, index }) => (
//   <div 
//     className={`rounded-2xl p-6 transition-all duration-300 hover-lift hover-glow animate-card-entrance ${
//       isDark ? 'bg-gray-800 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30' : 'bg-white shadow-lg hover:shadow-xl'
//     }`}
//     style={{ 
//       animationDelay: `${index * 0.1}s`,
//       animationFillMode: 'forwards'
//     }}
//   >
//     <div className="flex justify-between items-start">
//       <div>
//         <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
//         <h2 className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h2>
//         <div className={`flex items-center mt-2 ${trend === 'up' ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-red-400' : 'text-red-600')}`}>
//           <TrendingUp className={`h-4 w-4 mr-1 transition-transform duration-300 ${trend === 'down' ? 'rotate-180' : ''}`} />
//           <span className="text-sm font-medium">{change}</span>
//           <span className={`text-sm ml-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>from last month</span>
//         </div>
//       </div>
//       <div className={`${iconBg} p-3 rounded-xl animate-float ${isDark ? 'backdrop-blur-sm' : ''}`}>
//         <div className={`${iconColor} transition-transform duration-300 group-hover:scale-110`}>{icon}</div>
//       </div>
//     </div>
//   </div>
// );

// /* TICKET ROW */
// const TicketRow = ({ subject, customer, isDark, index }) => {
//   return (
//     <tr 
//       className={`transition-all duration-300 animate-row-entrance ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
//       style={{ 
//         animationDelay: `${0.1 + (index * 0.05)}s`,
//         animationFillMode: 'forwards'
//       }}
//     >
//       <td className="py-4 px-6">
//         <div className="flex items-center">
//           <div className={`h-10 w-10 rounded-lg flex-shrink-0 flex items-center justify-center mr-3 transition-transform duration-300 hover:scale-110 ${
//             isDark ? 'bg-gray-900' : 'bg-gray-100'
//           }`}>
//             <MessageSquare className={`h-5 w-5 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
//           </div>
//           <span className={`font-medium truncate transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{subject}</span>
//         </div>
//       </td>
//       <td className="py-4 px-6">
//         <span className={`truncate transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{customer}</span>
//       </td>
//     </tr>
//   );
// };

// /* PAYMENT ROW */
// const PaymentRow = ({ name, amount, status, date, avatarColor, isDark, index }) => {
//   const statusStyles = {
//     Paid: isDark ? "bg-green-900/30 text-green-400 border border-green-800/50" : "bg-green-100 text-green-700 border border-green-200",
//     Pending: isDark ? "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50" : "bg-yellow-100 text-yellow-700 border border-yellow-200",
//     Failed: isDark ? "bg-red-900/30 text-red-400 border border-red-800/50" : "bg-red-100 text-red-700 border border-red-200",
//   };

//   return (
//     <tr 
//       className={`transition-all duration-300 animate-row-entrance ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
//       style={{ 
//         animationDelay: `${0.1 + (index * 0.05)}s`,
//         animationFillMode: 'forwards'
//       }}
//     >
//       <td className="py-4 px-6">
//         <div className="flex items-center">
//           <div className={`h-10 w-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold mr-3 transition-all duration-300 hover:scale-110`}>
//             {name.charAt(0)}
//           </div>
//           <span className={`font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{name}</span>
//         </div>
//       </td>
//       <td className="py-4 px-6">
//         <span className={`font-bold transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{amount}</span>
//       </td>
//       <td className="py-4 px-6">
//         <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 ${statusStyles[status]}`}>
//           {status}
//         </span>
//       </td>
//     </tr>
//   );
// };

// export default DashboardPage; 
import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Clock,
  Users,
  TrendingUp,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import {
  getOpenTickets,
  getInProgressTickets,
  getTodayResolvedTickets,
  getTotalCustomers,
  getRecentTickets,
} from "../../../api/admindashboard.api";
import Lottie from "lottie-react";
import telecomAnimation from "../../../animations/Activline-Dashboard.json";


const DashboardHeaderAnimation = ({ isDark }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-xl p-2 transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
          : "bg-gradient-to-br from-blue-100 to-cyan-100"
      }`}
    >
      <Lottie
        animationData={telecomAnimation}
        loop
        autoplay
        className="w-20 h-20 md:w-24 md:h-24"
      />
    </div>
  );
};

const DashboardPage = () => {
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  /* ================= LOAD DASHBOARD DATA ================= */
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          openRes,
          inProgressRes,
          todayResolvedRes,
          totalCustomersRes,
          ticketsRes,
        ] = await Promise.all([
          getOpenTickets(),
          getInProgressTickets(),
          getTodayResolvedTickets(),
          getTotalCustomers(),
          getRecentTickets(5),
        ]);

        setStats({
          openTickets: openRes.openTickets,
          inProgressTickets: inProgressRes.inProgressTickets,
          todayResolvedTickets: todayResolvedRes.todayResolvedTickets,
          totalCustomers: totalCustomersRes.totalCustomers,
        });

        setRecentTickets(ticketsRes);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // Helper function to get the correct stat value
  const getStatValue = (title) => {
    if (!stats) return 0;
    
    switch(title) {
      case "Open Tickets":
        return stats.openTickets || 0;
      case "Tickets In-Progress":
        return stats.inProgressTickets || 0;
      case "Resolved Today":
        return stats.todayResolvedTickets || 0;
      case "Total Customers":
        return stats.totalCustomers || 0;
      default:
        return 0;
    }
  };

  // Animation variants for stats cards
  const cardStats = [
    {
      id: 1,
      title: "Open Tickets",
      icon: <MessageSquare className="h-7 w-7" />,
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-500",
    },
    {
      id: 2,
      title: "Tickets In-Progress",
      icon: <Clock className="h-7 w-7" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      id: 3,
      title: "Resolved Today",
      icon: <TrendingUp className="h-7 w-7" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
    },
    {
      id: 4,
      title: "Total Customers",
      icon: <Users className="h-7 w-7" />,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "OPEN":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "ASSIGNED":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "RESOLVED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return isDark
          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
          : "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "ASSIGNED":
        return isDark
          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
          : "bg-blue-50 text-blue-700 border-blue-200";
      case "RESOLVED":
        return isDark
          ? "bg-green-500/20 text-green-300 border-green-500/30"
          : "bg-green-50 text-green-700 border-green-200";
      default:
        return isDark
          ? "bg-gray-500/20 text-gray-300 border-gray-500/30"
          : "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
      }`}
    >
      {/* HEADER WITH ANIMATION */}
      {/* <div className="mb-8 animate-slideDown">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`p-2 rounded-lg ${
                  isDark
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                    : "bg-gradient-to-r from-blue-100 to-cyan-100"
                }`}
              >
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <h1
                className={`text-3xl font-bold bg-gradient-to-r ${
                  isDark
                    ? "from-blue-400 to-cyan-300"
                    : "from-blue-600 to-cyan-500"
                } bg-clip-text text-transparent`}
              >
                Dashboard
              </h1>
            </div>
            <p
              className={`text-lg transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                : "bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 shadow-sm"
            }`}
            title="Refresh dashboard"
          >
            <RefreshCw className="h-5 w-5" />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
      </div> */}

      {/* HEADER WITH LOTTIE ANIMATION */}
<div className="mb-8 animate-slideDown">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      
      {/* 🔥 LOTTIE ANIMATION */}
      <DashboardHeaderAnimation isDark={isDark} />

      {/* TITLE + SUBTITLE */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1
            className={`text-3xl font-bold bg-gradient-to-r ${
              isDark
                ? "from-blue-400 to-cyan-300"
                : "from-blue-600 to-cyan-500"
            } bg-clip-text text-transparent`}
          >
            Dashboard
          </h1>
        </div>

        <p
          className={`text-lg ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Welcome back! Here's what's happening today.
        </p>
      </div>
    </div>

    {/* REFRESH BUTTON */}
    <button
      onClick={() => window.location.reload()}
      className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
        isDark
          ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
          : "bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 shadow-sm"
      }`}
      title="Refresh dashboard"
    >
      <RefreshCw className="h-5 w-5" />
      <span className="text-sm font-medium">Refresh</span>
    </button>
  </div>
</div>


      {/* ================= ANIMATED TOP CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        {loading ? (
          <SkeletonCards />
        ) : (
          cardStats.map((card, index) => (
            <DashboardCard
              key={card.id}
              index={index}
              title={card.title}
              value={getStatValue(card.title)}
              icon={card.icon}
              color={card.color}
              bgColor={card.bgColor}
              textColor={card.textColor}
              isDark={isDark}
              isHovered={hoveredCard === card.id}
              onHover={setHoveredCard}
            />
          ))
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* RECENT TICKETS WITH ENHANCED DESIGN */}
        <SectionCard
          title="Recent Tickets"
          subtitle="Latest customer support requests"
          icon={<MessageSquare className="h-5 w-5" />}
          isDark={isDark}
        >
          <div className="overflow-hidden rounded-xl">
            {recentTickets.length === 0 ? (
              <div
                className={`p-8 text-center rounded-xl ${
                  isDark ? "bg-gray-700/50" : "bg-gray-100"
                }`}
              >
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">No recent tickets</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={`border-b ${
                        isDark
                          ? "border-gray-700"
                          : "border-gray-200"
                      }`}
                    >
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">
                        Ticket
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">
                        Subject
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">
                        Created
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTickets.map((ticket, index) => (
                      <tr
                        key={ticket.ticketId}
                        className={`group transition-all duration-300 hover:scale-[1.02] ${
                          isDark
                            ? "hover:bg-gray-700/50 border-b border-gray-700/50"
                            : "hover:bg-gray-50 border-b border-gray-100"
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-2 rounded-lg ${
                                isDark
                                  ? "bg-gray-700"
                                  : "bg-gray-100"
                              }`}
                            >
                              {getStatusIcon(ticket.status)}
                            </div>
                            <div>
                              <div
                                className={`font-medium ${
                                  isDark
                                    ? "text-white"
                                    : "text-gray-900"
                                }`}
                              >
                                #{ticket.ticketId.slice(-6)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {ticket.customer || "Unknown"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div
                            className={`max-w-[200px] truncate ${
                              isDark
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                            title={ticket.subject}
                          >
                            {ticket.subject}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            {getStatusIcon(ticket.status)}
                            <span className="text-xs font-medium">
                              {ticket.status}
                            </span>
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div
                            className={`text-sm ${
                              isDark
                                ? "text-gray-400"
                                : "text-gray-600"
                            }`}
                          >
                            {new Date(
                              ticket.createdAt
                            ).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(
                              ticket.createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            className={`p-1.5 rounded-lg transition-all duration-300 hover:scale-110 ${
                              isDark
                                ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {recentTickets.length > 0 && (
              <div
                className={`p-3 text-center border-t ${
                  isDark
                    ? "border-gray-700 bg-gray-800/50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <button
                  className={`text-sm font-medium transition-all duration-300 hover:gap-2 ${
                    isDark
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-500"
                  }`}
                >
                  View all tickets
                  <ArrowUpRight className="inline h-4 w-4 ml-1" />
                </button>
              </div>
            )}
          </div>
        </SectionCard>

        {/* RECENT PAYMENTS WITH PLACEHOLDER ANIMATION */}
        <SectionCard
          title="Recent Payments"
          subtitle="Latest financial transactions"
          icon={<TrendingUp className="h-5 w-5" />}
          isDark={isDark}
        >
          <div className="space-y-6">
            {/* Animated placeholder */}
            <div className="relative overflow-hidden rounded-xl">
              <div
                className={`p-8 rounded-xl ${
                  isDark ? "bg-gray-700/50" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div
                      className={`h-24 w-24 rounded-full border-4 ${
                        isDark
                          ? "border-gray-600"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`absolute inset-0 h-24 w-24 rounded-full border-4 border-t-transparent border-blue-500 animate-spin`}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Payments Module
                  </h3>
                  <p
                    className={`mb-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Coming Soon
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium animate-pulse">
                    <span>●</span> In Development
                  </div>
                </div>
              </div>

              {/* Progress animation */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer`}
              ></div>
            </div>

            {/* Stats preview */}
            <div
              className={`grid grid-cols-3 gap-4 p-4 rounded-xl ${
                isDark ? "bg-gray-800/50" : "bg-white"
              }`}
            >
              {["Today", "Week", "Month"].map((period) => (
                <div
                  key={period}
                  className="text-center p-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`text-2xl font-bold mb-1 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent`}
                  >
                    $0
                  </div>
                  <div
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {period}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* FOOTER */}
      <div className="mt-8 pt-6 border-t border-gray-700/30">
        <div className="text-center">
          <span
            className={`text-sm ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Last updated: {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

/* ================= ENHANCED COMPONENTS ================= */

const DashboardCard = ({
  index,
  title,
  value,
  icon,
  color,
  bgColor,
  textColor,
  isDark,
  isHovered,
  onHover,
}) => {
  // Calculate percentage for progress bar (just visual, not actual data)
  const progressPercentage = Math.min((value / 100) * 100, 100) || 0;

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-500 animate-slideUp overflow-hidden group cursor-pointer ${
        isDark
          ? "bg-gray-800/70 hover:bg-gray-800"
          : "bg-white hover:bg-gray-50 shadow-sm"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => onHover && onHover(title)}
      onMouseLeave={() => onHover && onHover(null)}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-20 animate-float`}
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${bgColor}`}>
            <div className={textColor}>{icon}</div>
          </div>
          <div
            className={`text-lg font-semibold transition-all duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            } ${textColor}`}
          >
            {/* Removed static +0% */}
          </div>
        </div>

        <h2
          className={`text-3xl font-bold mb-2 transition-all duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          } ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {value}
        </h2>

        <p
          className={`text-sm transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {title}
        </p>

        {/* Progress bar - visual only */}
        <div
          className={`mt-4 h-1 rounded-full overflow-hidden ${
            isDark ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
            style={{
              width: `${progressPercentage}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({
  title,
  subtitle,
  icon,
  children,
  isDark,
}) => (
  <div
    className={`rounded-2xl overflow-hidden transition-all duration-500 animate-slideUp ${
      isDark
        ? "bg-gray-800/70 shadow-lg"
        : "bg-white shadow-lg"
    }`}
  >
    <div
      className={`px-6 py-4 border-b ${
        isDark ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            isDark
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {icon}
        </div>
        <div>
          <h2
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const SkeletonCards = () => (
  <>
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="h-32 rounded-2xl animate-pulse"
        style={{
          animationDelay: `${i * 100}ms`,
        }}
      />
    ))}
  </>
);

// Add CSS animations
const styles = `
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-10px) translateX(10px);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-slideUp {
  animation: slideUp 0.6s ease-out forwards;
}

.animate-slideDown {
  animation: slideDown 0.6s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);