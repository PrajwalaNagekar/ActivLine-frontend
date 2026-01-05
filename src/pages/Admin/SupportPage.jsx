import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Search, Send, Tag, AlertCircle, XCircle, ChevronDown, Menu, ArrowLeft } from 'lucide-react';
import { INITIAL_CHATS_DATA } from '../../data';
import { useTheme } from '../../context/ThemeContext';

const SupportPage = () => {
  const { isDark } = useTheme();
  const [chats, setChats] = useState(INITIAL_CHATS_DATA);
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputMsg, setInputMsg] = useState('');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({ type: 'Technical Issue', priority: 'High', description: '' });
  const [showSidebar, setShowSidebar] = useState(false); // Mobile sidebar toggle
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
    setShowSidebar(false); // Close sidebar on mobile when selecting a chat
  };

  const handleSendMessage = (text = inputMsg) => {
    if (!text.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'agent',
      text: text,
      time: 'Just now'
    };

    setChats(prev => prev.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMsg: text,
          time: 'Just now'
        };
      }
      return c;
    }));
    setInputMsg('');
  };

  const handleCreateTicket = () => {
    const ticketId = Math.floor(1000 + Math.random() * 9000);
    const ticketMsg = {
      id: Date.now(),
      sender: 'system',
      text: `Ticket #${ticketId} created: ${ticketForm.type} (${ticketForm.priority}) - ${ticketForm.description}`,
      time: 'Just now'
    };

    setChats(prev => prev.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, ticketMsg]
        };
      }
      return c;
    }));
    setShowTicketModal(false);
    setTicketForm({ type: 'Technical Issue', priority: 'High', description: '' });
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
      <div className={`absolute md:static inset-y-0 left-0 w-80 border-r flex flex-col z-50 transform transition-all duration-300 ease-in-out ${
        showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
         <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
           <div className="flex items-center gap-2">
             <MessageSquare className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-600'}`} />
             <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>WhatsApp API</h2>
           </div>
           <button
             onClick={() => setShowSidebar(false)}
             className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
             aria-label="Close sidebar"
           >
             <XCircle className="w-5 h-5" />
           </button>
         </div>
         <div className={`p-4 border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
           <div className="relative">
             <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
             <input type="text" placeholder="Search chats..." className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500/50 border ${isDark ? 'bg-slate-800 text-white border-slate-700 placeholder-slate-500' : 'bg-gray-100 text-gray-900 border-gray-300 placeholder-gray-500'}`} />
           </div>
         </div>
         <div className="flex-1 overflow-y-auto">
           {chats.map(chat => (
             <div 
                key={chat.id} 
                onClick={() => handleChatSelect(chat.id)}
                className={`p-4 border-b cursor-pointer transition-colors ${activeChatId === chat.id ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'} ${isDark ? 'border-slate-800 hover:bg-slate-800' : 'border-gray-200 hover:bg-gray-50'}`}
             >
               <div className="flex justify-between items-start mb-1">
                 <h4 className={`text-sm font-bold ${chat.unread ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-slate-300' : 'text-gray-700')}`}>{chat.name}</h4>
                 <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-gray-600'}`}>{chat.time}</span>
               </div>
               <p className={`text-xs truncate ${chat.unread ? (isDark ? 'font-medium text-slate-200' : 'font-medium text-gray-900') : (isDark ? 'text-slate-500' : 'text-gray-600')}`}>{chat.lastMsg}</p>
               <div className="flex justify-between items-center mt-2">
                 <span className={`text-[10px] px-1.5 py-0.5 rounded ${isDark ? 'text-slate-400 bg-slate-800 border border-slate-700' : 'text-gray-600 bg-gray-100 border border-gray-300'}`}>{chat.type}</span>
                 {chat.unread && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
               </div>
             </div>
           ))}
         </div>
      </div>
  
      {/* Chat Area */}
      <div className={`flex-1 flex flex-col relative ${isDark ? 'bg-[#0b141a]' : 'bg-gray-50'}`}>
         <div className={`p-4 border-b flex justify-between items-center shadow-md z-10 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
           <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(true)}
                className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-400">
                {activeChat?.name.charAt(0)}
              </div>
              <div>
                 <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeChat?.name}</h3>
                 <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>ID: {activeChat?.customerId} • Plan: {activeChat?.plan}</p>
              </div>
           </div>
           <button 
             onClick={() => setShowTicketModal(true)}
             className={`text-blue-400 text-sm font-medium px-3 py-1.5 rounded transition-colors border flex items-center gap-2 ${isDark ? 'hover:bg-slate-800 border-slate-700' : 'hover:bg-gray-100 border-gray-300'}`}
           >
             <Tag className="w-4 h-4" /> <span className="hidden sm:inline">Create Ticket</span>
           </button>
         </div>
  
         <div className={`flex-1 p-3 md:p-6 overflow-y-auto space-y-4 ${isDark ? 'bg-[#0b141a]' : 'bg-gray-50'}`}>
            <div className="flex justify-center">
              <span className={`text-[10px] px-2 py-1 rounded shadow-sm border ${isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-gray-600 border-gray-300'}`}>Today</span>
            </div>
            
            {activeChat?.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                 {msg.sender === 'system' ? (
                    <div className="w-full flex justify-center my-2">
                       <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                          <AlertCircle className="w-3 h-3" /> {msg.text}
                       </div>
                    </div>
                 ) : (
                   <div className={`p-3 rounded-2xl shadow-md max-w-[85%] md:max-w-md border text-sm ${
                      msg.sender === 'agent' 
                        ? 'bg-blue-600 border-blue-500 text-white rounded-br-none' 
                        : isDark ? 'bg-slate-800 border-slate-700 text-slate-200 rounded-bl-none' : 'bg-white border-gray-300 text-gray-900 rounded-bl-none'
                   }`}>
                      <p className="break-words">{msg.text}</p>
                      <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'agent' ? 'text-blue-200' : (isDark ? 'text-slate-500' : 'text-gray-600')}`}>{msg.time}</span>
                   </div>
                 )}
              </div>
            ))}
            <div ref={messagesEndRef} />
         </div>
  
         <div className={`p-3 md:p-4 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
               <button onClick={() => setInputMsg("Hello! How can I help you today?")} className={`whitespace-nowrap px-3 py-1 border text-xs rounded-full transition-colors flex-shrink-0 ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-gray-900'}`}>Template: Greeting</button>
               <button onClick={() => setInputMsg("Please try restarting your router by unplugging it for 10 seconds.")} className={`whitespace-nowrap px-3 py-1 border text-xs rounded-full transition-colors flex-shrink-0 ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-gray-900'}`}>Template: Router Reset</button>
               <button onClick={() => setInputMsg("I have created a support ticket for this issue. Our team will visit shortly.")} className={`whitespace-nowrap px-3 py-1 border text-xs rounded-full transition-colors flex-shrink-0 ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-gray-900'}`}>Template: Ticket Created</button>
            </div>
            <form 
              className="flex items-center gap-2"
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            >
               <input 
                  type="text" 
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type a message..." 
                  className={`flex-1 border rounded-lg py-2 md:py-3 px-3 md:px-4 text-sm outline-none focus:ring-1 focus:ring-blue-500/50 ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
               />
               <button type="submit" className="p-2 md:p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 shadow-lg shadow-green-900/20 transition-all active:scale-95 flex-shrink-0"><Send className="w-4 h-4 md:w-5 md:h-5" /></button>
            </form>
         </div>
      </div>

      {showTicketModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className={`p-4 border-b flex justify-between items-center rounded-t-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create Support Ticket</h3>
              <button onClick={() => setShowTicketModal(false)} className={isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Issue Type</label>
                  <div className="relative">
                    <select 
                      value={ticketForm.type}
                      onChange={(e) => setTicketForm({...ticketForm, type: e.target.value})}
                      className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 appearance-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                       <option>Technical Issue</option>
                       <option>Billing Dispute</option>
                       <option>Plan Upgrade</option>
                       <option>Relocation Request</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
                  </div>
               </div>
               <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Priority</label>
                  <div className="relative">
                    <select 
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                      className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 appearance-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                       <option>High</option>
                       <option>Medium</option>
                       <option>Low</option>
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
                  </div>
               </div>
               <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-gray-700'}`}>Description</label>
                  <textarea 
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    placeholder="Enter ticket details..." 
                    className={`w-full p-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 min-h-[100px] ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  ></textarea>
               </div>
            </div>
            <div className={`p-4 border-t flex gap-3 justify-end rounded-b-xl ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
              <button onClick={() => setShowTicketModal(false)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}>Cancel</button>
              <button onClick={handleCreateTicket} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-lg transition-all">Create Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;

