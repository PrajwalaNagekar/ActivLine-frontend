

// // // // export default Chat;
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Send, User, ChevronDown, AlertCircle } from "lucide-react";
// // // import { useTheme } from "../../context/ThemeContext";

// // // const Chat = ({
// // //   ticket,
// // //   messages = [],
// // //   onSendMessage,
// // //   showAssignment,
// // //   staffList = [],
// // //   showStatus,
// // //   onAssigneeChange,
// // //   onStatusChange,
// // // }) => {
// // //   const { isDark } = useTheme();
// // //   const [inputMsg, setInputMsg] = useState("");
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages]);

// // //   const send = () => {
// // //     if (!inputMsg.trim()) return;
// // //     onSendMessage(inputMsg);
// // //     setInputMsg("");
// // //   };

// // //   return (
// // //     <div
// // //   className={`h-full flex flex-col overflow-hidden ${
// // //     isDark ? "bg-[#0b141a]" : "bg-gray-50"
// // //   }`}
// // // >


// // //       {/* HEADER */}
// // //       <div className={`p-4 border-b flex justify-between items-center
// // //         ${isDark ? "border-slate-800 bg-slate-900" : "bg-white border-gray-200"}`}
// // //       >
// // //         <div>
// // //           <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
// // //             #{ticket.ticketId} {ticket.issue}
// // //           </h3>
// // //           <p className="text-xs text-gray-400">{ticket.customerName}</p>
// // //         </div>

// // //         <div className="flex gap-3">
// // //           {showAssignment && (
// // //             <div className="relative">
// // //               <select
// // //                 value={ticket.assignedTo || ""}
// // //                 onChange={(e) => onAssigneeChange?.(e.target.value)}
// // //                 className="pl-8 pr-4 py-1.5 text-xs rounded-lg border"
// // //               >
// // //                 <option value="">Unassigned</option>
// // //                 {staffList.map(s => (
// // //                   <option key={s.id} value={s.id}>{s.name}</option>
// // //                 ))}
// // //               </select>
// // //               <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
// // //             </div>
// // //           )}

// // //           {showStatus && (
// // //             <div className="relative">
// // //               <select
// // //                 value={ticket.status}
// // //                 onChange={(e) => onStatusChange?.(e.target.value)}
// // //                 className="px-3 py-1.5 text-xs rounded-full border"
// // //               >
// // //                 <option value="OPEN">Open</option>
// // //                 <option value="ASSIGNED">Assigned</option>
// // //                 <option value="CLOSED">Closed</option>
// // //               </select>
// // //               <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-50" />
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* MESSAGES */}
// // //       <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">

// // //         {messages.map(msg => {
// // //           const isAgent = ["ADMIN", "ADMIN_STAFF"].includes(msg.senderRole);

// // //           if (msg.senderRole === "SYSTEM") {
// // //             return (
// // //               <div key={msg._id} className="flex justify-center">
// // //                 <div className="text-xs px-4 py-1 rounded-full border flex gap-2 opacity-70">
// // //                   <AlertCircle className="w-3 h-3" /> {msg.message}
// // //                 </div>
// // //               </div>
// // //             );
// // //           }

// // //           return (
// // //             <div key={msg._id} className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
// // //               <div className={`p-3 rounded-xl max-w-md text-sm
// // //                 ${isAgent ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-200"}`}
// // //               >
// // //                 {msg.message}
// // //                 <div className="text-[10px] mt-1 opacity-70 text-right">
// // //                   {new Date(msg.createdAt).toLocaleTimeString()}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //         <div ref={messagesEndRef} />
// // //       </div>

// // //       {/* INPUT */}
// // //       <form
// // //         onSubmit={(e) => { e.preventDefault(); send(); }}
// // //         className={`p-4 border-t flex gap-2
// // //           ${isDark ? "border-slate-800 bg-slate-900" : "bg-white border-gray-200"}`}
// // //       >
// // //         <input
// // //           value={inputMsg}
// // //           onChange={(e) => setInputMsg(e.target.value)}
// // //           placeholder="Type your reply..."
// // //           className="flex-1 px-4 py-2 rounded-lg border outline-none"
// // //         />
// // //         <button className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg">
// // //           <Send className="w-4 h-4" />
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Chat;


// // import React, { useEffect, useRef, useState, useCallback } from "react";
// // import { 
// //   Send, 
// //   User, 
// //   ChevronDown, 
// //   AlertCircle, 
// //   Clock, 
// //   CheckCircle, 
// //   MoreVertical, 
// //   Smile, 
// //   Paperclip,
// //   Mic,
// //   Bot
// // } from "lucide-react";
// // import { useTheme } from "../../context/ThemeContext";
// // import EmojiPicker from "emoji-picker-react";

// // const Chat = ({
// //   ticket,
// //   messages = [],
// //   onSendMessage,
// //   showAssignment,
// //   staffList = [],
// //   showStatus,
// //   onAssigneeChange,
// //   onStatusChange,
// //   isDark = false,
// //   customerEmail,
// //   customerPhone,
// //   createdAt
// // }) => {
// //   const { isDark: themeDark } = useTheme();
// //   const darkMode = isDark || themeDark;
// //   const [inputMsg, setInputMsg] = useState("");
// //   const [isTyping, setIsTyping] = useState(false);
// //   const messagesEndRef = useRef(null);
// //   const messagesContainerRef = useRef(null);
// //   const inputRef = useRef(null);
// //   const [showEmoji, setShowEmoji] = useState(false);
// //   const fileInputRef = useRef(null);
// //   // Auto-scroll to bottom
// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   const scrollToBottom = useCallback(() => {
// //     messagesEndRef.current?.scrollIntoView({ 
// //       behavior: "smooth",
// //       block: "end"
// //     });
// //   }, []);

// //   // Handle sending message
// //   const send = useCallback(() => {
// //     if (!inputMsg.trim()) return;
// //     onSendMessage(inputMsg);
// //     setInputMsg("");
// //     // Focus input after sending
// //     setTimeout(() => inputRef.current?.focus(), 100);
// //   }, [inputMsg, onSendMessage]);

// //   // Handle Enter key
// //   const handleKeyPress = useCallback((e) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       send();
// //     }
// //   }, [send]);
// // const ALLOWED_STATUS_TRANSITIONS = {
// //   OPEN: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
// //   ASSIGNED: ["IN_PROGRESS", "RESOLVED", "CLOSED","OPEN"],
// //   IN_PROGRESS: ["IN_PROGRESS", "RESOLVED", "CLOSED"],
// //   RESOLVED: ["RESOLVED", "OPEN", "IN_PROGRESS", "CLOSED"],
// //   CLOSED: ["CLOSED"],
// // };

// //   // Get status styles
// //   const getStatusStyles = (status) => {
// //     const base = "text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1.5";
    
// //     if (darkMode) {
// //       switch(status?.toLowerCase()) {
// //         case 'open': return `${base} bg-blue-500/20 text-blue-300 border border-blue-500/30`;
// //         case 'pending': return `${base} bg-amber-500/20 text-amber-300 border border-amber-500/30`;
// //         case 'resolved': return `${base} bg-emerald-500/20 text-emerald-300 border border-emerald-500/30`;
// //         case 'closed': return `${base} bg-gray-800 text-gray-300 border border-gray-700`;
// //         default: return `${base} bg-gray-800 text-gray-300 border border-gray-700`;
// //       }
// //     } else {
// //       switch(status?.toLowerCase()) {
// //         case 'open': return `${base} bg-blue-100 text-blue-700 border border-blue-200`;
// //         case 'pending': return `${base} bg-amber-100 text-amber-700 border border-amber-200`;
// //         case 'resolved': return `${base} bg-emerald-100 text-emerald-700 border border-emerald-200`;
// //         case 'closed': return `${base} bg-gray-200 text-gray-700 border border-gray-300`;
// //         default: return `${base} bg-gray-200 text-gray-700 border border-gray-300`;
// //       }
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     switch(status?.toLowerCase()) {
// //       case 'open': return <AlertCircle className="w-3 h-3" />;
// //       case 'pending': return <Clock className="w-3 h-3" />;
// //       case 'resolved': return <CheckCircle className="w-3 h-3" />;
// //       default: return <AlertCircle className="w-3 h-3" />;
// //     }
// //   };

// //   // Format time
// //   const formatTime = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// //   };

// //   // Format date
// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString([], { 
// //       month: 'short', 
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   };
// // const onEmojiClick = (emojiData) => {
// //   setInputMsg(prev => prev + emojiData.emoji);
// // };

// //   return (
// //     <div className={`h-full flex flex-col overflow-hidden transition-all duration-300
// //       ${darkMode ? "bg-gradient-to-b from-gray-900 to-gray-950" : "bg-gradient-to-b from-gray-50 to-gray-100"}`}
// //     >
// //       {/* HEADER - Enhanced */}
// //       <div className={`p-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0
// //         ${darkMode 
// //           ? "border-gray-800 bg-gradient-to-r from-gray-900 to-gray-950" 
// //           : "border-gray-200 bg-white"
// //         } shadow-sm`}
// //       >
// //         <div className="flex-1 min-w-0">
// //           <div className="flex items-center gap-2 mb-1">
// //             <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
// //               <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
// //             </div>
// //             <div className="flex-1 min-w-0">
// //               <h3 className={`font-bold text-base truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
// //                 #{ticket.ticketId} • {ticket.customerName}
// //               </h3>
// //               <div className="flex items-center gap-3 flex-wrap">
// //                 <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
// //                   {ticket.issue || "Customer Support"}
// //                 </p>
// //                 {(customerEmail || customerPhone) && (
// //                   <div className="hidden md:flex items-center gap-2 text-xs">
// //                     {customerEmail && (
// //                       <span className={`px-2 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
// //                         {customerEmail}
// //                       </span>
// //                     )}
// //                     {customerPhone && (
// //                       <span className={`px-2 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
// //                         {customerPhone}
// //                       </span>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
          
// //           {createdAt && (
// //             <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
// //               Created: {formatDate(createdAt)}
// //             </p>
// //           )}
// //         </div>

