import {
  BanknoteArrowDown,
  Blocks,
  Calendar,
  Columns3Cog,
  Grid,
  LayoutDashboard,
  Newspaper,
  ScanBarcode,
  Settings,
  ShieldCheck,
  ShieldUser,
  ShoppingBag,
  Tv,
  UserLock,
  Users2,
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
    key: "user",
    label: "User",
    href: "/admin/user",
    icon: <Users2 />,
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

const SIDEBAR_COMPANY = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/company/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    key: "event",
    label: "Event",
    href: "/company/event",
    icon: <Calendar />,
  },

  {
    key: "transaction",
    label: "Transaction",
    href: "/company/transaction",
    icon: <BanknoteArrowDown />,
  },
  {
    key: "user",
    label: "User",
    href: "/company/user",
    icon: <Users2 />,
  },
  {
    key: "session",
    label: "Session",
    href: "/company/session",
    icon: <Columns3Cog />,
    subItems: [
      {
        key: "me-session",
        label: "Me",
        href: "/company/session/me",
        icon: <UserLock className="h-4 w-4" />,
      },
      {
        key: "all-user-session",
        label: "all user",
        href: "/company/session/all-user",
        icon: <ShieldUser className="h-4 w-4" />,
      },
    ],
  },
  {
    key: "setting",
    label: "Setting",
    href: "/company/setting",
    icon: <Settings />,
    subItems: [
      {
        key: "mfa",
        label: "MFA",
        href: "/company/setting/mfa",
        icon: <ShieldCheck className="h-4 w-4" />,
      },
    ],
  },
];

const SIDEBAR_COMPANY_SCANNER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/scanner/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    key: "capture-scan",
    label: "Capture Scan",
    href: "/scanner/capture-scan",
    icon: <ScanBarcode />,
  },
  {
    key: "session",
    label: "Session",
    href: "/scanner/session",
    icon: <Columns3Cog />,
    subItems: [
      {
        key: "me-session",
        label: "Me",
        href: "/scanner/session/me",
        icon: <UserLock className="h-4 w-4" />,
      },
    ],
  },
  {
    key: "setting",
    label: "Setting",
    href: "/scanner/setting",
    icon: <Settings />,
    subItems: [
      {
        key: "mfa",
        label: "MFA",
        href: "/scanner/setting/mfa",
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
    key: "session",
    label: "Session",
    href: "/member/session",
    icon: <Columns3Cog />,
    subItems: [
      {
        key: "me-session",
        label: "Me",
        href: "/member/session/me",
        icon: <UserLock className="h-4 w-4" />,
      },
    ],
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

export {
  SIDEBAR_ADMIN,
  SIDEBAR_MEMBER,
  SIDEBAR_COMPANY,
  SIDEBAR_COMPANY_SCANNER,
};
