import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Send, Tag, AlertCircle, XCircle, ChevronDown, Menu, User, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/* ---------------- MOCK DATA ---------------- */
const STAFF_MEMBERS = [
  { id: 101, name: "Admin User", status: "online" },
  { id: 102, name: "Sarah Smith", status: "online" },
  { id: 103, name: "Mike Johnson", status: "offline" },
  { id: 104, name: "Emily Davis", status: "busy" },
];

const INITIAL_TICKETS = [
  {
    id: 1,
    ticketId: "4821",
    issue: "Router Blinking Red",
    customerName: "Rahul Sharma",
    customerId: "C-1024",
    plan: "Fiber 100 Mbps",
    assignedTo: 101, // Admin User
    status: "In Progress",
    unread: true,
    time: "10m ago",
    type: "Technical",
    messages: [
      { id: 1, sender: "customer", text: "Hi, my router is blinking red since morning.", time: "10:00 AM" },
      { id: 2, sender: "agent", text: "Hello Rahul, I can help with that. Have you tried restarting it?", time: "10:02 AM" },
      { id: 3, sender: "customer", text: "Yes, tried twice. Still red.", time: "10:05 AM" },
    ]
  },
  {
    id: 2,
    ticketId: "9923",
    issue: "Bill Payment Failed",
    customerName: "Priya Patel",
    customerId: "C-2045",
    plan: "Fiber 300 Mbps",
    assignedTo: 102, // Sarah
    status: "Open",
    unread: false,
    time: "1h ago",
    type: "Billing",
    messages: [
      { id: 1, sender: "customer", text: "I tried paying my bill but it failed.", time: "09:30 AM" },
      { id: 2, sender: "system", text: "Ticket assigned to Sarah Smith", time: "09:35 AM" },
    ]
  },
  {
    id: 3,
    ticketId: "3312",
    issue: "Upgrade Plan Request",
    customerName: "Amit Kumar",
    customerId: "C-8821",
    plan: "Fiber 50 Mbps",
    assignedTo: null,
    status: "Resolved",
    unread: false,
    time: "1d ago",
    type: "Sales",
    messages: [
      { id: 1, sender: "customer", text: "I want to upgrade to 100 Mbps.", time: "Yesterday" },
      { id: 2, sender: "agent", text: "Sure, I have processed your request.", time: "Yesterday" },
      { id: 3, sender: "system", text: "Status changed to Resolved", time: "Yesterday" },
    ]
  }
];

/* ---------------- HELPERS ---------------- */
const getStatusColor = (status, isDark) => {
  switch (status) {
    case 'Open': return isDark ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'In Progress': return isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Resolved': return isDark ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-700 border-green-200';
    case 'Closed': return isDark ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-100 text-slate-600 border-slate-200';
    default: return 'bg-gray-100 text-gray-600';
  }
};