// //         <div className="flex items-center gap-2">
// //           {showAssignment && (
// //             <div className="relative group">
// //               <select
// //                 value={ticket.assignedTo || ""}
// //                 onChange={(e) => {
// //   const value = e.target.value;
// //   onAssigneeChange?.(value || null);
// // }}

// //                 className={`appearance-none pl-9 pr-8 py-2 text-xs rounded-lg border transition-all duration-200
// //                   ${darkMode 
// //                     ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" 
// //                     : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
// //                   } focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500`}
// //               >
              
// //                {staffList.map(s => (
// //   <option key={s._id} value={s._id}>
// //     {s.name}
// //   </option>
// // ))}

// //               </select>
// //               <User className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 
// //                 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
// //               />
// //               <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 
// //                 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
// //               />
// //             </div>
// //           )}

// //           {showStatus && (
// //             <div className="relative group">
// //               <select
// //   value={ticket.status}
// //   disabled={ticket.status === "CLOSED"}
// //   onChange={(e) => onStatusChange?.(e.target.value)}
// //   className={`appearance-none pl-9 pr-8 py-2 text-xs rounded-lg border transition-all duration-200
// //     ${darkMode
// //       ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
// //       : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
// //     }
// //     focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
// //     disabled:opacity-60 disabled:cursor-not-allowed
// //   `}
// // >
// //   {(ALLOWED_STATUS_TRANSITIONS[ticket.status] || []).map(status => (
// //     <option key={status} value={status}>
// //       {status.replace("_", " ")}
// //     </option>
// //   ))}
// // </select>

// //               <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 
// //                 ${getStatusStyles(ticket.status).includes('text-blue') ? 'text-blue-400' : 
// //                   getStatusStyles(ticket.status).includes('text-amber') ? 'text-amber-400' : 
// //                   getStatusStyles(ticket.status).includes('text-emerald') ? 'text-emerald-400' : 
// //                   'text-gray-400'}`}
// //               >
// //                 {getStatusIcon(ticket.status)}
// //               </div>
// //               <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 
// //                 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
// //               />
// //             </div>
// //           )}

// //           <button className={`p-2 rounded-lg transition-all duration-200
// //             ${darkMode 
// //               ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300" 
// //               : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700"
// //             }`}
// //           >
// //             <MoreVertical className="w-4 h-4" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* MESSAGES CONTAINER */}
// //       <div 
// //         ref={messagesContainerRef}
// //         className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain scroll-smooth"
// //       >
// //         {/* Welcome message */}
// //         {messages.length === 0 && (
// //           <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
// //             <div className={`p-4 rounded-2xl mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
// //               <Bot className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
// //             </div>
// //             <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
// //               Start a Conversation
// //             </h3>
// //             <p className={`max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
// //               This is the beginning of your conversation with {ticket.customerName}. 
// //               Send your first message to get started!
// //             </p>
// //           </div>
// //         )}

// //         {messages.map((msg, index) => {
// //           const isAgent = ["ADMIN", "ADMIN_STAFF"].includes(msg.senderRole);
// //           const isSystem = msg.senderRole === "SYSTEM";
// //           const showDate = index === 0 || 
// //             new Date(msg.createdAt).toDateString() !== 
// //             new Date(messages[index - 1]?.createdAt).toDateString();

// //           // Date separator
// //           if (showDate) {
// //             return (
// //               <React.Fragment key={`date-${msg._id}`}>
// //                 <div className="flex justify-center my-4">
// //                   <div className={`text-xs px-3 py-1 rounded-full ${
// //                     darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
// //                   }`}>
// //                     {formatDate(msg.createdAt)}
// //                   </div>
// //                 </div>
                
// //                 {isSystem ? (
// //                   <div key={msg._id} className="flex justify-center animate-fade-in">
// //                     <div className={`text-xs px-4 py-2 rounded-xl border flex items-center gap-2 max-w-md ${
// //                       darkMode 
// //                         ? 'bg-gray-800/50 border-gray-700 text-gray-400' 
// //                         : 'bg-gray-100 border-gray-300 text-gray-600'
// //                     }`}>
// //                       <AlertCircle className="w-3 h-3 flex-shrink-0" /> 
// //                       <span>{msg.message}</span>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div key={msg._id} className={`flex ${isAgent ? "justify-end" : "justify-start"} animate-slide-in`}>
// //                     <div className={`p-3 rounded-2xl max-w-[85%] md:max-w-[70%] shadow-sm transition-all duration-200
// //                       ${isAgent 
// //                         ? darkMode 
// //                           ? "bg-blue-600 text-white rounded-br-none" 
// //                           : "bg-blue-500 text-white rounded-br-none"
// //                         : darkMode
// //                           ? "bg-gray-800 text-gray-100 rounded-bl-none"
// //                           : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
// //                       }`}
// //                     >
// //                       <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
// //                         {msg.message}
// //                       </p>
// //                       <div className={`text-xs mt-2 flex justify-end items-center gap-1 ${
// //                         isAgent 
// //                           ? "text-blue-200/80" 
// //                           : darkMode 
// //                             ? "text-gray-400" 
// //                             : "text-gray-500"
// //                       }`}>
// //                         {formatTime(msg.createdAt)}
// //                         {isAgent && (
// //                           <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
// //                             You
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </React.Fragment>
// //             );
// //           }

// //           if (isSystem) {
// //             return (
// //               <div key={msg._id} className="flex justify-center animate-fade-in">
// //                 <div className={`text-xs px-4 py-2 rounded-xl border flex items-center gap-2 max-w-md ${
// //                   darkMode 
// //                     ? 'bg-gray-800/50 border-gray-700 text-gray-400' 
// //                     : 'bg-gray-100 border-gray-300 text-gray-600'
// //                 }`}>
// //                   <AlertCircle className="w-3 h-3 flex-shrink-0" /> 
// //                   <span>{msg.message}</span>
// //                 </div>
// //               </div>
// //             );
// //           }

// //           return (
// //             <div key={msg._id} className={`flex ${isAgent ? "justify-end" : "justify-start"} animate-slide-in`}>
// //               <div className={`p-3 rounded-2xl max-w-[85%] md:max-w-[70%] shadow-sm transition-all duration-200
// //                 ${isAgent 
// //                   ? darkMode 
// //                     ? "bg-blue-600 text-white rounded-br-none" 
// //                     : "bg-blue-500 text-white rounded-br-none"
// //                   : darkMode
// //                     ? "bg-gray-800 text-gray-100 rounded-bl-none"
// //                     : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
// //                 }`}
// //               >
// //                 <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
// //                   {msg.message}
// //                 </p>
// //                 <div className={`text-xs mt-2 flex justify-end items-center gap-1 ${
// //                   isAgent 
// //                     ? "text-blue-200/80" 
// //                     : darkMode 
// //                       ? "text-gray-400" 
// //                       : "text-gray-500"
// //                 }`}>
// //                   {formatTime(msg.createdAt)}
// //                   {isAgent && (
// //                     <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
// //                       You
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         })}
        
// //         {/* Typing indicator */}
// //         {isTyping && (
// //           <div className="flex justify-start animate-fade-in">
// //             <div className={`p-3 rounded-2xl max-w-[70%] ${
// //               darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
// //             }`}>
// //               <div className="flex items-center gap-1">
// //                 <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
// //                 <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
// //                 <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
        
// //         <div ref={messagesEndRef} />
// //       </div>

// //       {/* INPUT AREA - Enhanced */}
// //       <div className={`p-4 border-t transition-all duration-300
// //         ${darkMode 
// //           ? "border-gray-800 bg-gradient-to-t from-gray-900 to-gray-950" 
// //           : "border-gray-200 bg-white"
// //         }`}
// //       >
// //         <form
// //           onSubmit={(e) => { e.preventDefault(); send(); }}
// //           className="flex items-end gap-2"
// //         >
// //           {/* Attachment buttons */}
// //           {/* <div className="hidden md:flex items-center gap-1">
// //             <button
// //               type="button"
// //               className={`p-2 rounded-lg transition-all duration-200
// //                 ${darkMode 
// //                   ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800" 
// //                   : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
// //                 }`}
// //             >
// //               <Paperclip className="w-4 h-4" />
// //             </button>
// //             <button
// //               type="button"
// //               className={`p-2 rounded-lg transition-all duration-200
// //                 ${darkMode 
// //                   ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800" 
// //                   : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
// //                 }`}
// //             >
// //               <Smile className="w-4 h-4" />
// //             </button>
// //           </div> */}
// // <form
// //   onSubmit={(e) => {
// //     e.preventDefault();
// //     send();
// //     setShowEmoji(false);
// //   }}
// //   className="flex items-end gap-2"
// // >
// //   {/* TEXTAREA + ICONS */}
// //   <div className="flex-1 relative">
// //     <textarea
// //       ref={inputRef}
// //       value={inputMsg}
// //       onChange={(e) => {
// //         setInputMsg(e.target.value);
// //         setShowEmoji(false);
// //       }}
// //       onKeyDown={handleKeyPress}
// //       placeholder="Type your message here..."
// //       rows={1}
// //       className={`w-full px-4 pr-20 py-3 rounded-xl border resize-none transition-all duration-200
// //         ${darkMode
// //           ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
// //           : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
// //         } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
// //       style={{ maxHeight: "120px", minHeight: "44px" }}
// //       onInput={(e) => {
// //         e.target.style.height = "auto";
// //         e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
// //       }}
// //     />

// //     {/* ICON BUTTONS */}
// //     <div className="absolute right-2 bottom-2 flex items-center gap-1">
// //       {/* FILE UPLOAD */}
// //       <button
// //         type="button"
// //         onClick={() => fileInputRef.current.click()}
// //         className={`p-1.5 rounded-md transition
// //           ${darkMode
// //             ? "text-gray-400 hover:bg-gray-700"
// //             : "text-gray-500 hover:bg-gray-200"
// //           }`}
// //       >
// //         <Paperclip className="w-4 h-4" />
// //       </button>

// //       {/* EMOJI */}
// //       <button
// //         type="button"
// //         onClick={() => setShowEmoji(prev => !prev)}
// //         className={`p-1.5 rounded-md transition
// //           ${darkMode
// //             ? "text-gray-400 hover:bg-gray-700"
// //             : "text-gray-500 hover:bg-gray-200"
// //           }`}
// //       >
// //         <Smile className="w-4 h-4" />
// //       </button>
// //     </div>

