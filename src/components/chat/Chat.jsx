

// // export default Chat;
// import React, { useEffect, useRef, useState } from "react";
// import { Send, User, ChevronDown, AlertCircle } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";

// const Chat = ({
//   ticket,
//   messages = [],
//   onSendMessage,
//   showAssignment,
//   staffList = [],
//   showStatus,
//   onAssigneeChange,
//   onStatusChange,
// }) => {
//   const { isDark } = useTheme();
//   const [inputMsg, setInputMsg] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const send = () => {
//     if (!inputMsg.trim()) return;
//     onSendMessage(inputMsg);
//     setInputMsg("");
//   };

//   return (
//     <div
//   className={`h-full flex flex-col overflow-hidden ${
//     isDark ? "bg-[#0b141a]" : "bg-gray-50"
//   }`}
// >


//       {/* HEADER */}
//       <div className={`p-4 border-b flex justify-between items-center
//         ${isDark ? "border-slate-800 bg-slate-900" : "bg-white border-gray-200"}`}
//       >
//         <div>
//           <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
//             #{ticket.ticketId} {ticket.issue}
//           </h3>
//           <p className="text-xs text-gray-400">{ticket.customerName}</p>
//         </div>

//         <div className="flex gap-3">
//           {showAssignment && (
//             <div className="relative">
//               <select
//                 value={ticket.assignedTo || ""}
//                 onChange={(e) => onAssigneeChange?.(e.target.value)}
//                 className="pl-8 pr-4 py-1.5 text-xs rounded-lg border"
//               >
//                 <option value="">Unassigned</option>
//                 {staffList.map(s => (
//                   <option key={s.id} value={s.id}>{s.name}</option>
//                 ))}
//               </select>
//               <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
//             </div>
//           )}

//           {showStatus && (
//             <div className="relative">
//               <select
//                 value={ticket.status}
//                 onChange={(e) => onStatusChange?.(e.target.value)}
//                 className="px-3 py-1.5 text-xs rounded-full border"
//               >
//                 <option value="OPEN">Open</option>
//                 <option value="ASSIGNED">Assigned</option>
//                 <option value="CLOSED">Closed</option>
//               </select>
//               <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-50" />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* MESSAGES */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">

//         {messages.map(msg => {
//           const isAgent = ["ADMIN", "ADMIN_STAFF"].includes(msg.senderRole);

//           if (msg.senderRole === "SYSTEM") {
//             return (
//               <div key={msg._id} className="flex justify-center">
//                 <div className="text-xs px-4 py-1 rounded-full border flex gap-2 opacity-70">
//                   <AlertCircle className="w-3 h-3" /> {msg.message}
//                 </div>
//               </div>
//             );
//           }

//           return (
//             <div key={msg._id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
//               <div className={`p-3 rounded-xl max-w-md text-sm
//                 ${isAgent ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-200"}`}
//               >
//                 {msg.message}
//                 <div className="text-[10px] mt-1 opacity-70 text-right">
//                   {new Date(msg.createdAt).toLocaleTimeString()}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* INPUT */}
//       <form
//         onSubmit={(e) => { e.preventDefault(); send(); }}
//         className={`p-4 border-t flex gap-2
//           ${isDark ? "border-slate-800 bg-slate-900" : "bg-white border-gray-200"}`}
//       >
//         <input
//           value={inputMsg}
//           onChange={(e) => setInputMsg(e.target.value)}
//           placeholder="Type your reply..."
//           className="flex-1 px-4 py-2 rounded-lg border outline-none"
//         />
//         <button className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg">
//           <Send className="w-4 h-4" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;


