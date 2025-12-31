import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Search, Send, Tag, AlertCircle, XCircle, ChevronDown } from 'lucide-react';
import { INITIAL_CHATS_DATA } from '../data';

const SupportPage = () => {
  const [chats, setChats] = useState(INITIAL_CHATS_DATA);
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputMsg, setInputMsg] = useState('');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({ type: 'Technical Issue', priority: 'High', description: '' });
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

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
    <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 flex h-[calc(100vh-140px)] overflow-hidden">
      <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-900">
         <div className="p-4 border-b border-slate-800">
           <div className="flex items-center gap-2 mb-4">
             <MessageSquare className="w-5 h-5 text-slate-400" />
             <h2 className="font-bold text-white">WhatsApp API</h2>
           </div>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input type="text" placeholder="Search chats..." className="w-full pl-9 pr-3 py-2 bg-slate-800 rounded-lg text-sm text-white outline-none focus:ring-1 focus:ring-blue-500/50 border border-slate-700 placeholder-slate-500" />
           </div>
         </div>
         <div className="flex-1 overflow-y-auto">
           {chats.map(chat => (
             <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 border-b border-slate-800 hover:bg-slate-800 cursor-pointer transition-colors ${activeChatId === chat.id ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
             >
               <div className="flex justify-between items-start mb-1">
                 <h4 className={`text-sm font-bold ${chat.unread ? 'text-white' : 'text-slate-300'}`}>{chat.name}</h4>
                 <span className="text-[10px] text-slate-500">{chat.time}</span>
               </div>
               <p className={`text-xs truncate ${chat.unread ? 'font-medium text-slate-200' : 'text-slate-500'}`}>{chat.lastMsg}</p>
               <div className="flex justify-between items-center mt-2">
                 <span className="text-[10px] text-slate-400 bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded">{chat.type}</span>
                 {chat.unread && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
               </div>
             </div>
           ))}
         </div>
      </div>
  
      <div className="flex-1 flex flex-col bg-[#0b141a] relative">
         <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center shadow-md z-10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center font-bold text-blue-400">
                {activeChat?.name.charAt(0)}
              </div>
              <div>
                 <h3 className="font-bold text-white text-sm">{activeChat?.name}</h3>
                 <p className="text-xs text-slate-400">ID: {activeChat?.customerId} • Plan: {activeChat?.plan}</p>
              </div>
           </div>
           <button 
             onClick={() => setShowTicketModal(true)}
             className="text-blue-400 text-sm font-medium hover:bg-slate-800 px-3 py-1.5 rounded transition-colors border border-slate-700 flex items-center gap-2"
           >
             <Tag className="w-4 h-4" /> Create Ticket
           </button>
         </div>
  
         <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#0b141a]">
            <div className="flex justify-center">
              <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded shadow-sm border border-slate-700">Today</span>
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
                   <div className={`p-3 rounded-2xl shadow-md max-w-md border text-sm ${
                      msg.sender === 'agent' 
                        ? 'bg-blue-600 border-blue-500 text-white rounded-br-none' 
                        : 'bg-slate-800 border-slate-700 text-slate-200 rounded-bl-none'
                   }`}>
                      <p>{msg.text}</p>
                      <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'agent' ? 'text-blue-200' : 'text-slate-500'}`}>{msg.time}</span>
                   </div>
                 )}
              </div>
            ))}
            <div ref={messagesEndRef} />
         </div>
  
         <div className="bg-slate-900 p-4 border-t border-slate-800">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
               <button onClick={() => setInputMsg("Hello! How can I help you today?")} className="whitespace-nowrap px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 text-xs rounded-full hover:bg-slate-700 hover:text-white transition-colors">Template: Greeting</button>
               <button onClick={() => setInputMsg("Please try restarting your router by unplugging it for 10 seconds.")} className="whitespace-nowrap px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 text-xs rounded-full hover:bg-slate-700 hover:text-white transition-colors">Template: Router Reset</button>
               <button onClick={() => setInputMsg("I have created a support ticket for this issue. Our team will visit shortly.")} className="whitespace-nowrap px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 text-xs rounded-full hover:bg-slate-700 hover:text-white transition-colors">Template: Ticket Created</button>
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
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 outline-none text-white focus:ring-1 focus:ring-blue-500/50 placeholder-slate-500" 
               />
               <button type="submit" className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 shadow-lg shadow-green-900/20 transition-all active:scale-95"><Send className="w-5 h-5" /></button>
            </form>
         </div>
      </div>

      {showTicketModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200 border border-slate-800">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 rounded-t-xl">
              <h3 className="font-bold text-white">Create Support Ticket</h3>
              <button onClick={() => setShowTicketModal(false)} className="text-slate-400 hover:text-white"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Issue Type</label>
                  <div className="relative">
                    <select 
                      value={ticketForm.type}
                      onChange={(e) => setTicketForm({...ticketForm, type: e.target.value})}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 appearance-none"
                    >
                       <option>Technical Issue</option>
                       <option>Billing Dispute</option>
                       <option>Plan Upgrade</option>
                       <option>Relocation Request</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Priority</label>
                  <div className="relative">
                    <select 
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                      className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 appearance-none"
                    >
                       <option>High</option>
                       <option>Medium</option>
                       <option>Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                  <textarea 
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    placeholder="Enter ticket details..." 
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-blue-500 min-h-[100px]"
                  ></textarea>
               </div>
            </div>
            <div className="p-4 border-t border-slate-800 flex gap-3 justify-end bg-slate-900 rounded-b-xl">
              <button onClick={() => setShowTicketModal(false)} className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleCreateTicket} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-lg transition-all">Create Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;

