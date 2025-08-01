import {
  BanknoteArrowDown,
  Blocks,
  Calendar,
  Columns3Cog,
  Grid,
  LayoutDashboard,
  Newspaper,
  Settings,
  ShieldCheck,
  ShieldUser,
  ShoppingBag,
  Tv,
  UserLock,
} from "lucide-react";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: <Calendar />,
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
    icon: <BanknoteArrowDown />,
  },
  {
    key: "blog",
    label: "Blog",
    href: "/admin/blog",
    icon: <Newspaper />,
    subItems: [
      {
        key: "all-blogs",
        label: "All Blogs",
        href: "/admin/blog",
      },
      {
        key: "category-blog",
        label: "Category",
        href: "/admin/blog/category",
      },
    ],
  },
  {
    key: "session",
    label: "Session",
    href: "/admin/session",
    icon: <Columns3Cog />,
    subItems: [
      {
        key: "me-session",
        label: "Me",
        href: "/admin/session/me",
        icon: <UserLock className="h-4 w-4" />,
      },
      {
        key: "all-user-session",
        label: "all user",
        href: "/admin/session/all-user",
        icon: <ShieldUser className="h-4 w-4" />,
      },
    ],
  },
  {
    key: "setting",
    label: "Setting",
    href: "/admin/setting",
    icon: <Settings />,
    subItems: [
      {
        key: "mfa",
        label: "MFA",
        href: "/admin/setting/mfa",
        icon: <ShieldCheck className="h-4 w-4" />,
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
    subItems: [
      {
        key: "mfa",
        label: "MFA",
        href: "/member/setting/mfa",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
    ],
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