import React, { useEffect, useRef, useState, useCallback } from "react";
import { 
  Send, 
  User, 
  ChevronDown, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  MoreVertical, 
  Smile, 
  Paperclip,
  Mic,
  Bot
} from "lucide-react";
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
  isDark = false,
  customerEmail,
  customerPhone,
  createdAt
}) => {
  const { isDark: themeDark } = useTheme();
  const darkMode = isDark || themeDark;
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  }, []);

  // Handle sending message
  const send = useCallback(() => {
    if (!inputMsg.trim()) return;
    onSendMessage(inputMsg);
    setInputMsg("");
    // Focus input after sending
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [inputMsg, onSendMessage]);

  // Handle Enter key
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }, [send]);

  // Get status styles
  const getStatusStyles = (status) => {
    const base = "text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1.5";
    
    if (darkMode) {
      switch(status?.toLowerCase()) {
        case 'open': return `${base} bg-blue-500/20 text-blue-300 border border-blue-500/30`;
        case 'pending': return `${base} bg-amber-500/20 text-amber-300 border border-amber-500/30`;
        case 'resolved': return `${base} bg-emerald-500/20 text-emerald-300 border border-emerald-500/30`;
        case 'closed': return `${base} bg-gray-800 text-gray-300 border border-gray-700`;
        default: return `${base} bg-gray-800 text-gray-300 border border-gray-700`;
      }
    } else {
      switch(status?.toLowerCase()) {
        case 'open': return `${base} bg-blue-100 text-blue-700 border border-blue-200`;
        case 'pending': return `${base} bg-amber-100 text-amber-700 border border-amber-200`;
        case 'resolved': return `${base} bg-emerald-100 text-emerald-700 border border-emerald-200`;
        case 'closed': return `${base} bg-gray-200 text-gray-700 border border-gray-300`;
        default: return `${base} bg-gray-200 text-gray-700 border border-gray-300`;
      }
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'open': return <AlertCircle className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'resolved': return <CheckCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`h-full flex flex-col overflow-hidden transition-all duration-300
      ${darkMode ? "bg-gradient-to-b from-gray-900 to-gray-950" : "bg-gradient-to-b from-gray-50 to-gray-100"}`}
    >
      {/* HEADER - Enhanced */}
      <div className={`p-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0
        ${darkMode 
          ? "border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950" 
          : "border-gray-200 bg-white"
        } shadow-sm`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-base truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                #{ticket.ticketId} • {ticket.customerName}
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {ticket.issue || "Customer Support"}
                </p>
                {(customerEmail || customerPhone) && (
                  <div className="hidden md:flex items-center gap-2 text-xs">
                    {customerEmail && (
                      <span className={`px-2 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {customerEmail}
                      </span>
                    )}
                    {customerPhone && (
                      <span className={`px-2 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {customerPhone}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {createdAt && (
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Created: {formatDate(createdAt)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showAssignment && (
            <div className="relative group">
              <select
                value={ticket.assignedTo || ""}
                onChange={(e) => onAssigneeChange?.(e.target.value)}
                className={`appearance-none pl-9 pr-8 py-2 text-xs rounded-lg border transition-all duration-200
                  ${darkMode 
                    ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" 
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
              >
                <option value="">Unassigned</option>
                {staffList.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <User className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
              />
              <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
              />
            </div>
          )}

          {showStatus && (
            <div className="relative group">
              <select
                value={ticket.status}
                onChange={(e) => onStatusChange?.(e.target.value)}
                className={`appearance-none pl-9 pr-8 py-2 text-xs rounded-lg border transition-all duration-200
                  ${darkMode 
                    ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" 
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
              >
                <option value="OPEN">Open</option>
                <option value="PENDING">Pending</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
              <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 
                ${getStatusStyles(ticket.status).includes('text-blue') ? 'text-blue-400' : 
                  getStatusStyles(ticket.status).includes('text-amber') ? 'text-amber-400' : 
                  getStatusStyles(ticket.status).includes('text-emerald') ? 'text-emerald-400' : 
                  'text-gray-400'}`}
              >
                {getStatusIcon(ticket.status)}
              </div>
              <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
              />
            </div>
          )}

          <button className={`p-2 rounded-lg transition-all duration-200
            ${darkMode 
              ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700"
            }`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MESSAGES CONTAINER */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain scroll-smooth"
      >
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className={`p-4 rounded-2xl mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Bot className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Start a Conversation
            </h3>
            <p className={`max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              This is the beginning of your conversation with {ticket.customerName}. 
              Send your first message to get started!
            </p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isAgent = ["ADMIN", "ADMIN_STAFF"].includes(msg.senderRole);
          const isSystem = msg.senderRole === "SYSTEM";
          const showDate = index === 0 || 
            new Date(msg.createdAt).toDateString() !== 
            new Date(messages[index - 1]?.createdAt).toDateString();

          // Date separator
          if (showDate) {
            return (
              <React.Fragment key={`date-${msg._id}`}>
                <div className="flex justify-center my-4">
                  <div className={`text-xs px-3 py-1 rounded-full ${
                    darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {formatDate(msg.createdAt)}
                  </div>
                </div>
                
                {isSystem ? (
                  <div key={msg._id} className="flex justify-center animate-fade-in">
                    <div className={`text-xs px-4 py-2 rounded-xl border flex items-center gap-2 max-w-md ${
                      darkMode 
                        ? 'bg-gray-800/50 border-gray-700 text-gray-400' 
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                    }`}>
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> 
                      <span>{msg.message}</span>
                    </div>
                  </div>
                ) : (
                  <div key={msg._id} className={`flex ${isAgent ? "justify-end" : "justify-start"} animate-slide-in`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] md:max-w-[70%] shadow-sm transition-all duration-200
                      ${isAgent 
                        ? darkMode 
                          ? "bg-blue-600 text-white rounded-br-none" 
                          : "bg-blue-500 text-white rounded-br-none"
                        : darkMode
                          ? "bg-gray-800 text-gray-100 rounded-bl-none"
                          : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {msg.message}
                      </p>
                      <div className={`text-xs mt-2 flex justify-end items-center gap-1 ${
                        isAgent 
                          ? "text-blue-200/80" 
                          : darkMode 
                            ? "text-gray-400" 
                            : "text-gray-500"
                      }`}>
                        {formatTime(msg.createdAt)}
                        {isAgent && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          }

          if (isSystem) {
            return (
              <div key={msg._id} className="flex justify-center animate-fade-in">
                <div className={`text-xs px-4 py-2 rounded-xl border flex items-center gap-2 max-w-md ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-gray-400' 
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}>
                  <AlertCircle className="w-3 h-3 flex-shrink-0" /> 
                  <span>{msg.message}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={msg._id} className={`flex ${isAgent ? "justify-end" : "justify-start"} animate-slide-in`}>
              <div className={`p-3 rounded-2xl max-w-[85%] md:max-w-[70%] shadow-sm transition-all duration-200
                ${isAgent 
                  ? darkMode 
                    ? "bg-blue-600 text-white rounded-br-none" 
                    : "bg-blue-500 text-white rounded-br-none"
                  : darkMode
                    ? "bg-gray-800 text-gray-100 rounded-bl-none"
                    : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {msg.message}
                </p>
                <div className={`text-xs mt-2 flex justify-end items-center gap-1 ${
                  isAgent 
                    ? "text-blue-200/80" 
                    : darkMode 
                      ? "text-gray-400" 
                      : "text-gray-500"
                }`}>
                  {formatTime(msg.createdAt)}
                  {isAgent && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
                      You
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className={`p-3 rounded-2xl max-w-[70%] ${
              darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA - Enhanced */}
      <div className={`p-4 border-t transition-all duration-300
        ${darkMode 
          ? "border-gray-800 bg-gradient-to-t from-gray-900 to-gray-950" 
          : "border-gray-200 bg-white"
        }`}
      >
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex items-end gap-2"
        >
          {/* Attachment buttons */}
          <div className="hidden md:flex items-center gap-1">
            <button
              type="button"
              className={`p-2 rounded-lg transition-all duration-200
                ${darkMode 
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              className={`p-2 rounded-lg transition-all duration-200
                ${darkMode 
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>

          {/* Message input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              rows={1}
              className={`w-full px-4 py-3 rounded-xl border resize-none transition-all duration-200
                ${darkMode 
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-blue-500" 
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
              style={{ maxHeight: '120px', minHeight: '44px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />
            
            {/* Character count */}
            {inputMsg.length > 0 && (
              <div className={`absolute right-2 bottom-2 text-xs ${
                inputMsg.length > 400 
                  ? 'text-red-500' 
                  : darkMode 
                    ? 'text-gray-500' 
                    : 'text-gray-400'
              }`}>
                {inputMsg.length}/500
              </div>
            )}
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={!inputMsg.trim()}
            className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0
              ${inputMsg.trim()
                ? darkMode
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-lg"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                : darkMode
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              } transform active:scale-95`}
          >
            <Send className="w-4 h-4" />
          </button>

          {/* Voice button (mobile) */}
          <button
            type="button"
            className={`md:hidden p-3 rounded-xl transition-all duration-200
              ${darkMode 
                ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
          >
            <Mic className="w-4 h-4" />
          </button>
        </form>
        
        {/* Quick actions */}
        <div className="flex items-center gap-2 mt-3 text-xs">
          <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Press Enter to send
          </span>
          <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
          <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Shift + Enter for new line
          </span>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto {
          scrollbar-width: thin;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${darkMode ? '#1f2937' : '#f3f4f6'};
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#4b5563' : '#d1d5db'};
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#6b7280' : '#9ca3af'};
        }
      `}</style>
    </div>
  );
};

export default Chat;