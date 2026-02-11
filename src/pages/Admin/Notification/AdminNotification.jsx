import { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import Lottie from "lottie-react";
import emailAnimation from "../../../animations/Email.json";
import notificationAnimation from "../../../animations/Email.json";
import { Bell, Check, X, AlertTriangle, Trash2 } from "lucide-react";
import {
  getNotificationsApi,
  markNotificationReadApi,
  deleteNotificationApi,
  deleteAllNotificationsApi,
  markAllNotificationsReadApi,
} from "../../../api/notification.api";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNotifications() {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // Store notification id to delete

  // Normalize notification data
  const normalizeNotifications = (data) =>
    data.map((n) => ({
      ...n,
      unread: !n.isRead,
      icon: Bell,
      time: new Date(n.createdAt).toLocaleString(),
      category: n.category || "system",
      description: n.message,
      title: n.title || "Notification",
    }));

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotificationsApi();
      setNotifications(normalizeNotifications(data));
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate unread count
  const unreadCount = notifications.reduce(
    (count, n) => (!n.isRead ? count + 1 : count),
    0
  );

  // Mark single notification as read
  const markAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    
    const notification = notifications.find((n) => n._id === id);
    if (!notification || notification.isRead) return;

    setProcessingIds(prev => new Set([...prev, id]));

    try {
      await markNotificationReadApi(id);
      
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true, unread: false } : n
        )
      );
      
      // Update selected notification if it's open
      if (selectedNotification?._id === id) {
        setSelectedNotification(prev => ({
          ...prev,
          isRead: true,
          unread: false
        }));
      }
    } catch (err) {
      console.error("Failed to mark read", err);
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    if (!unread.length) return;

    try {
      const unreadIds = unread.map(n => n._id);
      setProcessingIds(new Set(unreadIds));
      
      await markAllNotificationsReadApi(unread);

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true, unread: false }))
      );
    } catch (err) {
      console.error("Failed to mark all as read", err);
    } finally {
      setProcessingIds(new Set());
    }
  };

  // Delete single notification
  const deleteNotification = async (id) => {
    setProcessingIds(prev => new Set([...prev, id]));

    try {
      await deleteNotificationApi(id);
      
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      
      if (selectedNotification?._id === id) {
        setSelectedNotification(null);
      }
    } catch (err) {
      console.error("Failed to delete notification", err);
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setShowDeleteConfirm(null);
    }
  };

  // Show delete confirmation modal
  const showDeleteConfirmation = (id, e) => {
    if (e) e.stopPropagation();
    setShowDeleteConfirm(id);
  };

  // Clear all notifications
  const clearAll = async () => {
    if (notifications.length === 0 || processingIds.size > 0) return;
    setShowClearConfirm(true);
  };

  const handleConfirmClearAll = async () => {
    setShowClearConfirm(false);
    try {
      setProcessingIds(new Set(notifications.map(n => n._id)));
      await deleteAllNotificationsApi();
      setNotifications([]);
    } catch (err) {
      console.error("Failed to clear notifications", err);
    } finally {
      setProcessingIds(new Set());
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
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
                  {unreadCount} unread of {notifications.length} total notifications
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  disabled={processingIds.size > 0}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  disabled={processingIds.size > 0}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white hover:border-transparent font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: isDark ? '#374151' : '#d1d5db',
                    color: isDark ? '#d1d5db' : '#374151'
                  }}
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
       