/* ---------------- COMPONENT ---------------- */
const SupportPage = () => {
  const { isDark } = useTheme();
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All'); // All, Open, In Progress, Resolved
  const [inputMsg, setInputMsg] = useState('');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({ type: 'Technical Issue', priority: 'High', description: '' });
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  const activeTicket = tickets.find(c => c.id === activeTicketId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeTicket?.messages]);

  const handleTicketSelect = (id) => {
    setActiveTicketId(id);
    setShowSidebar(false);
    // Mark as read logic could go here
  };

  // Filter Logic
  const filteredTickets = useMemo(() => {
    if (filterStatus === 'All') return tickets;
    return tickets.filter(t => t.status === filterStatus);
  }, [tickets, filterStatus]);

  // Send Message
  const handleSendMessage = (text = inputMsg) => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), sender: 'agent', text, time: 'Just now' };
    setTickets(prev => prev.map(t =>
      t.id === activeTicketId
        ? { ...t, messages: [...t.messages, newMsg], unread: false }
        : t
    ));
    setInputMsg('');
  };

  // Handle Assignment Change
  const handleAssigneeChange = (staffId) => {
    const staff = STAFF_MEMBERS.find(s => s.id === parseInt(staffId));
    if (!staff && staffId !== "") return;

    const systemMsg = {
      id: Date.now(),
      sender: 'system',
      text: staffId ? `Ticket assigned to ${staff.name}` : `Ticket unassigned`,
      time: 'Just now'
    };

    setTickets(prev => prev.map(t =>
      t.id === activeTicketId
        ? { ...t, assignedTo: staffId ? parseInt(staffId) : null, messages: [...t.messages, systemMsg] }
        : t
    ));
  };

  // Handle Status Change
  const handleStatusChange = (newStatus) => {
    const systemMsg = {
      id: Date.now(),
      sender: 'system',
      text: `Status changed to ${newStatus}`,
      time: 'Just now'
    };

    setTickets(prev => prev.map(t =>
      t.id === activeTicketId
        ? { ...t, status: newStatus, messages: [...t.messages, systemMsg] }
        : t
    ));
  };

  // Create New Ticket
  const handleCreateTicket = () => {
    const newId = Math.floor(1000 + Math.random() * 9000);
    const newTicket = {
      id: Date.now(),
      ticketId: newId.toString(),
      issue: ticketForm.description.substring(0, 20) + (ticketForm.description.length > 20 ? "..." : "") || "New Ticket",
      customerName: "Unknown Customer", // In real app, would be selected
      customerId: "N/A",
      plan: "N/A",
      assignedTo: 101, // Default to admin for now
      status: "Open",
      unread: false,
      time: "Just now",
      type: ticketForm.type,
      messages: [
        { id: 1, sender: 'system', text: `Ticket #${newId} created: ${ticketForm.type} - ${ticketForm.description}`, time: 'Just now' }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setActiveTicketId(newTicket.id);
    setShowTicketModal(false);
    setTicketForm({ type: 'Technical Issue', priority: 'High', description: '' });
  };

  /* ---------------- UI STYLES ---------------- */
  const containerClasses = isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-gray-500';
  const inputClasses = isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500';

  // Purple Theme logic for Light Mode
  const purpleAccent = isDark ? 'text-blue-400' : 'text-purple-600';
  const purpleBg = isDark ? 'bg-blue-600' : 'bg-purple-600';
  const purpleBorder = isDark ? 'border-blue-500' : 'border-purple-200';
  const purpleHover = isDark ? 'hover:bg-slate-800' : 'hover:bg-purple-50';

  return (
    <div className={`rounded-xl shadow-sm border flex flex-col md:flex-row h-[calc(100vh-140px)] overflow-hidden ${containerClasses}`}>
      {/* Mobile Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowSidebar(false)} />
      )}

      {/* SIDEBAR */}
      <div className={`absolute md:static inset-y-0 left-0 w-80 border-r flex flex-col z-50 transform transition-all duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>

        {/* Sidebar Header */}
        <div className={`p-4 border-b space-y-3 ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className='flex flex-col'>
              <h2 className={`font-bold text-lg ${textPrimary}`}>Support Inbox</h2>
              <p className="text-xs text-gray-400">{tickets.length} Total Tickets</p>
            </div>
            <button onClick={() => setShowSidebar(false)} className="md:hidden"><XCircle className={`w-5 h-5 ${textSecondary}`} /></button>
          </div>
          {/* Status Filter Tabs */}
          <div className="flex gap-1 bg-gray-100/50 p-1 rounded-lg overflow-x-auto scrollbar-hide">
            {['All', 'Open', 'In Progress', 'Resolved'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${filterStatus === status
                  ? (isDark ? 'bg-slate-700 text-white shadow' : 'bg-white text-purple-700 shadow')
                  : (isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className={`p-3 border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
            <input type="text" placeholder="Search ticket # or issue..." className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-purple-500/50 border ${inputClasses}`} />
          </div>
        </div>

        {/* Ticket List */}
        <div className="flex-1 overflow-y-auto">
          {filteredTickets.map(ticket => (
            <div
              key={ticket.id}
              onClick={() => handleTicketSelect(ticket.id)}
              className={`p-4 border-b cursor-pointer transition-all ${activeTicketId === ticket.id
                ? (isDark ? 'bg-slate-800/80 border-l-4 border-l-blue-500' : 'bg-purple-50 border-l-4 border-l-purple-500')
                : 'border-l-4 border-l-transparent hover:bg-gray-50 dark:hover:bg-slate-800/50'
                } ${isDark ? 'border-slate-800' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-sm font-bold line-clamp-1 ${ticket.unread ? textPrimary : textSecondary}`}>{ticket.issue}</h4>
                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{ticket.time}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium ${isDark ? 'text-blue-300' : 'text-purple-700'}`}>#{ticket.ticketId}</span>
                <span className={`text-xs ${textSecondary}`}>• {ticket.customerName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(ticket.status, isDark)}`}>
                  {ticket.status}
                </span>
                {ticket.unread && <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-500' : 'bg-purple-500'}`}></div>}
              </div>
            </div>
          ))}
          {filteredTickets.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">No tickets found</div>
          )}
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className={`flex-1 flex flex-col relative ${isDark ? 'bg-[#0b141a]' : 'bg-gray-50'}`}>
        {activeTicket ? (
          <>
            {/* Chat Header */}
            <div className={`p-4 border-b shadow-sm z-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between ${containerClasses}`}>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowSidebar(true)} className="md:hidden"><Menu className={`w-5 h-5 ${textSecondary}`} /></button>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-100 text-purple-600'}`}>
                  {activeTicket.customerName.charAt(0)}
                </div>

                <div>
                  <h3 className={`font-bold text-base ${textPrimary}`}>{activeTicket.issue}</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={isDark ? 'text-blue-300' : 'text-purple-600 font-medium'}>#{activeTicket.ticketId}</span>
                    <span className={textSecondary}>• {activeTicket.customerName}</span>
                  </div>
                </div>
              </div>

              {/* Header Controls (Dropdowns) */}
              <div className="flex items-center gap-3">
                {/* Assigned To */}
                <div className="relative">
                  <select
                    value={activeTicket.assignedTo || ""}
                    onChange={(e) => handleAssigneeChange(e.target.value)}
                    className={`pl-8 pr-4 py-1.5 text-xs rounded-lg border outline-none appearance-none cursor-pointer focus:ring-1 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-500' : 'bg-white border-gray-200 text-gray-700 focus:ring-purple-500 hover:border-purple-300'}`}
                  >
                    <option value="">Unassigned</option>
                    {STAFF_MEMBERS.map(staff => (
                      <option key={staff.id} value={staff.id}>{staff.name}</option>
                    ))}
                  </select>
                  <User className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${textSecondary}`} />
                </div>

                {/* Status */}
                <div className="relative">
                  <select
                    value={activeTicket.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`pl-3 pr-8 py-1.5 text-xs font-semibold rounded-full border outline-none appearance-none cursor-pointer transition-all ${getStatusColor(activeTicket.status, isDark)}`}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <ChevronDown className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50`} />
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div className={`flex-1 p-4 md:p-6 overflow-y-auto space-y-4 ${isDark ? 'bg-[#0b141a]' : 'bg-white/50 backdrop-blur-sm'}`}>
              <div className="flex justify-center">
                <span className={`text-[10px] px-3 py-1 rounded-full shadow-sm border ${isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>Today</span>
              </div>

              {activeTicket.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'system' ? (
                    <div className="w-full flex justify-center my-2">
                      <div className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border ${isDark ? 'bg-slate-800/50 text-slate-400 border-slate-700' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        <AlertCircle className="w-3 h-3" /> {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div className={`p-3.5 rounded-2xl shadow-sm max-w-[85%] md:max-w-md border text-sm relative group ${msg.sender === 'agent'
                      ? (isDark ? 'bg-blue-600 border-blue-500 text-white rounded-br-none' : 'bg-purple-600 border-purple-500 text-white rounded-br-none')
                      : (isDark ? 'bg-slate-800 border-slate-700 text-slate-200 rounded-bl-none' : 'bg-white border-gray-200 text-gray-800 rounded-bl-none')
                      }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className={`text-[10px] block text-right mt-1 opacity-70 ${msg.sender === 'agent' ? 'text-white' : ''}`}>
                        {msg.time}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${containerClasses}`}>
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                {['Greeting', 'Router Reset', 'Ticket Created'].map(template => (
                  <button
                    key={template}
                    onClick={() => setInputMsg(template === 'Greeting' ? "Hello! How can I help you today?" : template === 'Router Reset' ? "Please try restarting your router." : "I have created a ticket for this issue.")}
                    className={`whitespace-nowrap px-3 py-1 border text-xs rounded-full transition-colors flex-shrink-0 ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 hover:text-gray-900'}`}
                  >
                    {template}
                  </button>
                ))}
              </div>
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type your reply..."
                  className={`flex-1 border rounded-lg py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${inputClasses} ${!isDark && 'focus:border-purple-400'}`}
                />
                <button
                  type="submit"
                  className={`p-3 rounded-lg text-white shadow-lg transition-all active:scale-95 ${isDark ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20'}`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-slate-800 text-slate-600' : 'bg-gray-100 text-gray-300'}`}>
              <Tag className="w-10 h-10" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${textPrimary}`}>No Ticket Selected</h3>
            <p className={`text-sm max-w-xs ${textSecondary}`}>Select a ticket from the sidebar to view details and chat with the customer.</p>

            <button
              onClick={() => setShowTicketModal(true)}
              className={`mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-purple-600 hover:bg-purple-500'}`}
            >
              Create New Ticket
            </button>
          </div>
        )}
      </div>

      {/* CREATE TICKET MODAL */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl shadow-2xl w-full max-w-md border overflow-hidden animate-in zoom-in-95 duration-200 ${containerClasses}`}>
            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-gray-50'}`}>
              <h3 className={`font-bold ${textPrimary}`}>Create Support Ticket</h3>
              <button onClick={() => setShowTicketModal(false)} className={`transition-colors ${textSecondary} hover:text-red-500`}><XCircle className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${textSecondary}`}>Issue Type</label>
                <div className="relative">
                  <select
                    value={ticketForm.type}
                    onChange={(e) => setTicketForm({ ...ticketForm, type: e.target.value })}
                    className={`w-full p-3 border rounded-xl text-sm outline-none appearance-none cursor-pointer focus:ring-2 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-500/20' : 'bg-white border-gray-200 text-gray-900 focus:ring-purple-500/20 focus:border-purple-400'}`}
                  >
                    <option>Technical Issue</option>
                    <option>Billing Dispute</option>
                    <option>Plan Upgrade</option>
                    <option>Relocation Request</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${textSecondary}`} />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${textSecondary}`}>Priority</label>
                <div className="relative">
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className={`w-full p-3 border rounded-xl text-sm outline-none appearance-none cursor-pointer focus:ring-2 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-500/20' : 'bg-white border-gray-200 text-gray-900 focus:ring-purple-500/20 focus:border-purple-400'}`}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${textSecondary}`} />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${textSecondary}`}>Description</label>
                <textarea
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  placeholder="Describe the issue..."
                  className={`w-full p-3 border rounded-xl text-sm outline-none focus:ring-2 min-h-[120px] resize-none transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-500/20' : 'bg-white border-gray-200 text-gray-900 focus:ring-purple-500/20 focus:border-purple-400'}`}
                ></textarea>
              </div>
            </div>
            <div className={`p-4 border-t flex gap-3 justify-end ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-gray-50'}`}>
              <button onClick={() => setShowTicketModal(false)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-200'}`}>Cancel</button>
              <button onClick={handleCreateTicket} className={`px-6 py-2 text-sm font-bold text-white rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95 ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-purple-600 hover:bg-purple-500'}`}>Create Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;
