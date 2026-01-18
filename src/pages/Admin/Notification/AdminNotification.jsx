import React, { useState } from "react";
import { Bell, Ticket, CreditCard, Check, AlertCircle, Users, Shield, Database, X } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import Lottie from "lottie-react";
import emailAnimation from "../../../animations/Email.json";
import notificationAnimation from "../../../animations/Email.json";

const adminNotifications = [
  {
    id: 1,
    title: "New Ticket Created",
    message: "Ticket #7789 raised by Sathya Kumar",
    description: "Category: Technical Support",
    icon: Ticket,
    time: "2 min ago",
    unread: true,
    category: "support"
  },
  {
    id: 2,
    title: "Payment Received",
    message: "₹9,999 received from AL-123456",
    description: "Payment Method: Credit Card",
    icon: CreditCard,
    time: "10 min ago",
    unread: false,
    category: "finance"
  },
  {
    id: 3,
    title: "System Alert",
    message: "API response time exceeded threshold",
    description: "Average response time: 2.3s",
    icon: AlertCircle,
    time: "1 hour ago",
    unread: true,
    category: "system"
  },
  {
    id: 4,
    title: "New User Registration",
    message: "John Smith registered with premium plan",
    description: "User ID: USR-7890 • Plan: Premium Annual",
    icon: Users,
    time: "2 hours ago",
    unread: true,
    category: "user"
  },
  {
    id: 5,
    title: "Security Update",
    message: "Security patch applied successfully",
    description: "Version: v2.4.1 • Status: Completed",
    icon: Shield,
    time: "5 hours ago",
    unread: false,
    category: "security"
  },
  {
    id: 6,
    title: "Database Backup",
    message: "Nightly backup completed successfully",
    description: "Size: 4.2 GB • Duration: 12 minutes",
    icon: Database,
    time: "Yesterday",
    unread: false,
    category: "system"
  }
];

export default function AdminNotifications() {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState(adminNotifications);
  const [expandedId, setExpandedId] = useState(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id, e) => {
    e.stopPropagation();
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div
      className={`w-full px-4 sm:px-6 lg:px-8 py-6 min-h-screen transition-all duration-300
      ${isDark ? "bg-gradient-to-br from-slate-950 to-slate-900" : "bg-gradient-to-br from-gray-50 to-blue-50"}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`absolute inset-0 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-2xl blur-xl`}></div>
                <div className={`relative p-3 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                  <Lottie
                    animationData={notificationAnimation}
                    loop
                    autoplay
                    className="w-12 h-12"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Notifications
                </h1>
                <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                  Stay updated with system activities
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {unreadCount > 0 && (
                <>
                  <button
                    onClick={markAllAsRead}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-500/20"
                  >
                    <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Mark all read
                  </button>
                  <button
                    onClick={clearAll}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white hover:border-transparent font-medium transition-all duration-300"
                    style={{
                      borderColor: isDark ? '#374151' : '#d1d5db',
                      color: isDark ? '#d1d5db' : '#374151'
                    }}
                  >
                    <X className="w-4 h-4" />
                    Clear all
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm
          ${isDark
            ? "bg-gradient-to-br from-slate-900/90 to-slate-900/70 border border-slate-800/50"
            : "bg-white/90 border border-white/20"
          }`}
        >
          {/* Notifications List - Non-scrollable */}
          <div className="p-6">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className={`absolute inset-0 ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} rounded-full blur-3xl`}></div>
                  <Lottie
                    animationData={emailAnimation}
                    loop
                    autoplay
                    className="w-64 h-64 relative"
                  />
                </div>
                <h3 className={`mt-6 text-2xl font-bold ${isDark ? "text-slate-200" : "text-gray-800"}`}>
                  No notifications found
                </h3>
                <p className={`mt-2 text-center ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                  You're all caught up! 🎉
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}
                    className={`relative p-5 rounded-xl border cursor-pointer transition-all duration-300
                      hover:shadow-xl hover:-translate-y-0.5 group
                      ${n.unread
                        ? isDark
                          ? "border-blue-500/50 bg-gradient-to-r from-blue-900/10 to-blue-900/5"
                          : "border-blue-500/50 bg-gradient-to-r from-blue-50 to-blue-100/50"
                        : isDark
                          ? "border-slate-800/50 bg-gradient-to-r from-slate-900/30 to-slate-900/10"
                          : "border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-gray-100/30"
                      }`}
                  >
                    {/* Unread Indicator */}
                    {n.unread && (
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    )}

                    <div className="flex gap-4 items-start">
                      {/* Icon with glow effect */}
                      <div className={`relative flex-shrink-0`}>
                        <div className={`absolute inset-0 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-xl blur-lg`}></div>
                        <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center
                          ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                          <n.icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{n.title}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                                {n.category}
                              </span>
                            </div>
                            <p className="mt-2 font-medium text-base">{n.message}</p>
                            <p className="mt-1 text-sm opacity-80">{n.description}</p>

                            {/* Expanded Details */}
                            {expandedId === n.id && (
                              <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-gray-100/50'}`}>
                                <p className="text-sm">
                                  Additional details about this notification would appear here.
                                  This could include more context, actions to take, or related information.
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
                              {n.time}
                            </span>
                            <div className="flex gap-2">
                              {n.unread && (
                                <button
                                  onClick={(e) => markAsRead(n.id, e)}
                                  className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all opacity-0 group-hover:opacity-100"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              <button className="p-2 rounded-lg border hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                style={{
                                  borderColor: isDark ? '#374151' : '#d1d5db',
                                  color: isDark ? '#d1d5db' : '#374151'
                                }}>
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}