import { Blocks, Grid, Settings, ShoppingBag, Tv, View } from "lucide-react";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: <Grid />,
  },
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: <View />,
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
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member",
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
