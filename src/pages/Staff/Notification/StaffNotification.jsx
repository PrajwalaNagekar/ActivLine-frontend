import React, { useState, useEffect } from "react";
import { Bell, Ticket, MessageSquare, Check } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import {
  getMyStaffNotifications,
  markStaffNotificationRead,
  markAllStaffNotificationsRead,
   deleteStaffNotification,
  deleteAllStaffNotifications,
} from "../../../api/staffnotification.api";

export default function StaffNotifications() {
  const { isDark } = useTheme();

  // ✅ 1. STATE FIRST
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 2. DERIVED VALUES AFTER
  const unreadCount = notifications.filter(n => n.unread).length;


const markAsRead = async (id) => {
  try {
    await markStaffNotificationRead(id);

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, unread: false, isRead: true } : n
      )
    );
  } catch (err) {
    console.error("Failed to mark as read", err);
  }
};



const markAllAsRead = async () => {
  try {
    await markAllStaffNotificationsRead();

    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false, isRead: true }))
    );
  } catch (err) {
    console.error("Failed to mark all as read", err);
  }
};


  useEffect(() => {
  fetchNotifications();
}, []);

const fetchNotifications = async () => {
  try {
    setLoading(true);
    const data = await getMyStaffNotifications();

    setNotifications(
      data.map((n) => ({
        ...n,
        unread: !n.isRead,
        time: new Date(n.createdAt).toLocaleString(),
        icon: Bell,
      }))
    );
  } catch (err) {
    console.error("Failed to load staff notifications", err);
  } finally {
    setLoading(false);
  }
};
const deleteOne = async (id, e) => {
  e.stopPropagation(); // prevent mark-as-read click

  try {
    await deleteStaffNotification(id);

    setNotifications((prev) =>
      prev.filter((n) => n._id !== id)
    );
  } catch (err) {
    console.error("Failed to delete notification", err);
  }
};

const deleteAll = async () => {
  try {
    await deleteAllStaffNotifications();
    setNotifications([]);
  } catch (err) {
    console.error("Failed to delete all notifications", err);
  }
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
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    
    {/* Left */}
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-xl
        ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}`}
      >
        <Bell
          className={`w-6 h-6
          ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">
          My Notifications
        </h2>
        <p
          className={`text-sm mt-1
          ${isDark ? "text-slate-400" : "text-gray-500"}`}
        >
          Tickets and updates assigned to you
        </p>
      </div>
    </div>

    {/* Right buttons */}
    <div className="flex items-center gap-3">
      {unreadCount > 0 && (
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-emerald-600 hover:bg-emerald-700 text-white text-sm transition"
        >
          <Check className="w-4 h-4" />
          Mark all read
        </button>
      )}

      {notifications.length > 0 && (
        <button
          onClick={deleteAll}
          className="px-4 py-2 rounded-lg
          bg-red-600 hover:bg-red-700 text-white text-sm transition"
        >
          Clear all
        </button>
      )}
    </div>
  </div>

  {/* Stats */}
  <div className="flex flex-wrap gap-3 mt-5">
    <span
      className={`px-3 py-1 text-sm rounded-full
      ${isDark
        ? "bg-slate-800 text-slate-300"
        : "bg-gray-100 text-gray-700"}`}
    >
      Total: {notifications.length}
    </span>

    <span
      className={`px-3 py-1 text-sm rounded-full
      ${isDark
        ? "bg-emerald-900/30 text-emerald-400"
        : "bg-emerald-100 text-emerald-700"}`}
    >
      Unread: {unreadCount}
    </span>
  </div>
</div>


        {/* Notification List */}
       <div className="p-6 space-y-4 max-h-[520px] overflow-y-auto">
  {notifications.map((n) => (
    <div
      key={n._id}
      onClick={() => n.unread && markAsRead(n._id)}
      className={`group relative p-5 rounded-xl border cursor-pointer transition-all
      hover:-translate-y-0.5 hover:shadow-lg
      ${n.unread
        ? isDark
          ? "border-emerald-500 bg-emerald-900/10"
          : "border-emerald-500 bg-emerald-50"
        : isDark
          ? "border-slate-800 bg-slate-800/50"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      {/* Unread dot */}
      {n.unread && (
        <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-emerald-500" />
      )}

      {/* Action buttons */}
     <div className="absolute top-3 right-3 flex gap-2">
  {/* MARK AS READ */}
  {n.unread && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        markAsRead(n._id);
      }}
      className={`
        px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm
        transition-all duration-200
        ${isDark
          ? "bg-emerald-600 text-white hover:bg-emerald-500"
          : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"}
      `}
    >
      ✓ Read
    </button>
  )}

  {/* DELETE */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      deleteOne(n._id, e);
    }}
    className={`
      px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm
      transition-all duration-200
      ${isDark
        ? "bg-red-600 text-white hover:bg-red-500"
        : "bg-red-100 text-red-800 hover:bg-red-200"}
    `}
  >
    ✕ Delete
  </button>
</div>


      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center
          ${isDark ? "bg-emerald-900/30" : "bg-emerald-100"}`}
        >
          <n.icon
            className={`w-6 h-6
            ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
          />
        </div>

        {/* Content */}
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
