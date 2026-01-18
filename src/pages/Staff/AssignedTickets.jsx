import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Chat from "../../components/chat/Chat";
import api from "../../api/axios";
import { socket } from "../../socket/socket";
import { Search } from "lucide-react";

const AssignedTickets = () => {
  const { isDark } = useTheme();
  const { token } = useAuth();

  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const activeRoom = rooms.find(r => r._id === activeRoomId);

  /* ================= LOAD ASSIGNED ROOMS ================= */
  useEffect(() => {
    if (!token) return;

    setLoadingRooms(true);

    api.get("/api/chat/staff/rooms")
      .then(res => {
        const data = res.data.data || [];
        setRooms(data);
        if (!activeRoomId && data.length) {
          setActiveRoomId(data[0]._id);
        }
      })
      .catch(() => setRooms([]))
      .finally(() => setLoadingRooms(false));
  }, [token]);

  /* ================= LOAD MESSAGES + SOCKET ================= */
  useEffect(() => {
    if (!activeRoomId || !token) return;

    setMessages([]);
    setLoadingMessages(true);

    // 1️⃣ Load history
    api.get(`/api/chat/staff/messages/${activeRoomId}`)
      .then(res => setMessages(res.data.data || []))
      .catch(() => setMessages([]))
      .finally(() => setLoadingMessages(false));

    // 2️⃣ Socket join
    socket.auth = { token };
    if (!socket.connected) socket.connect();
    socket.emit("join-room", activeRoomId);

    const onNewMessage = (msg) => {
      setMessages(prev => {
        if (prev.some(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    };

    socket.on("new-message", onNewMessage);

    return () => {
      socket.off("new-message", onNewMessage);
      socket.disconnect();
    };
  }, [activeRoomId, token]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = (text) => {
    if (!text.trim() || !activeRoomId) return;

    socket.emit("send-message", {
      roomId: activeRoomId,
      message: text,
    });
  };

  /* ================= SEARCH ================= */
  const filteredRooms = useMemo(() => {
    return rooms.filter(r =>
      r.customer?.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [rooms, search]);

  if (loadingRooms) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Loading assigned chats…
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-140px)] border rounded-xl overflow-hidden">

      {/* ================= SIDEBAR ================= */}
      <div className={`w-80 border-r ${isDark ? "bg-slate-900" : "bg-white"}`}>
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Assigned Chats</h2>

          <div className="relative mt-3">
            <Search className="absolute left-3 top-2.5 w-4 h-4 opacity-50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer..."
              className={`pl-9 w-full p-2 rounded border outline-none
                ${isDark ? "bg-slate-800 border-slate-700 text-white" : ""}`}
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredRooms.length === 0 && (
            <div className="p-6 text-center text-sm text-gray-400">
              No assigned chats
            </div>
          )}

          {filteredRooms.map(room => (
            <div
              key={room._id}
              onClick={() => setActiveRoomId(room._id)}
              className={`p-4 cursor-pointer border-b transition
                ${activeRoomId === room._id
                  ? isDark
                    ? "bg-slate-800"
                    : "bg-purple-100"
                  : isDark
                    ? "hover:bg-slate-800/60"
                    : "hover:bg-gray-100"
                }`}
            >
              <div className="font-semibold text-sm">
                {room.customer?.fullName}
              </div>
              <div className="text-xs text-gray-500">
                Room #{room._id.slice(-6)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CHAT ================= */}
      <div className="flex-1">
        {activeRoom ? (
          loadingMessages ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Loading messages…
            </div>
          ) : (
            <Chat
              ticket={{
                ticketId: activeRoom._id.slice(-6),
                issue: "Customer Support",
                customerName: activeRoom.customer?.fullName,
                status: activeRoom.status,
              }}
              messages={messages}
              onSendMessage={sendMessage}
              showAssignment={false}
              showStatus={true}
            />
          )
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTickets;
