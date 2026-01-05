import { useState } from "react";
import { FRANCHISE_CHATS } from "../../data";
import { Send, Menu, XCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ZoneTickets = () => {
   const { isDark } = useTheme();
   const [chats, setChats] = useState(FRANCHISE_CHATS);
   const [activeChatId, setActiveChatId] = useState(1);
   const [input, setInput] = useState('');
   const [showSidebar, setShowSidebar] = useState(false); // Mobile sidebar toggle

   const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

   const handleChatSelect = (chatId) => {
      setActiveChatId(chatId);
      setShowSidebar(false); // Close sidebar on mobile when selecting a chat
   };

   const handleSend = () => {
      if (!input.trim()) return;
      setChats(prev => prev.map(c =>
         c.id === activeChatId
            ? { ...c, messages: [...c.messages, { id: Date.now(), sender: 'agent', text: input, time: 'Now' }], lastMsg: input, time: 'Now' }
            : c
      ));
      setInput('');
   };

   const handleCloseTicket = () => {
      setChats(prev => prev.map(c =>
         c.id === activeChatId
            ? { ...c, status: 'Closed', messages: [...c.messages, { id: Date.now(), sender: 'system', text: 'Ticket Closed by Franchise Admin', time: 'Now' }] }
            : c
      ));
   };

   return (
      <div className={`rounded-xl shadow-sm border flex flex-col md:flex-row h-[calc(100vh-140px)] overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
         {/* Mobile Overlay */}
         {showSidebar && (
            <div
               className="fixed inset-0 bg-black/50 z-40 md:hidden"
               onClick={() => setShowSidebar(false)}
            />
         )}

         {/* Sidebar */}
         <div className={`absolute md:static inset-y-0 left-0 w-72 border-r flex flex-col z-50 transform transition-all duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            } ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
            <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
               <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>My Tickets</h2>
               <button
                  onClick={() => setShowSidebar(false)}
                  className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                  aria-label="Close sidebar"
               >
                  <XCircle className="w-5 h-5" />
               </button>
            </div>
            <div className={`p-4 border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
               <input type="text" placeholder="Search..." className={`w-full border rounded p-2 text-xs outline-none focus:ring-1 focus:ring-orange-500/50 ${isDark ? 'bg-slate-800 text-white border-slate-700 placeholder-slate-500' : 'bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-500'}`} />
            </div>
            <div className="flex-1 overflow-y-auto">
               {chats.map(chat => (
                  <div key={chat.id} onClick={() => handleChatSelect(chat.id)} className={`p-4 border-b cursor-pointer transition-colors ${isDark ? 'border-slate-800' : 'border-gray-200'} ${activeChatId === chat.id ? 'bg-orange-500/10 border-l-2 border-orange-500' : isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}>
                     <div className="flex justify-between mb-1">
                        <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{chat.name}</span>
                        <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>{chat.time}</span>
                     </div>
                     <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{chat.lastMsg}</p>
                     {chat.status === 'Closed' && <span className={`text-[9px] px-1 rounded mt-1 inline-block ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-700'}`}>Closed</span>}
                  </div>
               ))}
            </div>
         </div>

         {/* Chat Area */}
         <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#0b141a]' : 'bg-gray-50'}`}>
            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
               <div className="flex items-center gap-3 min-w-0">
                  <button
                     onClick={() => setShowSidebar(true)}
                     className={`md:hidden p-2 rounded-lg transition-colors flex-shrink-0 ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                     aria-label="Open sidebar"
                  >
                     <Menu className="w-5 h-5" />
                  </button>
                  <div className="min-w-0">
                     <h3 className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeChat.name}</h3>
                     <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>ID: {activeChat.customerId}</p>
                  </div>
               </div>
               {activeChat.status !== 'Closed' && (
                  <button className={`text-xs px-3 py-1 rounded border transition-colors flex-shrink-0 ${isDark ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'}`} onClick={handleCloseTicket}>Close Ticket</button>
               )}
            </div>
            <div className={`flex-1 p-3 md:p-4 space-y-4 overflow-y-auto ${isDark ? 'bg-[#0b141a]' : 'bg-gray-50'}`}>
               {activeChat.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : (msg.sender === 'system' ? 'justify-center' : 'justify-start')}`}>
                     {msg.sender === 'system' ? (
                        <span className={`text-xs px-2 py-1 rounded-full border ${isDark ? 'text-slate-500 bg-slate-900/50 border-slate-800' : 'text-gray-600 bg-gray-100 border-gray-300'}`}>{msg.text}</span>
                     ) : (
                        <div className={`max-w-[85%] md:max-w-xs p-3 rounded-lg text-sm ${msg.sender === 'agent' ? 'bg-orange-600 text-white' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-900'}`}>
                           <p className="break-words">{msg.text}</p>
                        </div>
                     )}
                  </div>
               ))}
            </div>
            {activeChat.status !== 'Closed' && (
               <div className={`p-3 md:p-4 border-t flex gap-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                  <input
                     value={input}
                     onChange={e => setInput(e.target.value)}
                     onKeyPress={e => e.key === 'Enter' && handleSend()}
                     type="text"
                     placeholder="Reply..."
                     className={`flex-1 border rounded p-2 text-sm outline-none focus:border-orange-500 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  />
                  <button onClick={handleSend} className="p-2 bg-orange-600 rounded text-white hover:bg-orange-500 flex-shrink-0 transition-all active:scale-95"><Send className="w-4 h-4" /></button>
               </div>
            )}
         </div>
      </div>
   );
};
export default ZoneTickets
