import React, { useState, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";
import Chat from "../../components/chat/Chat";
import { XCircle } from "lucide-react";

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

  /* ---------------- DATA ---------------- */
  const assignedTickets = useMemo(
    () => tickets.filter(t => t.assignedTo === loggedInStaff),
    [tickets]
  );

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

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`rounded-xl shadow-sm border flex h-[calc(100vh-140px)] overflow-hidden
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
        className={`absolute md:static inset-y-0 left-0 w-80 border-r flex flex-col z-50
          transform transition-all duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              Assigned Tickets
            </h2>
            <p className="text-xs text-gray-400">
              Tickets assigned to you
            </p>
          </div>
          <button onClick={() => setShowSidebar(false)} className="md:hidden">
            <XCircle className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {assignedTickets.map(ticket => (
            <div
              key={ticket.id}
              onClick={() => {
                setActiveTicketId(ticket.id);
                setShowSidebar(false);
              }}
              className={`p-4 cursor-pointer border-b transition-all
                ${activeTicketId === ticket.id
                  ? "border-l-4 border-l-purple-500 bg-purple-50 dark:bg-slate-800/60"
                  : "border-l-4 border-l-transparent hover:bg-gray-50 dark:hover:bg-slate-800/40"}
                ${isDark ? "border-slate-800" : "border-gray-200"}`}
            >
              <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                #{ticket.ticketId} {ticket.issue}
              </h4>
              <p className="text-xs text-gray-400">{ticket.customerName}</p>
            </div>
          ))}
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
