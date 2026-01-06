import React, { useEffect, useRef, useState } from "react";
import {
  Send,
  User,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * Reusable Chat Component
 * -----------------------
 * Props:
 * - ticket (object)
 * - onSendMessage(text)
 * - onStatusChange(status)
 * - onAssigneeChange(userId)
 * - staffList (optional)
 * - showAssignment (boolean)
 * - showStatus (boolean)
 */
const Chat = ({
  ticket,
  showAssignment,
  staffList = [],
  showStatus,
  onSendMessage,
  onStatusChange,
  onBackMobile, // 👈 add this
}) => {

  const { isDark } = useTheme();
  const [inputMsg, setInputMsg] = useState("");
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [ticket.messages]);

  useEffect(() => {
    if (!ticket?.messages) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);


  if (!ticket) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
        Select a ticket to start chatting
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col ${isDark ? "bg-[#0b141a]" : "bg-gray-50"}`}>

      {/* CHAT HEADER */}
      <div className={`p-4 border-b flex justify-between items-center
        ${isDark ? "border-slate-800 bg-slate-900" : "border-gray-200 bg-white"}`}
      >
        {onBackMobile && (
          <button
            onClick={onBackMobile}
            className="md:hidden text-sm text-purple-400"
          >
            ← Back
          </button>
        )}

        <div>
          <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            #{ticket.ticketId} {ticket.issue}
          </h3>
          <p className="text-xs text-gray-400">
            {ticket.customerName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* ASSIGNMENT (Admin only) */}
          {showAssignment && (
            <div className="relative">
              <select
                value={ticket.assignedTo || ""}
                onChange={(e) => onAssigneeChange?.(e.target.value)}
                className={`pl-8 pr-4 py-1.5 text-xs rounded-lg border outline-none appearance-none
                  ${isDark
                    ? "bg-slate-800 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                  }`}
              >
                <option value="">Unassigned</option>
                {staffList.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
            </div>
          )}

          {/* STATUS */}
          {showStatus && (
            <div className="relative">
              <select
                value={ticket.status}
                onChange={(e) => onStatusChange?.(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold rounded-full border appearance-none"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-50" />
            </div>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {ticket.messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "system" ? (
              <div className="w-full flex justify-center">
                <div className="text-xs px-4 py-1 rounded-full border flex items-center gap-2 opacity-70">
                  <AlertCircle className="w-3 h-3" /> {msg.text}
                </div>
              </div>
            ) : (
              <div className={`p-3 rounded-xl max-w-md text-sm
                ${msg.sender === "agent"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-200"
                }`}
              >
                {msg.text}
                <div className="text-[10px] mt-1 opacity-70 text-right">
                  {msg.time}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputMsg.trim()) return;
          onSendMessage(inputMsg);
          setInputMsg("");
        }}
        className={`p-4 border-t flex gap-2
          ${isDark ? "border-slate-800 bg-slate-900" : "border-gray-200 bg-white"}`}
      >
        <input
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Type your reply..."
          className={`flex-1 px-4 py-2 rounded-lg border outline-none
            ${isDark
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
        />
        <button className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Chat;