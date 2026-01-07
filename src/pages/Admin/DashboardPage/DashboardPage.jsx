import React from "react";
import {
  MessageSquare,
  Clock,
  DollarSign,
  Users,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  MoreVertical,
  Search,
  Filter,
  Download,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { topCardsData, lightModeCardData, recentTickets, recentPayments, lightModeAvatarColors } from "../../../data/dashboardData";

const DashboardPage = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  // Get icon component by name
  const getIconComponent = (iconName) => {
    const icons = {
      MessageSquare,
      Clock,
      DollarSign,
      Users
    };
    return icons[iconName] || MessageSquare;
  };

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {topCardsData.map((card, index) => {
          const IconComponent = getIconComponent(card.iconName);
          const lightModeData = lightModeCardData[index] || {};
          
          return (
            <DashboardCard
              key={card.id}
              title={card.title}
              value={card.value}
              change={card.change}
              icon={<IconComponent className="h-6 w-6" />}
              iconBg={isDark ? card.iconBg : lightModeData.iconBg}
              iconColor={isDark ? card.iconColor : lightModeData.iconColor}
              trend={card.trend}
              isDark={isDark}
            />
          );
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT TICKETS */}
        <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800 shadow-xl shadow-black/20' : 'bg-white shadow-lg'}`}>
          <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Tickets</h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Latest customer support requests</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? 'bg-gray-900/50' : 'bg-gray-50'}>
                <tr>
                  <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Subject</th>
                  <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Customer</th>
                </tr>
              </thead>
              <tbody className={isDark ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}>
                {recentTickets.map((ticket) => (
                  <TicketRow
                    key={ticket.id}
                    subject={`${ticket.ticketNumber} - ${ticket.subject}`}
                    customer={ticket.customer}
                    isDark={isDark}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div> 

        {/* RECENT PAYMENTS */}
        <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800 shadow-xl shadow-black/20' : 'bg-white shadow-lg'}`}>
          <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Payments</h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Latest payment transactions</p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? 'bg-gray-900/50' : 'bg-gray-50'}>
                <tr>
                  <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Customer</th>
                  <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Amount</th>
                  <th className={`text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                </tr>
              </thead>
              <tbody className={isDark ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}>
                {recentPayments.map((payment, index) => (
                  <PaymentRow 
                    key={payment.id}
                    name={payment.name}
                    amount={payment.amount}
                    status={payment.status}
                    avatarColor={isDark ? payment.avatarColor : lightModeAvatarColors[index] || lightModeAvatarColors[0]}
                    isDark={isDark}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/* CARD COMPONENT */
const DashboardCard = ({ title, value, change, icon, iconBg, iconColor, trend, isDark }) => (
  <div className={`rounded-2xl p-6 transition-all duration-300 ${isDark ? 'bg-gray-800 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30' : 'bg-white shadow-lg hover:shadow-xl'}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
        <h2 className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h2>
        <div className={`flex items-center mt-2 ${trend === 'up' ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-red-400' : 'text-red-600')}`}>
          <TrendingUp className={`h-4 w-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
          <span className="text-sm font-medium">{change}</span>
          <span className={`text-sm ml-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>from last month</span>
        </div>
      </div>
      <div className={`${iconBg} p-3 rounded-xl ${isDark ? 'backdrop-blur-sm' : ''}`}>
        <div className={iconColor}>{icon}</div>
      </div>
    </div>
  </div>
);

/* TICKET ROW */
const TicketRow = ({ subject, customer, isDark }) => {
  return (
    <tr className={`transition-colors duration-150 ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-lg flex-shrink-0 flex items-center justify-center mr-3 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <MessageSquare className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          <span className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{subject}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`truncate ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{customer}</span>
      </td>
    </tr>
  );
};

/* PAYMENT ROW */
const PaymentRow = ({ name, amount, status, date, avatarColor, isDark }) => {
  const statusStyles = {
    Paid: isDark ? "bg-green-900/30 text-green-400 border border-green-800/50" : "bg-green-100 text-green-700 border border-green-200",
    Pending: isDark ? "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50" : "bg-yellow-100 text-yellow-700 border border-yellow-200",
    Failed: isDark ? "bg-red-900/30 text-red-400 border border-red-800/50" : "bg-red-100 text-red-700 border border-red-200",
  };

  return (
    <tr className={`transition-colors duration-150 ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold mr-3`}>
            {name.charAt(0)}
          </div>
          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{name}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{amount}</span>
      </td>
      <td className="py-4 px-6">
        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusStyles[status]}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default DashboardPage;