<div
  className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm
    ${isDark
      ? "bg-gradient-to-br from-slate-900/90 to-slate-900/70 border border-slate-800/50"
      : "bg-white/90 border border-white/20"
    }`}
>
  {/* Notifications List */}
  <div className="p-6">
    {loading ? (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className={`mt-4 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
          Loading notifications...
        </p>
      </div>
    ) : notifications.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative">
          <div
            className={`absolute inset-0 ${
              isDark ? "bg-blue-500/10" : "bg-blue-100"
            } rounded-full blur-3xl`}
          ></div>
          <Lottie
            animationData={emailAnimation}
            loop
            autoplay
            className="w-64 h-64 relative"
          />
        </div>

        <h3
          className={`mt-6 text-2xl font-bold ${
            isDark ? "text-slate-200" : "text-gray-800"
          }`}
        >
          No notifications found
        </h3>

        <p
          className={`mt-2 text-center ${
            isDark ? "text-slate-400" : "text-gray-500"
          }`}
        >
          You're all caught up! 🎉
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            onClick={() => handleNotificationClick(notification)}
            className={`relative p-5 rounded-xl border cursor-pointer transition-all duration-300
              hover:shadow-xl hover:-translate-y-0.5 group
              ${
                notification.unread
                  ? isDark
                    ? "border-blue-500/50 bg-gradient-to-r from-blue-900/10 to-blue-900/5"
                    : "border-blue-500/50 bg-gradient-to-r from-blue-50 to-blue-100/50"
                  : isDark
                  ? "border-slate-800/50 bg-gradient-to-r from-slate-900/30 to-slate-900/10"
                  : "border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-gray-100/30"
              }`}
          >
            {/* Unread Indicator */}
            {notification.unread && (
              <div className="absolute -left-2 top-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            )}

            {/* Notification Content */}
            <div className="flex gap-4 items-start">
              {/* Icon */}
              <div className="relative flex-shrink-0">
                <div
                  className={`absolute inset-0 ${
                    isDark ? "bg-blue-500/20" : "bg-blue-100"
                  } rounded-xl blur-lg`}
                ></div>

                <div
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center
                    ${isDark ? "bg-slate-800" : "bg-white"} 
                    border ${isDark ? "border-slate-700" : "border-gray-200"}`}
                >
                  <notification.icon
                    className={`w-6 h-6 ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg leading-snug">
                        {notification.title}
                      </h3>

                      <span
                        className={`px-2 py-1 rounded text-xs font-medium
                          ${
                            isDark
                              ? "bg-slate-800 text-slate-300"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {notification.category}
                      </span>
                    </div>

                    <p className="mt-1.5 font-medium text-base">
                      {notification.message}
                    </p>

                    <p className="mt-1 text-sm opacity-70">
                      {notification.description}
                    </p>
                  </div>

                  {/* ✅ Right Time + Badge */}
                  <div className="flex flex-col items-end gap-2 min-w-[150px]">
                    <span
                      className={`text-sm whitespace-nowrap
                        ${
                          isDark ? "text-slate-400" : "text-gray-400"
                        }`}
                    >
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Footer Actions --- */}
            <div className={`mt-4 pt-4 border-t flex items-center justify-end gap-3 ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
              {notification.unread && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium mr-auto">
                  Unread
                </span>
              )}

              {notification.unread && (
                <button
                  onClick={(e) => markAsRead(notification._id, e)}
                  disabled={processingIds.has(notification._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg 
                             bg-green-100 text-green-800 hover:bg-green-200
                             dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20
                             transition-all disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  Mark as Read
                </button>
              )}

              <button
                onClick={(e) => showDeleteConfirmation(notification._id, e)}
                disabled={processingIds.has(notification._id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg 
                           bg-red-100 text-red-800 hover:bg-red-200
                           dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20
                           transition-all disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

        {/* Notification Detail Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div
              className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden
                ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}
            >
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                      <selectedNotification.icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedNotification.title}</h2>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{selectedNotification.time}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedNotification(null)}
                    className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="mt-6 space-y-4">
                  <p className="text-gray-700 dark:text-slate-300">{selectedNotification.description}</p>

                  {selectedNotification.data && Object.keys(selectedNotification.data).length > 0 && (
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                      <h4 className="font-semibold mb-2">Additional Data</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {Object.entries(selectedNotification.data).map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className={`text-xs uppercase ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>{key.replace(/_/g, ' ')}</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Action Buttons in Modal */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-800">
                    {selectedNotification.unread && (
                      <button
                        onClick={() => {
                          markAsRead(selectedNotification._id);
                          setSelectedNotification(prev => ({
                            ...prev,
                            isRead: true,
                            unread: false
                          }));
                        }}
                        disabled={processingIds.has(selectedNotification._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check className="w-4 h-4" />
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => setShowDeleteConfirm(selectedNotification._id)}
                      disabled={processingIds.has(selectedNotification._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Single Notification Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: -20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden
                  ${isDark
                    ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700"
                    : "bg-white border border-gray-200"
                  }`}
              >
                {/* Header */}
                <div className={`p-6 border-b flex items-center gap-4 ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`p-3 rounded-xl ${isDark ? "bg-red-500/10" : "bg-red-100"}`}
                  >
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </motion.div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Delete Notification
                    </h3>
                    <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className={`${isDark ? "text-slate-300" : "text-gray-600"}`}>
                    Are you sure you want to delete this notification? This will permanently remove it from your history.
                  </p>
                </div>

                {/* Footer */}
                <div className={`p-4 flex justify-end gap-3 ${isDark ? "bg-slate-900/50" : "bg-gray-50"}`}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => setShowDeleteConfirm(null)} 
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px -5px rgba(239, 68, 68, 0.4)" }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => deleteNotification(showDeleteConfirm)} 
                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-pink-600 shadow-lg shadow-red-500/30 transition-all hover:shadow-red-500/40"
                  >
                    Yes, Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clear All Confirmation Modal */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: -20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden
                  ${isDark
                    ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700"
                    : "bg-white border border-gray-200"
                  }`}
              >
                {/* Header */}
                <div className={`p-6 border-b flex items-center gap-4 ${isDark ? "border-slate-700" : "border-gray-200"}`}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`p-3 rounded-xl ${isDark ? "bg-red-500/10" : "bg-red-100"}`}
                  >
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </motion.div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Confirm Deletion
                    </h3>
                    <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className={`${isDark ? "text-slate-300" : "text-gray-600"}`}>
                    Are you sure you want to delete all notifications? This will permanently remove all entries from your history.
                  </p>
                </div>

                {/* Footer */}
                <div className={`p-4 flex justify-end gap-3 ${isDark ? "bg-slate-900/50" : "bg-gray-50"}`}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => setShowClearConfirm(false)} 
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px -5px rgba(239, 68, 68, 0.4)" }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={handleConfirmClearAll} 
                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-pink-600 shadow-lg shadow-red-500/30 transition-all hover:shadow-red-500/40"
                  >
                    Yes, Delete All
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}