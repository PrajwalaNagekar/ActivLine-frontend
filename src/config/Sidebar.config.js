import {
  LayoutDashboard,
  Users,
  MapPin,
  CreditCard,
  Megaphone,
  MessageSquare,
  Settings,
  Building
} from "lucide-react";

export const adminSidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    key: "Dashboard",
    paths: ["/dashboard"],
  },
  {
    icon: Users,
    label: "Subscribers",
    key: "Subscribers",
    paths: ["/subscribers"],
  },
  {
    icon: MapPin,
    label: "Field Staff",
    key: "Field Staff",
    paths: ["/field-staff"],
  },
  {
    icon: Building,
    label: "Franchise Management",
    key: "Franchise",
    paths: ["/franchise"],
  },
  {
    icon: CreditCard,
    label: "Billing Engine",
    key: "Billing Engine",
    paths: ["/billing"],
  },
  {
    icon: Megaphone,
    label: "Offers & Ads",
    key: "Offers & Ads",
    paths: ["/offers"],
  },
  {
    icon: MessageSquare,
    label: "Support (WA)",
    key: "Support (WA)",
    paths: ["/support"],
  },
  {
    icon: Settings,
    label: "Settings",
    key: "Settings",
    paths: ["/settings"],
  },
];

export const franchiseSidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    key: "Dashboard",
    paths: ["/franchise-dashboard"],
  },
  {
    icon: Users,
    label: "Subscribers",
    key: "Subscribers",
    paths: ["/my-subscribers"],
  },
  {
    icon: MapPin,
    label: "Local Staff",
    key: "Local Staff",
    paths: ["/local-staff"],
  },
  {
    icon: CreditCard,
    label: "Collections",
    key: "Collections",
    paths: ["/collections"],
  },
  {
    icon: MessageSquare,
    label: "Zone Support",
    key: "Zone Support",
    paths: ["/zone-support"],
  },
  {
    icon: Settings,
    label: "Settings",
    key: "Settings",
    paths: ["/profile"],
  },
];
