import {
  Blocks,
  Calendar,
  Grid,
  Monitor,
  Settings,
  ShoppingBag,
  Tv,
  View,
} from "lucide-react";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <Grid />,
  },
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: <Monitor />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <Blocks />,
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <Tv />,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/admin/transaction",
    icon: <ShoppingBag />,
  },
  {
    key: "setting",
    label: "Setting",
    href: "/admin/setting",
    icon: <Settings />,
    subItems: [
      {
        key: "all-events",
        label: "All Events",
        href: "/admin/events",
        icon: <Calendar className="h-4 w-4" />,
      },
      {
        key: "create-event",
        label: "Create Event",
        href: "/admin/events/create",
      },
    ],
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <Grid />,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transaction",
    icon: <ShoppingBag />,
  },
  {
    key: "setting",
    label: "Setting",
    href: "/member/setting",
    icon: <Settings />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
