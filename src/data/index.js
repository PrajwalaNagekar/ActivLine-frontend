// --- Mock Data ---

export const KPI_DATA = [
  { title: 'Total Revenue', value: '₹42.5L', change: '+12.5%', trend: 'up', sub: 'vs last month' },
  { title: 'Active Subscribers', value: '12,450', change: '+8.2%', trend: 'up', sub: 'vs last month' },
  { title: 'Churn Risk (AI)', value: '2.4%', change: '-0.5%', trend: 'down', sub: 'Predicted for Nov' },
  { title: 'Open Tickets', value: '45', change: '-12', trend: 'down', sub: 'Avg resolution: 2h' },
];

export const FRANCHISE_KPI_DATA = [
  { title: 'Franchise Revenue', value: '₹4.2L', change: '+5.2%', trend: 'up', sub: 'Commission: ₹84k' },
  { title: 'My Subscribers', value: '850', change: '+12', trend: 'up', sub: 'Sector 4 Area' },
  { title: 'Pending Collections', value: '₹45k', change: '-2.5%', trend: 'down', sub: '25 Users Due' },
  { title: 'Open Tickets', value: '8', change: '-2', trend: 'down', sub: 'Avg Time: 45m' },
];

export const FRANCHISE_CHATS = [
  {
    id: 1,
    name: 'Alex Johnson',
    customerId: '#882910',
    plan: '300Mbps',
    lastMsg: 'When will the technician arrive?',
    time: '10:45 AM',
    unread: true,
    status: 'Open',
    messages: [
      { id: 1, sender: 'user', text: 'Hi, I raised a ticket earlier.', time: '10:40 AM' },
      { id: 2, sender: 'agent', text: 'Yes, David is on his way.', time: '10:41 AM' },
      { id: 3, sender: 'user', text: 'When will the technician arrive?', time: '10:45 AM' }
    ]
  },
  {
    id: 2,
    name: 'Arun Kumar',
    customerId: '#882922',
    plan: 'Basic 100',
    lastMsg: 'I paid the bill cash to Mike.',
    time: 'Yesterday',
    unread: false,
    status: 'Open',
    messages: [
      { id: 1, sender: 'user', text: 'I paid the bill cash to Mike.', time: 'Yesterday' }
    ]
  }
];
export const INITIAL_SUBSCRIBERS = [
  { id: 'ACT-8821', name: 'Alex Johnson', location: 'Sec 4, Indiranagar', plan: 'GigaStream 300', status: 'Active', due: 0 },
  { id: 'ACT-8824', name: 'Sarah Lee', location: 'Sec 4, Indiranagar', plan: 'Business 1Gbps', status: 'Active', due: 0 },
  { id: 'ACT-8829', name: 'Arun Kumar', location: 'Sec 4, Indiranagar', plan: 'Basic 100', status: 'Suspended', due: 1499 },
  { id: 'ACT-8832', name: 'Priya M', location: 'Sec 4, Indiranagar', plan: 'GigaStream 300', status: 'Active', due: 0 },
  { id: 'ACT-8835', name: 'Sneha Reddy', location: 'Sec 4, Indiranagar', plan: 'Basic 50', status: 'Active', due: 899 },
];

export const INITIAL_STAFF = [
  {
    id: 1,
    name: 'David Miller',
    status: 'Busy',
    battery: 85,
    location: { top: '40%', left: '50%' },
    color: 'bg-yellow-500',
    task: {
      id: 'TSK-2023-89',
      type: 'Router Installation',
      customer: 'Suresh Raina',
      address: 'Sector 4, Apt 4B',
      status: 'In Progress'
    }
  },
  {
    id: 3,
    name: 'Mike Ross',
    status: 'Online',
    battery: 60,
    location: { top: '60%', left: '70%' },
    color: 'bg-green-500',
    task: {
      id: 'TSK-2023-85',
      type: 'Line Repair',
      customer: 'Harvey Specter',
      address: 'Sector 4 Main Road',
      status: 'Completed'
    }
  },
];
export const INITIAL_SUBSCRIBERS_DATA = [
  { id: 'ACT-8821', name: 'Alex Johnson', location: 'Indiranagar', plan: 'GigaStream 300', tech: 'Fiber To The Home', status: 'Active', due: '₹0' },
  { id: 'ACT-3822', name: 'Priya Sharma', location: 'Koramangala', plan: 'Basic 100', tech: 'Fiber To The Home', status: 'Active', due: '₹0' },
  { id: 'ACT-6623', name: 'Rahul Kumar', location: 'Whitefield', plan: 'GigaStream 300', tech: 'Fiber To The Home', status: 'Suspended', due: '₹1,499' },
  { id: 'ACT-5824', name: 'Sarah Lee', location: 'Indiranagar', plan: 'Business 1Gbps', tech: 'Fiber To The Home', status: 'Active', due: '₹0' },
  { id: 'ACT-9925', name: 'Mike Tyson', location: 'HSR Layout', plan: 'Basic 50', tech: 'Fiber To The Home', status: 'Inactive', due: '₹0' },
];