// //     {/* EMOJI PICKER */}
// //     {showEmoji && (
// //       <div className="absolute bottom-14 right-2 z-50">
// //         <EmojiPicker
// //           onEmojiClick={onEmojiClick}
// //           theme={darkMode ? "dark" : "light"}
// //           height={350}
// //           width={300}
// //         />
// //       </div>
// //     )}
// //   </div>

// //   {/* SEND */}
// //   <button
// //     type="submit"
// //     disabled={!inputMsg.trim()}
// //     className={`p-3 rounded-xl transition
// //       ${inputMsg.trim()
// //         ? "bg-blue-600 text-white"
// //         : "bg-gray-300 text-gray-500 cursor-not-allowed"
// //       }`}
// //   >
// //     <Send className="w-4 h-4" />
// //   </button>

// //   {/* HIDDEN FILE INPUT */}
// //   <input
// //     type="file"
// //     ref={fileInputRef}
// //     hidden
// //     multiple
// //     onChange={(e) => {
// //       const files = Array.from(e.target.files);
// //       console.log("FILES:", files); // backend next
// //       e.target.value = "";
// //     }}
// //   />
// // </form>


// //           {/* Message input */}
// //           <div className="flex-1 relative">
// //             <textarea
// //               ref={inputRef}
// //               value={inputMsg}
// //               onChange={(e) => setInputMsg(e.target.value)}
// //               onKeyDown={handleKeyPress}
// //               placeholder="Type your message here..."
// //               rows={1}
// //               className={`w-full px-4 py-3 rounded-xl border resize-none transition-all duration-200
// //                 ${darkMode 
// //                   ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-blue-500" 
// //                   : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500"
// //                 } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
// //               style={{ maxHeight: '120px', minHeight: '44px' }}
// //               onInput={(e) => {
// //                 e.target.style.height = 'auto';
// //                 e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
// //               }}
// //             />
            
// //             {/* Character count */}
// //             {inputMsg.length > 0 && (
// //               <div className={`absolute right-2 bottom-2 text-xs ${
// //                 inputMsg.length > 400 
// //                   ? 'text-red-500' 
// //                   : darkMode 
// //                     ? 'text-gray-500' 
// //                     : 'text-gray-400'
// //               }`}>
// //                 {inputMsg.length}/500
// //               </div>
// //             )}
// //           </div>

// //           {/* Send button */}
// //           <button
// //             type="submit"
// //             disabled={!inputMsg.trim()}
// //             className={`p-3 rounded-xl transition-all duration-300 flex-shrink-0
// //               ${inputMsg.trim()
// //                 ? darkMode
// //                   ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-lg"
// //                   : "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
// //                 : darkMode
// //                   ? "bg-gray-800 text-gray-600 cursor-not-allowed"
// //                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
// //               } transform active:scale-95`}
// //           >
// //             <Send className="w-4 h-4" />
// //           </button>

// //           {/* Voice button (mobile) */}
// //           <button
// //             type="button"
// //             className={`md:hidden p-3 rounded-xl transition-all duration-200
// //               ${darkMode 
// //                 ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800" 
// //                 : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
// //               }`}
// //           >
// //             <Mic className="w-4 h-4" />
// //           </button>
// //         </form>
        
// //         {/* Quick actions */}
// //         <div className="flex items-center gap-2 mt-3 text-xs">
// //           <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
// //             Press Enter to send
// //           </span>
// //           <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
// //           <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
// //             Shift + Enter for new line
// //           </span>
// //         </div>
// //       </div>

// //       {/* Add CSS animations */}
// //       <style>{`
// //         @keyframes fade-in {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
        
// //         @keyframes slide-in {
// //           from { opacity: 0; transform: translateX(10px); }
// //           to { opacity: 1; transform: translateX(0); }
// //         }
        
// //         .animate-fade-in {
// //           animation: fade-in 0.3s ease-out forwards;
// //         }
        
// //         .animate-slide-in {
// //           animation: slide-in 0.3s ease-out forwards;
// //         }
        
// //         /* Custom scrollbar */
// //         .overflow-y-auto {
// //           scrollbar-width: thin;
// //         }
        
// //         .overflow-y-auto::-webkit-scrollbar {
// //           width: 6px;
// //         }
        
// //         .overflow-y-auto::-webkit-scrollbar-track {
// //           background: ${darkMode ? '#1f2937' : '#f3f4f6'};
// //           border-radius: 3px;
// //         }
        
// //         .overflow-y-auto::-webkit-scrollbar-thumb {
// //           background: ${darkMode ? '#4b5563' : '#d1d5db'};
// //           border-radius: 3px;
// //         }
        
