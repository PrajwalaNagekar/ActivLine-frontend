import React, { useState } from "react";
import { Bell, Ticket, AlertCircle, Check } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const franchiseNotificationsData = [
  {
    id: 1,
    title: "Ticket Assigned (Your Area)",
    message: "Line issue at AL-456789",
    description: "Location: Whitefield Zone",
    icon: Ticket,
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "New Installation Request",
    message: "New lead generated",
    description: "Area: Whitefield",
    icon: AlertCircle,
    time: "30 min ago",
    unread: false,
  },
];

export default function FranchiseNotifications() {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState(franchiseNotificationsData);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div
      className={`w-full px-6 lg:px-10 py-6 min-h-screen
      ${isDark ? "bg-slate-950" : "bg-gray-50"}`}
    >
      <div
        className={`max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden
        ${isDark
          ? "bg-slate-900 text-slate-100 border border-slate-800"
          : "bg-white text-gray-900 border border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`p-6 border-b
          ${isDark ? "border-slate-800" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl
                ${isDark ? "bg-purple-900/30" : "bg-purple-100"}`}
              >
                <Bell
                  className={`w-6 h-6
                  ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">
                  Franchise Notifications
                </h2>
                <p
                  className={`text-sm mt-1
                  ${isDark ? "text-slate-400" : "text-gray-500"}`}
                >
                  Updates related to your franchise area
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm"
              >
                <Check className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-3 mt-5">
            <span
              className={`px-3 py-1 text-sm rounded-full
              ${isDark ? "bg-slate-800 text-slate-300" : "bg-gray-100 text-gray-700"}`}
            >
              Total: {notifications.length}
            </span>
            <span
              className={`px-3 py-1 text-sm rounded-full
              ${isDark
                ? "bg-purple-900/30 text-purple-400"
                : "bg-purple-100 text-purple-700"}`}
            >
              Unread: {unreadCount}
            </span>
          </div>
        </div>

        {/* Notification List */}
        <div className="p-6 space-y-4 max-h-[520px] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`relative p-5 rounded-xl border cursor-pointer transition-all
              hover:-translate-y-0.5 hover:shadow-lg
              ${n.unread
                ? isDark
                  ? "border-purple-500 bg-purple-900/10"
                  : "border-purple-500 bg-purple-50"
                : isDark
                  ? "border-slate-800 bg-slate-800/50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              {n.unread && (
                <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-purple-500" />
              )}

              <div className="flex gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center
                  ${isDark ? "bg-purple-900/30" : "bg-purple-100"}`}
                >
                  <n.icon
                    className={`w-6 h-6
                    ${isDark ? "text-purple-400" : "text-purple-600"}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg">
                      {n.title}
                    </h3>
                    <span
                      className={`text-sm
                      ${isDark ? "text-slate-400" : "text-gray-400"}`}
                    >
                      {n.time}
                    </span>
                  </div>

                  <p
                    className={`mt-1 font-medium
                    ${isDark ? "text-slate-200" : "text-gray-800"}`}
                  >
                    {n.message}
                  </p>

                  <p
                    className={`mt-1 text-sm
                    ${isDark ? "text-slate-400" : "text-gray-500"}`}
                  >
                    {n.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell
                className={`mx-auto w-12 h-12
                ${isDark ? "text-slate-600" : "text-gray-400"}`}
              />
              <p
                className={`mt-3
                ${isDark ? "text-slate-400" : "text-gray-500"}`}
              >
                No notifications available
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t
          ${isDark ? "border-slate-800" : "border-gray-200"}`}
        />
      </div>
    </div>
  );
}
