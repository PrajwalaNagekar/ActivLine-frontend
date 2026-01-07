// More responses for pagination
export const initialResponses = [
  {
    id: 1,
    title: "Greeting",
    message: "Hello! Thank you for contacting support. How can we help you today?",
  },
  {
    id: 2,
    title: "Closing",
    message: "If you have any further questions, feel free to reply. We're here to help!",
  },
  {
    id: 3,
    title: "Password Reset",
    message: "To reset your password, please visit our password reset page: [link]. If you need further assistance, let us know.",
  },
  {
    id: 4,
    title: "Payment Issue",
    message: "I understand you're experiencing payment issues. Let me help you resolve this. Could you provide your transaction ID?",
  },
  {
    id: 5,
    title: "Feature Request",
    message: "Thank you for your suggestion! We'll forward it to our product team for consideration.",
  },
  {
    id: 6,
    title: "Bug Report",
    message: "I'm sorry you're experiencing this issue. Could you provide more details about the problem you're encountering?",
  },
  {
    id: 7,
    title: "Account Setup",
    message: "To set up your account, please follow these steps: [instructions]. Let me know if you encounter any issues.",
  },
  {
    id: 8,
    title: "Subscription Renewal",
    message: "Your subscription is set to renew automatically. You can manage your subscription settings in your account dashboard.",
  },
  {
    id: 9,
    title: "Data Export",
    message: "You can export your data by going to Settings > Data Management > Export Data. The process may take a few minutes.",
  },
  {
    id: 10,
    title: "Two-Factor Authentication",
    message: "For enhanced security, we recommend enabling two-factor authentication. You can set it up in your security settings.",
  },
 
];


export const defaultResponses = [
  {
    id: 1,
    title: "Service Outage Response",
    message: "We're currently experiencing a service outage in your area. Our team is working on it and we expect to restore service within 2 hours. We apologize for the inconvenience.",
    category: "Service",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Payment Confirmation",
    message: "Thank you for your payment of ₹999. Your transaction has been successfully processed. Your next billing date is February 15, 2024.",
    category: "Billing",
    createdAt: "2024-01-14"
  },
  {
    id: 3,
    title: "New Connection Setup",
    message: "Welcome to our service! Your new connection will be activated within 24-48 hours. A technician will contact you for the installation appointment.",
    category: "New Connection",
    createdAt: "2024-01-13"
  },
  {
    id: 4,
    title: "Speed Issue Response",
    message: "We're sorry to hear you're experiencing speed issues. Please try restarting your router. If the issue persists, contact our support team for further assistance.",
    category: "Technical",
    createdAt: "2024-01-12"
  },
  {
    id: 5,
    title: "Bill Inquiry Response",
    message: "Your bill of ₹1,499 is due on January 25th. You can view the detailed breakdown in your account dashboard or download the PDF invoice.",
    category: "Billing",
    createdAt: "2024-01-11"
  },
  {
    id: 6,
    title: "Upgrade Confirmation",
    message: "Your service upgrade to Premium Plan has been confirmed. The new speed of 200 Mbps will be activated within 4 hours. No additional setup required.",
    category: "Upgrade",
    createdAt: "2024-01-10"
  },
  {
    id: 7,
    title: "Downtime Notification",
    message: "Scheduled maintenance will occur on January 20th from 2 AM to 4 AM. Service may be temporarily unavailable during this period. We appreciate your patience.",
    category: "Maintenance",
    createdAt: "2024-01-09"
  },
  {
    id: 8,
    title: "Welcome Package",
    message: "Welcome aboard! Your welcome package includes: 1. Router setup guide 2. Account credentials 3. Emergency contact numbers. Check your email for details.",
    category: "New Customer",
    createdAt: "2024-01-08"
  }
];

export const responseCategories = [
  "Service",
  "Billing", 
  "Technical",
  "New Connection",
  "Upgrade",
  "Maintenance",
  "New Customer"
];


export const itemsPerPageOptions = [
  { value: 4, label: "4 per page" },
  { value: 8, label: "8 per page" },
  { value: 12, label: "12 per page" },
  { value: 16, label: "16 per page" },
  { value: 20, label: "20 per page" },
  { value: 50, label: "50 per page" }
];