export const INITIAL_FIELD_STAFF_DATA = [
  {
    id: 1,
    name: 'David Miller',
    status: 'Busy',
    battery: 85,
    location: { top: '30%', left: '40%' },
    color: 'bg-yellow-500',
    task: {
      id: 'TSK-2023-89',
      type: 'Router Installation',
      customer: 'Suresh Raina',
      address: 'Sector 45, Apt 4B, Indiranagar',
      status: 'In Progress',
      startTime: '10:00 AM',
      proofUrl: null,
      signatureUrl: null
    }
  },
  {
    id: 2,
    name: 'Sarah Connor',
    status: 'Idle',
    battery: 92,
    location: { top: '55%', left: '60%' },
    color: 'bg-blue-500',
    task: {
      id: 'TSK-2023-90',
      type: 'Pending Dispatch',
      customer: '-',
      address: '-',
      status: 'Waiting',
      startTime: '-',
      proofUrl: null,
      signatureUrl: null
    }
  },
  {
    id: 3,
    name: 'Mike Ross',
    status: 'Online',
    battery: 60,
    location: { top: '75%', left: '80%' },
    color: 'bg-green-500',
    task: {
      id: 'TSK-2023-85',
      type: 'Line Repair',
      customer: 'Harvey Specter',
      address: 'Pearson Hardman Office, Whitefield',
      status: 'Completed',
      startTime: '09:15 AM',
      proofUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=300&h=200',
      signatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/John_Hancock_Signature.svg/1200px-John_Hancock_Signature.svg.png'
    }
  },
];

export const TRANSACTIONS_DATA = [
  { id: 'INV-2023-001', user: 'Alex Johnson', amount: '₹1,499', status: 'Paid', date: 'Oct 26, 10:30 AM', type: "New Purchase" },
  { id: 'INV-2023-002', user: 'Rahul Kumar', amount: '₹1,499', status: 'Pending', date: 'Oct 25, 09:15 AM', type: "Renewal" },
  { id: 'INV-2023-003', user: 'Priya Sharma', amount: '₹999', status: 'Paid', date: 'Oct 24, 02:20 PM', type: "Renewal" },
  { id: 'INV-2023-004', user: 'Mike Tyson', amount: '₹599', status: 'Pending', date: 'Oct 23, 11:00 AM', type: "Renewal" },
  { id: 'INV-2023-005', user: 'Sarah Lee', amount: '₹2,499', status: 'Paid', date: 'Oct 22, 04:45 PM', type: "Renewal" },
];

export const INITIAL_CAMPAIGNS_DATA = [
  { id: 1, name: 'Diwali Blast', target: 'Inactive > 30 days', offer: '50% Off Renewal', conversion: '12%', status: 'Active' },
  { id: 2, name: 'Netflix Up-sell', target: 'High Usage Users', offer: 'Free Upgrade', conversion: '8.5%', status: 'Active' },
];

export const INITIAL_FRANCHISE_DATA = [
  { id: 'FR-BLR-01', name: 'NetConnect Solutions', owner: 'Ramesh Gupta', location: 'Indiranagar', subscribers: 1240, share: '15%', status: 'Active' },
  { id: 'FR-BLR-02', name: 'SpeedLink Enterprises', owner: 'Suresh Reddy', location: 'Whitefield', subscribers: 850, share: '12%', status: 'Active' },
  { id: 'FR-BLR-03', name: 'Digital World', owner: 'Amit Shah', location: 'Koramangala', subscribers: 0, share: '15%', status: 'Pending' },
];
export const INITIAL_CHATS_DATA = [
  {
    id: 1,
    name: 'Alex Johnson',
    customerId: '#882910',
    plan: '300Mbps',
    lastMsg: 'My router is blinking red',
    time: '10:42 AM',
    unread: true,
    type: 'WhatsApp',
    messages: [
      { id: 1, sender: 'user', text: 'Hi, I am facing an issue with my internet.', time: '10:40 AM' },
      { id: 2, sender: 'agent', text: 'Hello Alex! I am here to help. What seems to be the problem?', time: '10:41 AM' },
      { id: 3, sender: 'user', text: 'My router is blinking red', time: '10:42 AM' }
    ]
  },
  {
    id: 2,
    name: 'Unknown (Lead)',
    customerId: 'LEAD-002',
    plan: 'N/A',
    lastMsg: 'Do you have coverage in Indiranagar?',
    time: '10:20 AM',
    unread: false,
    type: 'WhatsApp',
    messages: [
      { id: 1, sender: 'user', text: 'Do you have coverage in Indiranagar?', time: '10:20 AM' }
    ]
  },
  {
    id: 3,
    name: 'Priya Sharma',
    customerId: 'ACT-3822',
    plan: '100Mbps',
    lastMsg: 'Thanks for the quick help!',
    time: 'Yesterday',
    unread: false,
    type: 'App Chat',
    messages: [
      { id: 1, sender: 'user', text: 'Internet is very slow today.', time: 'Yesterday' },
      { id: 2, sender: 'agent', text: 'I have refreshed your connection from our end. Please restart your router.', time: 'Yesterday' },
      { id: 3, sender: 'user', text: 'Thanks for the quick help!', time: 'Yesterday' }
    ]
  },
];