// //         .overflow-y-auto::-webkit-scrollbar-thumb:hover {
// //           background: ${darkMode ? '#6b7280' : '#9ca3af'};
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Chat;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { 
//   Send, 
//   User, 
//   ChevronDown, 
//   AlertCircle, 
//   Clock, 
//   CheckCircle, 
//   MoreVertical, 
//   Smile, 
//   Paperclip,
//   Mic,
//   Bot,
//   Sparkles,
//   Zap,
//   Star,
//   ThumbsUp,
//   Download,
//   Image as ImageIcon,
//   FileText,
//   Video,
//   Pin,
//   Copy,
//   Trash2,
//   Phone,
//   Mail,
//   Calendar,
//   Tag,
//   MessageSquare,
//   BarChart2,
//   Shield,
//   Globe,
//   Moon,
//   Sun,
//   Maximize2,
//   Minimize2,
//   Link,
//   Hash,
//   TrendingUp,
//   Crown,
//   Coffee,
//   Rocket,
//   Feather
// } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";
// import EmojiPicker from "emoji-picker-react";

// const Chat = ({
//   ticket,
//   messages = [],
//   onSendMessage,
//   showAssignment,
//   staffList = [],
//   showStatus,
//   onAssigneeChange,
//   onStatusChange,
//   isDark = false,
//   customerEmail,
//   customerPhone,
//   createdAt
// }) => {
//   const { isDark: themeDark, toggleTheme } = useTheme();
//   const darkMode = isDark || themeDark;
//   const [inputMsg, setInputMsg] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const messagesContainerRef = useRef(null);
//   const inputRef = useRef(null);
//   const [showEmoji, setShowEmoji] = useState(false);
//   const fileInputRef = useRef(null);
//   const [activeReactions, setActiveReactions] = useState({});
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [pinnedMessages, setPinnedMessages] = useState([]);
//   const [showQuickActions, setShowQuickActions] = useState(false);
//   const [messageStats, setMessageStats] = useState({
//     total: 0,
//     agent: 0,
//     customer: 0
//   });

//   const quickReactions = ["👍", "❤️", "😄", "🎉", "🔥", "🚀", "⭐", "👏"];

//   useEffect(() => {
//     scrollToBottom();
//     const agentMsgs = messages.filter(m => ["ADMIN", "ADMIN_STAFF"].includes(m.senderRole)).length;
//     const customerMsgs = messages.filter(m => !["ADMIN", "ADMIN_STAFF", "SYSTEM"].includes(m.senderRole)).length;
//     setMessageStats({
//       total: messages.length,
//       agent: agentMsgs,
//       customer: customerMsgs
//     });
//   }, [messages]);

//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ 
//       behavior: "smooth",
//       block: "nearest"
//     });
//   }, []);

//   const send = useCallback(() => {
//     if (!inputMsg.trim()) return;
//     onSendMessage(inputMsg);
//     setInputMsg("");
//     setShowEmoji(false);
//     setTimeout(() => inputRef.current?.focus(), 100);
//   }, [inputMsg, onSendMessage]);

//   const handleKeyPress = useCallback((e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       send();
//     }
//   }, [send]);

//   const ALLOWED_STATUS_TRANSITIONS = {
//     OPEN: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
//     ASSIGNED: ["IN_PROGRESS", "RESOLVED", "CLOSED","OPEN"],
//     IN_PROGRESS: ["IN_PROGRESS", "RESOLVED", "CLOSED"],
//     RESOLVED: ["RESOLVED", "OPEN", "IN_PROGRESS", "CLOSED"],
//     CLOSED: ["CLOSED"],
//   };

//   const getStatusStyles = (status) => {
//     const base = "text-xs px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1.5 transition-all duration-500 transform hover:scale-105";
    
//     if (darkMode) {
//       switch(status?.toLowerCase()) {
//         case 'open': return `${base} bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-cyan-500/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/20`;
//         case 'pending': return `${base} bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/20`;
//         case 'resolved': return `${base} bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/20`;
//         case 'closed': return `${base} bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 text-gray-300 border border-gray-700 shadow-lg shadow-gray-900/30`;
//         default: return `${base} bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 text-purple-300 border border-purple-500/40`;
//       }
//     } else {
//       switch(status?.toLowerCase()) {
//         case 'open': return `${base} bg-gradient-to-r from-blue-50 via-blue-100 to-cyan-50 text-blue-700 border border-blue-300 shadow-lg shadow-blue-500/20`;
//         case 'pending': return `${base} bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 text-amber-700 border border-amber-300 shadow-lg shadow-amber-500/20`;
//         case 'resolved': return `${base} bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 text-emerald-700 border border-emerald-300 shadow-lg shadow-emerald-500/20`;
//         case 'closed': return `${base} bg-gradient-to-r from-gray-50 via-gray-100 to-gray-150 text-gray-700 border border-gray-300 shadow-lg shadow-gray-500/10`;
//         default: return `${base} bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 text-purple-700 border border-purple-300`;
//       }
//     }
//   };

//   const getStatusIcon = (status) => {
//     const iconClass = "w-3.5 h-3.5";
//     switch(status?.toLowerCase()) {
//       case 'open': return <AlertCircle className={iconClass} />;
//       case 'pending': return <Clock className={iconClass} />;
//       case 'resolved': return <CheckCircle className={iconClass} />;
//       default: return <AlertCircle className={iconClass} />;
//     }
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const hours = date.getHours();
//     const emoji = hours < 12 ? "🌅" : hours < 18 ? "☀️" : "🌙";
//     return `${emoji} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const options = { 
//       month: 'short', 
//       day: 'numeric',
//       year: 'numeric'
//     };
//     return date.toLocaleDateString([], options);
//   };

//   const onEmojiClick = (emojiData) => {
//     setInputMsg(prev => prev + emojiData.emoji);
//   };

//   const addReaction = (messageId, emoji) => {
//     setActiveReactions(prev => ({
//       ...prev,
//       [messageId]: [...(prev[messageId] || []), { emoji, timestamp: Date.now() }]
//     }));
//   };

//   const togglePinMessage = (messageId) => {
//     setPinnedMessages(prev => 
//       prev.includes(messageId) 
//         ? prev.filter(id => id !== messageId)
//         : [...prev, messageId]
//     );
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const toggleFullscreen = () => {
//     setIsFullscreen(!isFullscreen);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showEmoji && !event.target.closest('.emoji-picker-container') && !event.target.closest('.emoji-button')) {
//         setShowEmoji(false);
//       }
//     };
    
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [showEmoji]);

//   return (
//     <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col overflow-hidden transition-all duration-700 ${
//       darkMode 
//         ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black" 
//         : "bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"
//     } relative backdrop-blur-sm`}>
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
//           darkMode ? 'bg-blue-500/10' : 'bg-blue-400/10'
//         }`}></div>
//         <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
//           darkMode ? 'bg-purple-500/10' : 'bg-purple-400/10'
//         }`}></div>
//       </div>

//       {/* HEADER */}
//       <div className={`p-5 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4 relative z-20 ${
//         darkMode 
//           ? "border-gray-800/50 bg-gradient-to-r from-gray-900/90 via-gray-950/90 to-black/90 backdrop-blur-xl" 
//           : "border-gray-200/50 bg-gradient-to-r from-white/90 via-blue-50/90 to-white/90 backdrop-blur-xl"
//       } shadow-2xl shadow-black/10`}>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="relative group">
//               <div className={`p-2.5 rounded-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 ${
//                 darkMode 
//                   ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm' 
//                   : 'bg-gradient-to-br from-blue-100 to-cyan-100'
//               } shadow-lg`}>
//                 <User className={`w-5 h-5 transition-all duration-500 ${
//                   darkMode ? 'text-blue-400 group-hover:text-cyan-300' : 'text-blue-600 group-hover:text-cyan-500'
//                 }`} />
//               </div>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
//             </div>
            
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 mb-1">
//                 <Hash className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//                 <h3 className={`font-bold text-lg truncate bg-gradient-to-r bg-clip-text text-transparent ${
//                   darkMode 
//                     ? "from-blue-300 via-cyan-300 to-blue-300" 
//                     : "from-blue-600 via-cyan-600 to-blue-600"
//                 }`}>
//                   #{ticket?.ticketId || "N/A"} • {ticket?.customerName || "Customer"}
//                   <Crown className="inline-block w-4 h-4 ml-2 text-yellow-500" />
//                 </h3>
//               </div>
              
//               <div className="flex items-center gap-3 flex-wrap">
//                 <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 hover:scale-105 ${
//                   darkMode 
//                     ? 'bg-gray-800/50 hover:bg-gray-800' 
//                     : 'bg-blue-50 hover:bg-blue-100'
//                 } shadow-sm`}>
//                   <MessageSquare className={`w-3.5 h-3.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//                   <p className={`text-sm font-medium truncate ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     {ticket?.issue || "Premium Support"}
//                   </p>
//                 </div>
                
//                 <div className="hidden md:flex items-center gap-2">
//                   {customerEmail && (
//                     <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm group ${
//                       darkMode 
//                         ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-blue-900/30 hover:to-blue-800/30' 
//                         : 'bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100'
//                     }`}>
//                       <Mail className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-125" />
//                       <span className="text-xs font-medium truncate max-w-[150px]">{customerEmail}</span>
//                     </div>
//                   )}
//                   {customerPhone && (
//                     <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm group ${
//                       darkMode 
//                         ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-emerald-900/30 hover:to-emerald-800/30' 
//                         : 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100'
//                     }`}>
//                       <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-125" />
//                       <span className="text-xs font-medium">{customerPhone}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {createdAt && (
//             <div className="flex items-center gap-3 mt-3">
//               <div className="flex items-center gap-2">
//                 <Calendar className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                 <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                   Created: {formatDate(createdAt)} • {formatTime(createdAt)}
//                 </p>
//               </div>
              
//               <div className="h-4 w-px bg-gray-600/30"></div>
              
//               <div className="flex items-center gap-2">
//                 <BarChart2 className={`w-3.5 h-3.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//                 <div className="flex items-center gap-1">
//                   <span className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{messageStats.agent}</span>
//                   <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>agent</span>
//                   <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
//                   <span className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{messageStats.customer}</span>
//                   <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>customer</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-2 mt-2 md:mt-0">
//           {/* <button
//             onClick={toggleTheme}
//             className={`p-2.5 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl relative group ${
//               darkMode 
//                 ? "bg-gradient-to-br from-gray-800 to-gray-900 text-yellow-400 hover:from-yellow-900/30 hover:to-yellow-800/30" 
//                 : "bg-gradient-to-br from-gray-100 to-white text-gray-700 hover:from-yellow-50 hover:to-yellow-100"
//             } shadow-lg`}
//             title="Toggle theme"
//           >
//             {darkMode ? 
//               <Sun className="w-4.5 h-4.5" /> : 
//               <Moon className="w-4.5 h-4.5" />
//             }
//             <Sparkles className={`absolute -top-1 -right-1 w-2 h-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
//           </button> */}

//           {/* <button
//             onClick={toggleFullscreen}
//             className={`p-2.5 rounded-xl transition-all duration-500 hover:scale-110 ${
//               darkMode 
//                 ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 hover:text-white hover:from-blue-900/30 hover:to-blue-800/30" 
//                 : "bg-gradient-to-br from-gray-100 to-white text-gray-600 hover:text-blue-600 hover:from-blue-50 hover:to-blue-100"
//             } shadow-lg`}
//             title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
//           >
//             {isFullscreen ? 
//               <Minimize2 className="w-4.5 h-4.5" /> : 
//               <Maximize2 className="w-4.5 h-4.5" />
//             }
//           </button> */}

//           {showAssignment && (
//             <div className="relative group">
//               <select
//                 value={ticket?.assignedTo || ""}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   onAssigneeChange?.(value || null);
//                 }}
//                 className={`appearance-none pl-11 pr-9 py-2.5 text-sm rounded-xl border transition-all duration-500 ${
//                   darkMode 
//                     ? "bg-gradient-to-r from-gray-800/90 to-gray-900/90 border-gray-700 text-white hover:from-gray-700/90 hover:to-gray-800/90" 
//                     : "bg-gradient-to-r from-white/90 to-blue-50/90 border-gray-300 text-gray-900 hover:from-white hover:to-blue-100"
//                 } focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-lg backdrop-blur-sm cursor-pointer`}
//               >
//                 <option value="" className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>🎯 Assign to...</option>
//                 {staffList.map(s => (
//                   <option key={s._id} value={s._id} className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
//                     👤 {s.name}
//                   </option>
//                 ))}
//               </select>
//               <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-500 ${
//                 darkMode ? 'text-blue-400 group-hover:text-cyan-300' : 'text-blue-500'
//               }`} />
//               <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-500 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-500'
//               } group-hover:rotate-180`} />
//             </div>
//           )}

//           {showStatus && (
//             <div className="relative group">
//               <select
//                 value={ticket?.status || ""}
//                 disabled={ticket?.status === "CLOSED"}
//                 onChange={(e) => onStatusChange?.(e.target.value)}
//                 className={`appearance-none pl-11 pr-9 py-2.5 text-sm rounded-xl border transition-all duration-500 ${
//                   darkMode
//                     ? "bg-gradient-to-r from-gray-800/90 to-gray-900/90 border-gray-700 text-white hover:from-gray-700/90 hover:to-gray-800/90"
//                     : "bg-gradient-to-r from-white/90 to-blue-50/90 border-gray-300 text-gray-900 hover:from-white hover:to-blue-100"
//                 } focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm cursor-pointer`}
//               >
//                 {(ALLOWED_STATUS_TRANSITIONS[ticket?.status] || []).map(status => (
//                   <option key={status} value={status} className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
//                     {status === "OPEN" ? "🚀 " : status === "IN_PROGRESS" ? "⚡ " : status === "RESOLVED" ? "✅ " : "🔒 "}
//                     {status.replace("_", " ")}
//                   </option>
//                 ))}
//               </select>
//               <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-500 ${
//                 getStatusStyles(ticket?.status).includes('blue') ? 'text-blue-400' : 
//                 getStatusStyles(ticket?.status).includes('amber') ? 'text-amber-400' : 
//                 getStatusStyles(ticket?.status).includes('emerald') ? 'text-emerald-400' : 
//                 'text-gray-400'
//               }`}>
//                 {getStatusIcon(ticket?.status)}
//               </div>
//               <ChevronDown className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform duration-500 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-500'
//               } group-hover:rotate-180`} />
//             </div>
//           )}

//           {/* <div className="relative">
//             <button className={`p-2.5 rounded-xl transition-all duration-500 hover:scale-110 group ${
//               darkMode 
//                 ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 hover:text-white hover:from-purple-900/30 hover:to-pink-800/30" 
//                 : "bg-gradient-to-br from-gray-100 to-white text-gray-600 hover:text-purple-600 hover:from-purple-50 hover:to-pink-100"
//             } shadow-lg`}>
//               <MoreVertical className="w-4.5 h-4.5" />
//               <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible ${
//                 darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
//               }`}>
//                 <button type="button" className="w-full px-4 py-3 text-left hover:bg-gray-800/50 flex items-center gap-2 transition-all duration-300">
//                   <Copy className="w-4 h-4" /> Copy Ticket ID
//                 </button>
//                 <button type="button" className="w-full px-4 py-3 text-left hover:bg-gray-800/50 flex items-center gap-2 transition-all duration-300">
//                   <Download className="w-4 h-4" /> Export Chat
//                 </button>
//                 <button type="button" className="w-full px-4 py-3 text-left hover:bg-gray-800/50 flex items-center gap-2 transition-all duration-300">
//                   <Trash2 className="w-4 h-4" /> Clear Chat
//                 </button>
//               </div>
//             </button>
//           </div> */}
//         </div>
//       </div>

//       {pinnedMessages.length > 0 && (
//         <div className={`px-5 py-3 border-b flex items-center gap-3 overflow-x-auto scrollbar-hide relative z-10 ${
//           darkMode 
//             ? 'bg-gradient-to-r from-amber-900/20 via-yellow-900/10 to-amber-800/10 border-amber-800/30' 
//             : 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 border-amber-200'
//         } shadow-lg`}>
//           <Pin className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
//           <span className={`text-xs font-bold ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
//             📌 Pinned Messages ({pinnedMessages.length})
//           </span>
//           <div className="flex-1"></div>
//           <button 
//             type="button"
//             onClick={() => setPinnedMessages([])}
//             className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 ${
//               darkMode 
//                 ? 'text-gray-400 hover:text-amber-300 hover:bg-gray-800/50' 
//                 : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
//             }`}>
//             Clear all
//           </button>
//         </div>
//       )}

//       <div 
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto p-6 space-y-8 overscroll-contain scroll-smooth relative z-10"
//       >
//         {messages.length === 0 && (
//           <div className="h-full flex flex-col items-center justify-center p-6 text-center">
//             <div className={`p-8 rounded-3xl mb-8 transition-all duration-700 hover:scale-[1.02] relative overflow-hidden ${
//               darkMode 
//                 ? 'bg-gradient-to-br from-gray-900/60 via-gray-950/60 to-black/60 backdrop-blur-xl' 
//                 : 'bg-gradient-to-br from-white/80 via-blue-50/80 to-white/80 backdrop-blur-xl'
//             } shadow-2xl`}>
//               <div className="relative">
//                 <div className="relative w-24 h-24 mx-auto mb-6">
//                   <Bot className={`w-full h-full ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
//                   <Sparkles className={`absolute -top-2 -right-2 w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
//                   <Sparkles className={`absolute -bottom-2 -left-2 w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-500'}`} />
//                 </div>
                
//                 <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
//                   darkMode 
//                     ? "from-blue-300 via-cyan-300 to-purple-300" 
//                     : "from-blue-600 via-cyan-600 to-purple-600"
//                 }`}>
//                   ✨ Welcome to Premium Chat ✨
//                 </h3>
                
//                 <p className={`max-w-md text-base leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                   Start an amazing conversation with <span className="font-bold text-blue-400">{ticket?.customerName || "Customer"}</span>. 
//                   Experience seamless communication with real-time features and premium support.
//                 </p>
                
//                 <div className="grid grid-cols-2 gap-3 mb-6">
//                   <div className={`p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
//                     darkMode ? 'bg-gray-800/50' : 'bg-blue-50'
//                   }`}>
//                     <Zap className={`w-5 h-5 mx-auto mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
//                     <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Instant Replies</p>
//                   </div>
//                   <div className={`p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
//                     darkMode ? 'bg-gray-800/50' : 'bg-emerald-50'
//                   }`}>
//                     <Shield className={`w-5 h-5 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
//                     <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Secure & Encrypted</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
//                     <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>99% Satisfaction</span>
//                   </div>
//                   <div className="h-4 w-px bg-gray-600/30"></div>
//                   <div className="flex items-center gap-2">
//                     <Coffee className={`w-4 h-4 ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} />
//                     <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>24/7 Support</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {messages.map((msg, index) => {
//           const isAgent = ["ADMIN", "ADMIN_STAFF"].includes(msg.senderRole);
//           const isSystem = msg.senderRole === "SYSTEM";
//           const isPinned = pinnedMessages.includes(msg._id);
//           const messageReactions = activeReactions[msg._id] || [];
//           const showDate = index === 0 || 
//             new Date(msg.createdAt).toDateString() !== 
//             new Date(messages[index - 1]?.createdAt).toDateString();

//           if (showDate) {
//             return (
//               <React.Fragment key={`date-${msg._id}`}>
//                 <div className="flex justify-center my-8">
//                   <div className={`text-sm px-5 py-2.5 rounded-full backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
//                     darkMode 
//                       ? 'bg-gray-900/60 border-gray-800 text-gray-300 hover:bg-gray-900' 
//                       : 'bg-white/80 border-gray-300 text-gray-600 hover:bg-white'
//                   } shadow-lg flex items-center gap-3`}>
//                     <Calendar className="w-4 h-4" />
//                     {formatDate(msg.createdAt)}
//                     <Tag className="w-4 h-4" />
//                   </div>
//                 </div>
                
//                 {isSystem ? (
//                   <div key={msg._id} className="flex justify-center">
//                     <div className={`text-sm px-6 py-4 rounded-2xl border flex items-center gap-4 max-w-md backdrop-blur-xl ${
//                       darkMode 
//                         ? 'bg-gradient-to-r from-gray-900/60 to-gray-950/60 border-gray-800 text-gray-300' 
//                         : 'bg-gradient-to-r from-gray-100/80 to-white/80 border-gray-300 text-gray-600'
//                     } shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
//                       <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
//                         <AlertCircle className="w-5 h-5 text-blue-500" />
//                       </div>
//                       <span className="flex-1">{msg.message}</span>
//                       <Globe className="w-4 h-4 text-gray-500" />
//                     </div>
//                   </div>
//                 ) : (
//                   <MessageBubble 
//                     key={msg._id}
//                     msg={msg}
//                     isAgent={isAgent}
//                     isPinned={isPinned}
//                     messageReactions={messageReactions}
//                     darkMode={darkMode}
//                     formatTime={formatTime}
//                     togglePinMessage={togglePinMessage}
//                     addReaction={addReaction}
//                     copyToClipboard={copyToClipboard}
//                     quickReactions={quickReactions}
//                   />
//                 )}
//               </React.Fragment>
//             );
//           }

//           if (isSystem) {
//             return (
//               <div key={msg._id} className="flex justify-center">
//                 <div className={`text-sm px-6 py-4 rounded-2xl border flex items-center gap-4 max-w-md backdrop-blur-xl ${
//                   darkMode 
//                     ? 'bg-gradient-to-r from-gray-900/60 to-gray-950/60 border-gray-800 text-gray-300' 
//                     : 'bg-gradient-to-r from-gray-100/80 to-white/80 border-gray-300 text-gray-600'
//                 } shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
//                   <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
//                     <AlertCircle className="w-5 h-5 text-blue-500" />
//                   </div>
//                   <span className="flex-1">{msg.message}</span>
//                   <Globe className="w-4 h-4 text-gray-500" />
//                 </div>
//               </div>
//             );
//           }

//           return (
//             <MessageBubble 
//               key={msg._id}
//               msg={msg}
//               isAgent={isAgent}
//               isPinned={isPinned}
//               messageReactions={messageReactions}
//               darkMode={darkMode}
//               formatTime={formatTime}
//               togglePinMessage={togglePinMessage}
//               addReaction={addReaction}
//               copyToClipboard={copyToClipboard}
//               quickReactions={quickReactions}
//             />
//           );
//         })}
        
//         {isTyping && (
//           <div className="flex justify-start">
//             <div className={`p-5 rounded-3xl max-w-[70%] backdrop-blur-xl shadow-2xl ${
//               darkMode 
//                 ? 'bg-gradient-to-br from-gray-900/60 to-gray-950/60' 
//                 : 'bg-gradient-to-br from-white/80 to-blue-50/80 border border-gray-300'
//             }`}>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1.5">
//                   <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
//                   <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
//                   <div className={`w-2.5 h-2.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
//                 </div>
//                 <span className={`text-sm font-medium ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                   {ticket?.customerName || "Customer"} is typing...
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <div ref={messagesEndRef} className="h-4" />
//       </div>

//       <div className={`p-5 border-t transition-all duration-500 relative z-20 ${
//         darkMode 
//           ? "border-gray-800/50 bg-gradient-to-t from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl" 
//           : "border-gray-200/50 bg-gradient-to-t from-white/95 via-blue-50/95 to-white/95 backdrop-blur-xl"
//       } shadow-2xl`}>
//         {/* {showQuickActions && (
//           // <div className={`mb-4 p-3 rounded-2xl backdrop-blur-sm ${
//           //   darkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-blue-50/80 border border-blue-100'
//           // }`}>
//           //   <div className="flex items-center gap-2 overflow-x-auto pb-2">
//           //     <button type="button" className={`px-3 py-1.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105 ${
//           //       darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'
//           //     }`}>
//           //       <FileText className="w-3.5 h-3.5" /> Quick Reply
//           //     </button>
//           //     <button type="button" className={`px-3 py-1.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105 ${
//           //       darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'
//           //     }`}>
//           //       <Link className="w-3.5 h-3.5" /> Add Link
//           //     </button>
//           //     <button type="button" className={`px-3 py-1.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105 ${
//           //       darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'
//           //     }`}>
//           //       <ImageIcon className="w-3.5 h-3.5" /> Add Image
//           //     </button>
//           //     <button type="button" className={`px-3 py-1.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105 ${
//           //       darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'
//           //     }`}>
//           //       <Video className="w-3.5 h-3.5" /> Add Video
//           //     </button>
//           //   </div>
//           // </div>
//         )} */}

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             send();
//             setShowEmoji(false);
//           }}
//           className="flex items-end gap-3"
//         >
//           {/* <button
//             type="button"
//             onClick={() => setShowQuickActions(!showQuickActions)}
//             className={`p-3 rounded-xl transition-all duration-500 hover:scale-110 flex-shrink-0 ${
//               darkMode 
//                 ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 hover:text-blue-400" 
//                 : "bg-gradient-to-br from-gray-100 to-white text-gray-600 hover:text-blue-600"
//             } shadow-lg`}
//             title="Quick actions"
//           >
//             <Zap className="w-4.5 h-4.5" />
//           </button> */}

//           <div className="flex-1 relative group">
//             <textarea
//               ref={inputRef}
//               value={inputMsg}
//               onChange={(e) => {
//                 setInputMsg(e.target.value);
//                 setShowEmoji(false);
//               }}
//               onKeyDown={handleKeyPress}
//               placeholder="💫 Type your message here... (Shift + Enter for new line)"
//               rows={1}
//               className={`w-full px-5 pr-24 py-4 rounded-2xl border resize-none transition-all duration-500 ${
//                 darkMode
//                   ? "bg-gradient-to-r from-gray-900/80 to-gray-950/80 border-gray-800 text-white placeholder-gray-500 focus:border-blue-500"
//                   : "bg-gradient-to-r from-white/90 to-blue-50/90 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
//               } focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-lg backdrop-blur-sm`}
//               style={{ maxHeight: "150px", minHeight: "56px" }}
//               onInput={(e) => {
//                 e.target.style.height = "auto";
//                 e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
//               }}
//             />

//             {inputMsg.length > 0 && (
//               <div className={`absolute right-16 bottom-3 text-xs transition-all duration-300 ${
//                 inputMsg.length > 450 
//                   ? 'text-red-500' 
//                   : darkMode 
//                     ? 'text-gray-500' 
//                     : 'text-gray-400'
//               }`}>
//                 <span className={`font-bold ${inputMsg.length > 450 ? 'text-red-400' : 'text-blue-500'}`}>
//                   {inputMsg.length}
//                 </span>
//                 /500
//               </div>
//             )}

//             <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
//               {/* <button
//                 type="button"
//                 onClick={() => fileInputRef.current.click()}
//                 className={`p-2.5 rounded-xl transition-all duration-500 hover:scale-125 hover:rotate-12 emoji-button ${
//                   darkMode
//                     ? "text-gray-400 hover:text-blue-400 hover:bg-gray-800/50"
//                     : "text-gray-500 hover:text-blue-600 hover:bg-blue-100"
//                 }`}
//                 title="Attach files"
//               >
//                 <Paperclip className="w-4.5 h-4.5" />
//               </button> */}

//               <div className="relative emoji-picker-container">
//                 <button
//                   type="button"
//                   onClick={() => setShowEmoji(prev => !prev)}
//                   className={`p-2.5 rounded-xl transition-all duration-500 hover:scale-125 emoji-button ${
//                     darkMode
//                       ? "text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50"
//                       : "text-gray-500 hover:text-yellow-600 hover:bg-yellow-100"
//                   }`}
//                   title="Add emoji"
//                 >
//                   <Smile className="w-4.5 h-4.5" />
//                 </button>

//                 {showEmoji && (
//                   <div className="absolute bottom-14 right-0 z-50">
//                     <EmojiPicker
//                       onEmojiClick={onEmojiClick}
//                       theme={darkMode ? "dark" : "light"}
//                       height={350}
//                       width={300}
//                       skinTonesDisabled
//                       searchDisabled={false}
//                       previewConfig={{ showPreview: false }}
//                       lazyLoadEmojis={true}
//                       className="rounded-2xl shadow-2xl border border-gray-700"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={!inputMsg.trim()}
//             className={`p-4 rounded-2xl transition-all duration-500 flex-shrink-0 relative group ${
//               inputMsg.trim()
//                 ? darkMode
//                   ? "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110"
//                   : "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110"
//                 : darkMode
//                   ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-600 cursor-not-allowed"
//                   : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400 cursor-not-allowed"
//             }`}
//           >
//             <Send className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
//             {inputMsg.trim() && (
//               <Sparkles className="absolute -top-1 -right-1 w-2 h-2 text-yellow-400" />
//             )}
//           </button>

//           {/* <button
//             type="button"
//             className={`md:hidden p-4 rounded-2xl transition-all duration-500 hover:scale-110 ${
//               darkMode 
//                 ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 hover:text-blue-400 hover:from-blue-900/30 hover:to-blue-800/30" 
//                 : "bg-gradient-to-br from-gray-100 to-white text-gray-600 hover:text-blue-600 hover:from-blue-50 hover:to-blue-100"
//             } shadow-lg`}
//             title="Voice input"
//           >
//             <Mic className="w-5 h-5" />
//           </button> */}

//           <input
//             type="file"
//             ref={fileInputRef}
//             hidden
//             multiple
//             onChange={(e) => {
//               const files = Array.from(e.target.files);
//               console.log("Uploading files:", files);
//               e.target.value = "";
//             }}
//           />
//         </form>

//         <div className="flex items-center justify-between mt-4 text-xs">
//           <div className="flex items-center gap-3">
//             <span className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//               <Zap className="w-3 h-3" /> Press Enter to send
//             </span>
//             <span className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
//             <span className={`flex items-center gap-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//               <Feather className="w-3 h-3" /> Shift + Enter for new line
//             </span>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <span className={`flex items-center gap-1.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
//               <Rocket className="w-3 h-3" /> Premium Chat
//             </span>
//             <span className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
//             <span className={`flex items-center gap-1.5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
//               <Shield className="w-3 h-3" /> Secure
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MessageBubble = ({ 
//   msg, 
//   isAgent, 
//   isPinned, 
//   messageReactions, 
//   darkMode, 
//   formatTime, 
//   togglePinMessage, 
//   addReaction, 
//   copyToClipboard,
//   quickReactions 
// }) => {
//   return (
//     <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
//       <div className={`group relative p-5 rounded-3xl max-w-[85%] md:max-w-[70%] transition-all duration-700 hover:scale-[1.01] ${
//         isPinned ? 'ring-2 ring-amber-500/50 shadow-2xl' : ''
//       } ${
//         isAgent 
//           ? darkMode 
//             ? "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white rounded-br-none shadow-2xl" 
//             : "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-white rounded-br-none shadow-2xl"
//           : darkMode
//             ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 rounded-bl-none shadow-2xl"
//             : "bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900 border border-gray-200 rounded-bl-none shadow-lg"
//       }`}>
//         <div className={`absolute -top-3 ${isAgent ? '-left-12' : '-right-12'} 
//           flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
//           <button
//             type="button"
//             onClick={() => togglePinMessage(msg._id)}
//             className={`p-2 rounded-xl transition-all duration-300 hover:scale-125 hover:rotate-12 ${
//               darkMode 
//                 ? 'bg-gray-900 text-gray-400 hover:text-amber-400 hover:bg-gray-800' 
//                 : 'bg-white text-gray-600 hover:text-amber-600 hover:bg-amber-50'
//             } shadow-lg`}
//             title={isPinned ? "Unpin message" : "Pin message"}
//           >
//             <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
//           </button>
//           <button
//             type="button"
//             onClick={() => copyToClipboard(msg.message)}
//             className={`p-2 rounded-xl transition-all duration-300 hover:scale-125 hover:rotate-12 ${
//               darkMode 
//                 ? 'bg-gray-900 text-gray-400 hover:text-blue-400 hover:bg-gray-800' 
//                 : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50'
//             } shadow-lg`}
//             title="Copy message"
//           >
//             <Copy className="w-3.5 h-3.5" />
//           </button>
//         </div>

//         <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
//           {msg.message}
//         </p>
        
//         {messageReactions.length > 0 && (
//           <div className="flex flex-wrap gap-1.5 mt-3">
//             {messageReactions.map((reaction, idx) => (
//               <span key={idx} className={`text-xs px-2 py-1 rounded-full transition-all duration-300 hover:scale-110 ${
//                 darkMode ? 'bg-white/10' : 'bg-black/5'
//               }`}>
//                 {reaction.emoji}
//               </span>
//             ))}
//           </div>
//         )}

//         <div className={`text-xs mt-4 flex justify-between items-center gap-3 ${
//           isAgent 
//             ? "text-blue-200/80" 
//             : darkMode 
//               ? "text-gray-400" 
//               : "text-gray-500"
//         }`}>
//           <div className="flex items-center gap-2">
//             <span>{formatTime(msg.createdAt)}</span>
//             {isAgent && (
//               <span className="text-[10px] px-2 py-1 rounded-full bg-white/20">
//                 👑 Agent
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
//             {quickReactions.slice(0, 4).map((emoji, idx) => (
//               <button
//                 key={idx}
//                 type="button"
//                 onClick={() => addReaction(msg._id, emoji)}
//                 className="text-xs px-1.5 py-1 rounded-lg transition-all duration-300 hover:scale-125 hover:bg-white/10"
//                 title={`React with ${emoji}`}
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
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
  Bot,
  Sparkles,
  Zap,
  Star,
  ThumbsUp,
  Download,
  Image as ImageIcon,
  FileText,
  Video,
  Pin,
  Copy,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Tag,
  MessageSquare,
  BarChart2,
  Shield,
  Globe,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  Link,
  Hash,
  TrendingUp,
  Crown,
  Coffee,
  Rocket,
  Feather
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import EmojiPicker from "emoji-picker-react";

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
  const { isDark: themeDark, toggleTheme } = useTheme();
  const darkMode = isDark || themeDark;
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef(null);
  const [activeReactions, setActiveReactions] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [messageStats, setMessageStats] = useState({
    total: 0,
    agent: 0,
    customer: 0
  });

  const quickReactions = ["👍", "❤️", "😄", "🎉", "🔥", "🚀", "⭐", "👏"];

  useEffect(() => {
    scrollToBottom();
    const agentMsgs = messages.filter(m => ["ADMIN", "ADMIN_STAFF"].includes(m.senderRole)).length;
    const customerMsgs = messages.filter(m => !["ADMIN", "ADMIN_STAFF", "SYSTEM"].includes(m.senderRole)).length;
    setMessageStats({
      total: messages.length,
      agent: agentMsgs,
      customer: customerMsgs
    });
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "nearest"
    });
  }, []);

  const send = useCallback(() => {
    if (!inputMsg.trim()) return;
    onSendMessage(inputMsg);
    setInputMsg("");
    setShowEmoji(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [inputMsg, onSendMessage]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }, [send]);

  const ALLOWED_STATUS_TRANSITIONS = {
    OPEN: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
    ASSIGNED: ["IN_PROGRESS", "RESOLVED", "CLOSED","OPEN"],
    IN_PROGRESS: ["IN_PROGRESS", "RESOLVED", "CLOSED"],
    RESOLVED: ["RESOLVED", "OPEN", "IN_PROGRESS", "CLOSED"],
    CLOSED: ["CLOSED"],
  };

  const getStatusStyles = (status) => {
    const base = "text-xs px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1.5 transition-all duration-500 transform hover:scale-105";
    
    if (darkMode) {
      switch(status?.toLowerCase()) {
        case 'open': return `${base} bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-cyan-500/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/20`;
        case 'pending': return `${base} bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/20`;
        case 'resolved': return `${base} bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/20`;
        case 'closed': return `${base} bg-gradient-to-r from-gray-800 via-gray-900 to-gray-950 text-gray-300 border border-gray-700 shadow-lg shadow-gray-900/30`;
        default: return `${base} bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 text-purple-300 border border-purple-500/40`;
      }
    } else {
      switch(status?.toLowerCase()) {
        case 'open': return `${base} bg-gradient-to-r from-blue-50 via-blue-100 to-cyan-50 text-blue-700 border border-blue-300 shadow-lg shadow-blue-500/20`;
        case 'pending': return `${base} bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 text-amber-700 border border-amber-300 shadow-lg shadow-amber-500/20`;
        case 'resolved': return `${base} bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 text-emerald-700 border border-emerald-300 shadow-lg shadow-emerald-500/20`;
        case 'closed': return `${base} bg-gradient-to-r from-gray-50 via-gray-100 to-gray-150 text-gray-700 border border-gray-300 shadow-lg shadow-gray-500/10`;
        default: return `${base} bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 text-purple-700 border border-purple-300`;
      }
    }
  };

  const getStatusIcon = (status) => {
    const iconClass = "w-3.5 h-3.5";
    switch(status?.toLowerCase()) {
      case 'open': return <AlertCircle className={iconClass} />;
      case 'pending': return <Clock className={iconClass} />;
      case 'resolved': return <CheckCircle className={iconClass} />;
      default: return <AlertCircle className={iconClass} />;
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const hours = date.getHours();
    const emoji = hours < 12 ? "🌅" : hours < 18 ? "☀️" : "🌙";
    return `${emoji} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString([], options);
  };

  const onEmojiClick = (emojiData) => {
    setInputMsg(prev => prev + emojiData.emoji);
  };

  const addReaction = (messageId, emoji) => {
    setActiveReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), { emoji, timestamp: Date.now() }]
    }));
  };

  const togglePinMessage = (messageId) => {
    setPinnedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmoji && !event.target.closest('.emoji-picker-container') && !event.target.closest('.emoji-button')) {
        setShowEmoji(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showEmoji]);

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col overflow-hidden transition-all duration-700 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black" 
        : "bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"
    } relative backdrop-blur-sm`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-blue-500/10' : 'bg-blue-400/10'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-400/10'
        }`}></div>
      </div>

      {/* HEADER - Responsive */}
      <div className={`p-4 sm:p-5 border-b flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 sm:gap-4 relative z-20 ${
        darkMode 
          ? "border-gray-800/50 bg-gradient-to-r from-gray-900/90 via-gray-950/90 to-black/90 backdrop-blur-xl" 
          : "border-gray-200/50 bg-gradient-to-r from-white/90 via-blue-50/90 to-white/90 backdrop-blur-xl"
      } shadow-2xl shadow-black/10`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-center gap-3 mb-2 sm:mb-3">
            <div className="relative group flex-shrink-0">
              <div className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm' 
                  : 'bg-gradient-to-br from-blue-100 to-cyan-100'
              } shadow-lg`}>
                <User className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 ${
                  darkMode ? 'text-blue-400 group-hover:text-cyan-300' : 'text-blue-600 group-hover:text-cyan-500'
                }`} />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Hash className={`w-3 h-3 sm:w-4 sm:h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`font-bold text-base sm:text-lg truncate bg-gradient-to-r bg-clip-text text-transparent ${
                  darkMode 
                    ? "from-blue-300 via-cyan-300 to-blue-300" 
                    : "from-blue-600 via-cyan-600 to-blue-600"
                }`}>
                  #{ticket?.ticketId || "N/A"} • {ticket?.customerName || "Customer"}
                  <Crown className="inline-block w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 text-yellow-500" />
                </h3>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-800' 
                    : 'bg-blue-50 hover:bg-blue-100'
                } shadow-sm`}>
                  <MessageSquare className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <p className={`text-xs sm:text-sm font-medium truncate max-w-[150px] sm:max-w-none ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {ticket?.issue || "Premium Support"}
                  </p>
                </div>
                
                <div className="hidden sm:flex items-center gap-2">
                  {customerEmail && (
                    <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm group ${
                      darkMode 
                        ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-blue-900/30 hover:to-blue-800/30' 
                        : 'bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100'
                    }`}>
                      <Mail className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-125" />
                      <span className="text-xs font-medium truncate max-w-[150px]">{customerEmail}</span>
                    </div>
                  )}
                  {customerPhone && (
                    <div className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm group ${
                      darkMode 
                        ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-emerald-900/30 hover:to-emerald-800/30' 
                        : 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100'
                    }`}>
                      <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-125" />
                      <span className="text-xs font-medium">{customerPhone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {createdAt && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Created: {formatDate(createdAt)}
                </p>
              </div>
              
              <div className="hidden sm:block h-4 w-px bg-gray-600/30"></div>
              
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
                <BarChart2 className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className="flex items-center gap-1">
                  <span className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{messageStats.agent}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>agent</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                  <span className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{messageStats.customer}</span>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>customer</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 lg:mt-0 flex-wrap">
          {showAssignment && (
            <div className="relative group flex-1 min-w-[180px] sm:min-w-[200px]">
              <select
                value={ticket?.assignedTo || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  onAssigneeChange?.(value || null);
                }}
                className={`appearance-none pl-9 sm:pl-11 pr-7 sm:pr-9 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border transition-all duration-500 w-full ${
                  darkMode 
                    ? "bg-gradient-to-r from-gray-800/90 to-gray-900/90 border-gray-700 text-white hover:from-gray-700/90 hover:to-gray-800/90" 
                    : "bg-gradient-to-r from-white/90 to-blue-50/90 border-gray-300 text-gray-900 hover:from-white hover:to-blue-100"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-lg backdrop-blur-sm cursor-pointer`}
              >
                <option value="" className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>🎯 Assign to...</option>
                {staffList.map(s => (
                  <option key={s._id} value={s._id} className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    👤 {s.name}
                  </option>
                ))}
              </select>
              <User className={`absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-500 ${
                darkMode ? 'text-blue-400 group-hover:text-cyan-300' : 'text-blue-500'
              }`} />
              <ChevronDown className={`absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              } group-hover:rotate-180`} />
            </div>
          )}

          {showStatus && (
            <div className="relative group flex-1 min-w-[180px] sm:min-w-[200px]">
              <select
                value={ticket?.status || ""}
                disabled={ticket?.status === "CLOSED"}
                onChange={(e) => onStatusChange?.(e.target.value)}
                className={`appearance-none pl-9 sm:pl-11 pr-7 sm:pr-9 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg sm:rounded-xl border transition-all duration-500 w-full ${
                  darkMode
                    ? "bg-gradient-to-r from-gray-800/90 to-gray-900/90 border-gray-700 text-white hover:from-gray-700/90 hover:to-gray-800/90"
                    : "bg-gradient-to-r from-white/90 to-blue-50/90 border-gray-300 text-gray-900 hover:from-white hover:to-blue-100"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm cursor-pointer`}
              >
                {(ALLOWED_STATUS_TRANSITIONS[ticket?.status] || []).map(status => (
                  <option key={status} value={status} className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    {status === "OPEN" ? "🚀 " : status === "IN_PROGRESS" ? "⚡ " : status === "RESOLVED" ? "✅ " : "🔒 "}
                    {status.replace("_", " ")}
                  </option>
                ))}
              </select>
              <div className={`absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 transition-all duration-500 ${
                getStatusStyles(ticket?.status).includes('blue') ? 'text-blue-400' : 
                getStatusStyles(ticket?.status).includes('amber') ? 'text-amber-400' : 
                getStatusStyles(ticket?.status).includes('emerald') ? 'text-emerald-400' : 
                'text-gray-400'
              }`}>
                {getStatusIcon(ticket?.status)}
              </div>
              <ChevronDown className={`absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              } group-hover:rotate-180`} />
            </div>
          )}
        </div>
      </div>

      {pinnedMessages.length > 0 && (
        <div className={`px-4 sm:px-5 py-2 sm:py-3 border-b flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide relative z-10 ${
          darkMode 
            ? 'bg-gradient-to-r from-amber-900/20 via-yellow-900/10 to-amber-800/10 border-amber-800/30' 
            : 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 border-amber-200'
        } shadow-lg`}>
          <Pin className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
          <span className={`text-xs font-bold ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
            📌 Pinned ({pinnedMessages.length})
          </span>
          <div className="flex-1"></div>
          <button 
            type="button"
            onClick={() => setPinnedMessages([])}
            className={`text-xs px-2.5 py-1 rounded-lg transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'text-gray-400 hover:text-amber-300 hover:bg-gray-800/50' 
                : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
            }`}>
            Clear
          </button>
        </div>
      )}

      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 overscroll-contain scroll-smooth relative z-10"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 transition-all duration-700 hover:scale-[1.02] relative overflow-hidden ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-900/60 via-gray-950/60 to-black/60 backdrop-blur-xl' 
                : 'bg-gradient-to-br from-white/80 via-blue-50/80 to-white/80 backdrop-blur-xl'
            } shadow-2xl`}>
              <div className="relative">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6">
                  <Bot className={`w-full h-full ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  <Sparkles className={`absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  <Sparkles className={`absolute -bottom-1 -left-1 w-4 h-4 sm:w-6 sm:h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-500'}`} />
                </div>
                
                <h3 className={`text-xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
                  darkMode 
                    ? "from-blue-300 via-cyan-300 to-purple-300" 
                    : "from-blue-600 via-cyan-600 to-purple-600"
                }`}>
                  ✨ Premium Chat ✨
                </h3>
                
                <p className={`max-w-md text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Start an amazing conversation with <span className="font-bold text-blue-400">{ticket?.customerName || "Customer"}</span>.
                </p>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                    darkMode ? 'bg-gray-800/50' : 'bg-blue-50'
                  }`}>
                    <Zap className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Instant Replies</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                    darkMode ? 'bg-gray-800/50' : 'bg-emerald-50'
                  }`}>
                    <Shield className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                    <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Secure & Encrypted</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>99% Satisfaction</span>
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-gray-600/30"></div>
                  <div className="flex items-center gap-1.5">
                    <Coffee className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} />
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, index) => {
          const isAgent = ["ADMIN", "ADMIN_STAFF"].includes(msg.senderRole);
          const isSystem = msg.senderRole === "SYSTEM";
          const isPinned = pinnedMessages.includes(msg._id);
          const messageReactions = activeReactions[msg._id] || [];
          const showDate = index === 0 || 
            new Date(msg.createdAt).toDateString() !== 
            new Date(messages[index - 1]?.createdAt).toDateString();

          if (showDate) {
            return (
              <React.Fragment key={`date-${msg._id}`}>
                <div className="flex justify-center my-6 sm:my-8">
                  <div className={`text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full backdrop-blur-xl border transition-all duration-500 hover:scale-105 ${
                    darkMode 
                      ? 'bg-gray-900/60 border-gray-800 text-gray-300 hover:bg-gray-900' 
                      : 'bg-white/80 border-gray-300 text-gray-600 hover:bg-white'
                  } shadow-lg flex items-center gap-2 sm:gap-3`}>
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {formatDate(msg.createdAt)}
                    <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                
                {isSystem ? (
                  <div key={msg._id} className="flex justify-center">
                    <div className={`text-xs sm:text-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border flex items-center gap-3 sm:gap-4 max-w-full sm:max-w-md backdrop-blur-xl ${
                      darkMode 
                        ? 'bg-gradient-to-r from-gray-900/60 to-gray-950/60 border-gray-800 text-gray-300' 
                        : 'bg-gradient-to-r from-gray-100/80 to-white/80 border-gray-300 text-gray-600'
                    } shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
                      <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                      </div>
                      <span className="flex-1 text-sm sm:text-base">{msg.message}</span>
                      <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                    </div>
                  </div>
                ) : (
                  <MessageBubble 
                    key={msg._id}
                    msg={msg}
                    isAgent={isAgent}
                    isPinned={isPinned}
                    messageReactions={messageReactions}
                    darkMode={darkMode}
                    formatTime={formatTime}
                    togglePinMessage={togglePinMessage}
                    addReaction={addReaction}
                    copyToClipboard={copyToClipboard}
                    quickReactions={quickReactions}
                  />
                )}
              </React.Fragment>
            );
          }

          if (isSystem) {
            return (
              <div key={msg._id} className="flex justify-center">
                <div className={`text-xs sm:text-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border flex items-center gap-3 sm:gap-4 max-w-full sm:max-w-md backdrop-blur-xl ${
                  darkMode 
                    ? 'bg-gradient-to-r from-gray-900/60 to-gray-950/60 border-gray-800 text-gray-300' 
                    : 'bg-gradient-to-r from-gray-100/80 to-white/80 border-gray-300 text-gray-600'
                } shadow-2xl transition-all duration-500 hover:scale-[1.02]`}>
                  <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  </div>
                  <span className="flex-1 text-sm sm:text-base">{msg.message}</span>
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                </div>
              </div>
            );
          }

          return (
            <MessageBubble 
              key={msg._id}
              msg={msg}
              isAgent={isAgent}
              isPinned={isPinned}
              messageReactions={messageReactions}
              darkMode={darkMode}
              formatTime={formatTime}
              togglePinMessage={togglePinMessage}
              addReaction={addReaction}
              copyToClipboard={copyToClipboard}
              quickReactions={quickReactions}
            />
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl max-w-[85%] sm:max-w-[70%] backdrop-blur-xl shadow-2xl ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-900/60 to-gray-950/60' 
                : 'bg-gradient-to-br from-white/80 to-blue-50/80 border border-gray-300'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                </div>
                <span className={`text-xs sm:text-sm font-medium ml-1 sm:ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {ticket?.customerName || "Customer"} is typing...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className={`p-4 sm:p-5 border-t transition-all duration-500 relative z-20 ${
        darkMode 
          ? "border-gray-800/50 bg-gradient-to-t from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl" 
          : "border-gray-200/50 bg-gradient-to-t from-white/95 via-blue-50/95 to-white/95 backdrop-blur-xl"
      } shadow-2xl`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
            setShowEmoji(false);
          }}
          className="flex items-end gap-2 sm:gap-3"
        >
          <div className="flex-1 relative group">
            <textarea
              ref={inputRef}
              value={inputMsg}
              onChange={(e) => {
                setInputMsg(e.target.value);
                setShowEmoji(false);
              }}
              onKeyDown={handleKeyPress}
              placeholder="💫 Type your message..."
              rows={1}
              className={`w-full px-4 sm:px-5 pr-20 sm:pr-24 py-3 sm:py-4 rounded-xl sm:rounded-2xl border resize-none transition-all duration-500 ${
                darkMode
                  ? "bg-gradient-to-r from-gray-900/80 to-gray-950/80 border-gray-800 text-white placeholder-gray-500 focus:border-blue-500"
                  : "bg-gradient-to-r from-white/90 to-blue-50/90 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-lg backdrop-blur-sm`}
              style={{ maxHeight: "120px", minHeight: "48px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
            />

            {inputMsg.length > 0 && (
              <div className={`absolute right-14 sm:right-16 bottom-2.5 sm:bottom-3 text-xs transition-all duration-300 ${
                inputMsg.length > 450 
                  ? 'text-red-500' 
                  : darkMode 
                    ? 'text-gray-500' 
                    : 'text-gray-400'
              }`}>
                <span className={`font-bold ${inputMsg.length > 450 ? 'text-red-400' : 'text-blue-500'}`}>
                  {inputMsg.length}
                </span>
                /500
              </div>
            )}

            <div className="absolute right-2.5 sm:right-3 bottom-2.5 sm:bottom-3 flex items-center gap-1">
              <div className="relative emoji-picker-container">
                <button
                  type="button"
                  onClick={() => setShowEmoji(prev => !prev)}
                  className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-500 hover:scale-125 emoji-button ${
                    darkMode
                      ? "text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50"
                      : "text-gray-500 hover:text-yellow-600 hover:bg-yellow-100"
                  }`}
                  title="Add emoji"
                >
                  <Smile className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>

                {showEmoji && (
                  <div className="absolute bottom-12 sm:bottom-14 right-0 z-50">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      theme={darkMode ? "dark" : "light"}
                      height={300}
                      width={280}
                      skinTonesDisabled
                      searchDisabled={false}
                      previewConfig={{ showPreview: false }}
                      lazyLoadEmojis={true}
                      className="rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!inputMsg.trim()}
            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 flex-shrink-0 relative group ${
              inputMsg.trim()
                ? darkMode
                  ? "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110"
                  : "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110"
                : darkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:rotate-45" />
            {inputMsg.trim() && (
              <Sparkles className="absolute -top-1 -right-1 w-2 h-2 text-yellow-400" />
            )}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 text-xs gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Press Enter to send
            </span>
            <span className={`hidden sm:block ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Feather className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Shift + Enter for new line
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`flex items-center gap-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <Rocket className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Premium
            </span>
            <span className={`hidden sm:block ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
            <span className={`flex items-center gap-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Secure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ 
  msg, 
  isAgent, 
  isPinned, 
  messageReactions, 
  darkMode, 
  formatTime, 
  togglePinMessage, 
  addReaction, 
  copyToClipboard,
  quickReactions 
}) => {
  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
      <div className={`group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl max-w-[90%] sm:max-w-[85%] md:max-w-[70%] transition-all duration-700 hover:scale-[1.01] ${
        isPinned ? 'ring-2 ring-amber-500/50 shadow-2xl' : ''
      } ${
        isAgent 
          ? darkMode 
            ? "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white rounded-br-none shadow-2xl" 
            : "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 text-white rounded-br-none shadow-2xl"
          : darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100 rounded-bl-none shadow-2xl"
            : "bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900 border border-gray-200 rounded-bl-none shadow-lg"
      }`}>
        <div className={`absolute -top-3 ${isAgent ? '-left-8 sm:-left-12' : '-right-8 sm:-right-12'} 
          flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
          <button
            type="button"
            onClick={() => togglePinMessage(msg._id)}
            className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-125 hover:rotate-12 ${
              darkMode 
                ? 'bg-gray-900 text-gray-400 hover:text-amber-400 hover:bg-gray-800' 
                : 'bg-white text-gray-600 hover:text-amber-600 hover:bg-amber-50'
            } shadow-lg`}
            title={isPinned ? "Unpin message" : "Pin message"}
          >
            <Pin className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isPinned ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => copyToClipboard(msg.message)}
            className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-125 hover:rotate-12 ${
              darkMode 
                ? 'bg-gray-900 text-gray-400 hover:text-blue-400 hover:bg-gray-800' 
                : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            } shadow-lg`}
            title="Copy message"
          >
            <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-sm sm:text-base">
          {msg.message}
        </p>
        
        {messageReactions.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
            {messageReactions.map((reaction, idx) => (
              <span key={idx} className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode ? 'bg-white/10' : 'bg-black/5'
              }`}>
                {reaction.emoji}
              </span>
            ))}
          </div>
        )}

        <div className={`text-xs mt-3 sm:mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 ${
          isAgent 
            ? "text-blue-200/80" 
            : darkMode 
              ? "text-gray-400" 
              : "text-gray-500"
        }`}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span>{formatTime(msg.createdAt)}</span>
            {isAgent && (
              <span className="text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white/20">
                👑 Agent
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
            {quickReactions.slice(0, 4).map((emoji, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addReaction(msg._id, emoji)}
                className="text-xs px-1 sm:px-1.5 py-0.5 sm:py-1 rounded-lg transition-all duration-300 hover:scale-125 hover:bg-white/10"
                title={`React with ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;