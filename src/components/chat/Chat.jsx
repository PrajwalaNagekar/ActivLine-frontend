

// export default Chat;
import React, { useEffect, useRef, useState } from "react";
import { Send, User, ChevronDown, AlertCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Chat = ({
  ticket,
  messages = [],
  onSendMessage,
  showAssignment,
  staffList = [],
  showStatus,
  onAssigneeChange,
  onStatusChange,
}) => {
  const { isDark } = useTheme();
  const [inputMsg, setInputMsg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!inputMsg.trim()) return;
    onSendMessage(inputMsg);
    setInputMsg("");
  };

  return (
    <div className={`flex-1 flex flex-col ${isDark ? "bg-[#0b141a]" : "bg-gray-50"}`}>

      {/* HEADER */}
      <div className={`p-4 border-b flex justify-between items-center
        ${isDark ? "border-slate-800 bg-slate-900" : "bg-white border-gray-200"}`}
      >
        <div>
          <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            #{ticket.ticketId} {ticket.issue}
          </h3>
          <p className="text-xs text-gray-400">{ticket.customerName}</p>
        </div>

        <div className="flex gap-3">
          {showAssignment && (
            <div className="relative">
              <select
                value={ticket.assignedTo || ""}
                onChange={(e) => onAssigneeChange?.(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-xs rounded-lg border"
              >
                <option value="">Unassigned</option>
                {staffList.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
            </div>
          )}

          {showStatus && (
            <div className="relative">
              <select
                value={ticket.status}
                onChange={(e) => onStatusChange?.(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-full border"
              >
                <option value="OPEN">Open</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="CLOSED">Closed</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-50" />
            </div>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(msg => {
          const isAgent = ["ADMIN", "ADMIN_STAFF"].includes(msg.senderRole);

          if (msg.senderRole === "SYSTEM") {
            return (
              <div key={msg._id} className="flex justify-center">
                <div className="text-xs px-4 py-1 rounded-full border flex gap-2 opacity-70">
                  <AlertCircle className="w-3 h-3" /> {msg.message}
                </div>
              </div>
            );
          }

          return (
            <div key={msg._id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-xl max-w-md text-sm
                ${isAgent ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-200"}`}
              >
                {msg.message}
                <div className="text-[10px] mt-1 opacity-70 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className={`p-4 border-t flex gap-2
          ${isDark ? "border-slate-800 bg-slate-900" : "bg-white border-gray-200"}`}
      >
        <input
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Type your reply..."
          className="flex-1 px-4 py-2 rounded-lg border outline-none"
        />
        <button className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
