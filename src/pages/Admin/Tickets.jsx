
  import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Chat from "../../components/chat/Chat";
import api from "../../api/axios";
import { socket } from "../../socket/socket";

/* ---------- STATUS COLOR ---------- */
const getStatusColor = (status, isDark) => {
  const map = {
    OPEN: isDark ? "bg-yellow-500/10 text-yellow-400" : "bg-yellow-50 text-yellow-700",
    ASSIGNED: isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-700",
    CLOSED: isDark ? "bg-green-500/10 text-green-400" : "bg-green-50 text-green-700",
  };
  return map[status] || "bg-gray-100 text-gray-600";
};

const Tickets = () => {
  const { isDark } = useTheme();
  const { user, token } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [activeTicketId, setActiveTicketId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  const activeTicket = tickets.find(t => t._id === activeTicketId);

  /* ---------- LOAD ROOMS ---------- */
  useEffect(() => {
    if (!token) return;

    setLoading(true);

    api.get("/api/chat/admin/rooms")
      .then(res => {
        const mapped = res.data.data.map(r => ({
          _id: r._id,
          ticketId: r._id.slice(-6).toUpperCase(),
          issue: "Customer Support Chat",
          customerName: r.customer?.fullName || "Guest User",
          status: r.status,
          assignedTo: r.assignedStaff?._id || null,
        }));

        setTickets(mapped);

        if (!activeTicketId && mapped.length) {
          setActiveTicketId(mapped[0]._id);
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  /* ---------- LOAD MESSAGES + SOCKET (🔥 FIXED) ---------- */
  useEffect(() => {
    if (!activeTicket?._id || !token) return;

    setMessages([]);

    // 1️⃣ Load chat history
    api.get(`/api/chat/admin/messages/${activeTicket._id}`)
      .then(res => setMessages(res.data.data || []))
      .catch(() => setMessages([]));

    // 2️⃣ 🔥 VERY IMPORTANT: attach ADMIN token to socket
    socket.auth = { token };

    if (!socket.connected) {
      socket.connect();
    }

    // 3️⃣ Join room AFTER connect
    socket.emit("join-room", activeTicket._id);

    const handleNewMessage = (msg) => {
      setMessages(prev => {
        if (prev.some(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
      socket.disconnect();
    };
  }, [activeTicket?._id, token]);

  /* ---------- SEND MESSAGE (ADMIN → CUSTOMER) ---------- */
  const sendMessage = (text) => {
    if (!text.trim() || !activeTicket) return;

    socket.emit("send-message", {
      roomId: activeTicket._id,
      message: text,
    });
  };

  /* ---------- FILTER ---------- */
  const filteredTickets = useMemo(() => {
    if (filterStatus === "All") return tickets;
    return tickets.filter(t => t.status === filterStatus);
  }, [tickets, filterStatus]);

  if (!token) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        Unauthorized – Please login again
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-140px)] border rounded-xl overflow-hidden">

      {/* ---------- SIDEBAR ---------- */}
      <div className={`w-80 border-r ${isDark ? "bg-slate-900" : "bg-white"}`}>
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Support Inbox</h2>
          <div className="flex gap-1 mt-3">
            {["All", "OPEN", "ASSIGNED", "CLOSED"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 text-xs rounded ${
                  filterStatus === s
                    ? "bg-purple-600 text-white"
                    : "text-gray-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredTickets.map(t => (
            <div
              key={t._id}
              onClick={() => setActiveTicketId(t._id)}
              className={`p-4 cursor-pointer border-b
                ${activeTicketId === t._id
                  ? isDark ? "bg-slate-800" : "bg-purple-50"
                  : isDark ? "hover:bg-slate-800" : "hover:bg-gray-50"}`}
            >
              <div className="font-semibold text-sm">{t.issue}</div>
              <div className="text-xs text-gray-500">{t.customerName}</div>
              <span className={`text-[10px] px-2 py-0.5 rounded ${getStatusColor(t.status, isDark)}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- CHAT ---------- */}
      <div className="flex-1">
        {activeTicket ? (
          <Chat
            ticket={activeTicket}
            messages={messages}
            onSendMessage={sendMessage}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
