import React, { useState, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";
import Chat from "../../components/chat/Chat";
import { X, Search } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const INITIAL_TICKETS = [
  {
    id: 1,
    ticketId: 1234,
    issue: "My router is blinking red",
    customerName: "Rahul Sharma",
    assignedTo: "John",
    status: "In Progress",
    time: "10:45 AM",
    unread: true,
    messages: [
      { id: 1, sender: "customer", text: "Router blinking red", time: "10:30 AM" }
    ],
  },
  {
    id: 2,
    ticketId: 5678,
    issue: "Internet speed is very slow",
    customerName: "Anita Verma",
    assignedTo: "John",
    status: "Open",
    time: "09:20 AM",
    unread: false,
    messages: [],
  },
];

/* ---------------- COMPONENT ---------------- */
const AssignedTickets = () => {
  const { isDark } = useTheme();
  const loggedInStaff = "John";

  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- DATA ---------------- */
  const assignedTickets = useMemo(
    () => tickets.filter(t => t.assignedTo === loggedInStaff),
    [tickets]
  );

  const filteredTickets = useMemo(() => {
    if (!searchQuery) return assignedTickets;
    const lowerQuery = searchQuery.toLowerCase();
    return assignedTickets.filter(
      (t) =>
        t.customerName.toLowerCase().includes(lowerQuery) ||
        t.issue.toLowerCase().includes(lowerQuery) ||
        String(t.ticketId).includes(lowerQuery)
    );
  }, [assignedTickets, searchQuery]);

  const activeTicket = assignedTickets.find(t => t.id === activeTicketId);

  /* ---------------- HANDLERS ---------------- */
  const handleSendMessage = (text) => {
    if (!text.trim() || !activeTicket) return;

    setTickets(prev =>
      prev.map(t =>
        t.id === activeTicket.id
          ? {
            ...t,
            unread: false,
            messages: [
              ...t.messages,
              { id: Date.now(), sender: "agent", text, time: "Just now" }
            ],
          }
          : t
      )
    );
  };

  const handleStatusChange = (status) => {
    if (!activeTicket) return;

    setTickets(prev =>
      prev.map(t =>
        t.id === activeTicket.id
          ? {
            ...t,
            status,
            messages: [
              ...t.messages,
              {
                id: Date.now(),
                sender: "system",
                text: `Status changed to ${status}`,
                time: "Just now",
              },
            ],
          }
          : t
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "In Progress": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Resolved": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Closed": return "bg-slate-500/10 text-slate-500 border-slate-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`rounded-xl shadow-sm border flex h-[calc(100vh-140px)] overflow-hidden animate-fade-in-up
        ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}
    >

      {/* MOBILE OVERLAY */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* ---------------- SIDEBAR (Ticket List) ---------------- */}
      <div
        className={`absolute md:static inset-y-0 left-0 w-80 lg:w-96 border-r flex flex-col z-50
          transform transition-all duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${isDark ? "border-slate-800" : "border-gray-100"}`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                Assigned Tickets
              </h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                {assignedTickets.length} tickets assigned to you
              </p>
            </div>
            <button onClick={() => setShowSidebar(false)} className="md:hidden">
              <X className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-gray-500"}`} />
            </button>
          </div>

          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-slate-500" : "text-gray-400"}`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-violet-500/20 transition-all
                ${isDark
                  ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-violet-500/50"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500"
                }`}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredTickets.map(ticket => (
            <div
              key={ticket.id}
              onClick={() => {
                setActiveTicketId(ticket.id);
                setShowSidebar(false);
              }}
              className={`p-4 cursor-pointer border-b transition-all hover:pl-5
                ${activeTicketId === ticket.id
                  ? isDark ? "bg-slate-800/80 border-l-4 border-l-violet-500" : "bg-violet-50 border-l-4 border-l-violet-500"
                  : "border-l-4 border-l-transparent hover:bg-gray-50 dark:hover:bg-slate-800/40"}
                ${isDark ? "border-slate-800" : "border-gray-100"}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-mono font-medium ${isDark ? "text-violet-400" : "text-violet-600"}`}>
                  #{ticket.ticketId}
                </span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              <h4 className={`text-sm font-semibold mb-1 line-clamp-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                {ticket.issue}
              </h4>
              <div className="flex justify-between items-center text-xs">
                <p className={`${isDark ? "text-slate-400" : "text-gray-500"}`}>{ticket.customerName}</p>
                <div className="flex items-center gap-2">
                  <span className={`${isDark ? "text-slate-500" : "text-gray-400"}`}>{ticket.time}</span>
                  {ticket.unread && (
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredTickets.length === 0 && (
            <div className="p-8 text-center">
              <p className={`text-sm ${isDark ? "text-slate-500" : "text-gray-400"}`}>No tickets found.</p>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- CHAT ---------------- */}
      <Chat
        ticket={activeTicket}
        showAssignment={false}
        showStatus={true}
        onSendMessage={handleSendMessage}
        onStatusChange={handleStatusChange}
        onBackMobile={() => setShowSidebar(true)}
      />
    </div>
  );
};

export default AssignedTickets;
