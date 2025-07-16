import { Facebook, Instagram } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/event",
  },
];

const BUTTON_ITEMS = [
  {
    label: "Register",
    href: "/auth/register",
    variant: "bordered",
  },
  {
    label: "Login",
    href: "/auth/login",
    variant: "solid",
  },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://facebook.com/abc",
    icon: <Facebook />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/abc",
    icon: <Instagram />,
  },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
