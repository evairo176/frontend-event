import authServices from "@/services/auth.service";
import { cn } from "@/utils/cn";
import { addToast, Button, Spinner, Avatar, Divider } from "@heroui/react";
import {
  LogOut,
  ChevronDown,
  Settings,
  Ticket,
  Bell,
  HelpCircle,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { JSX, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@heroui/use-is-mobile";
import useProfile from "@/components/views/Member/Profile/useProfile";

interface SidebarSubItem {
  key: string;
  label: string;
  href: string;
  icon?: JSX.Element;
}

interface SidebarItem {
  key: string;
  label: string;
  href?: string;
  icon: JSX.Element;
  subItems?: SidebarSubItem[];
  badge?: string | number;
}

type Props = {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
};

const DashboardLayoutSidebar = (props: Props) => {
  const { dataProfile } = useProfile();
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarItems, isOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const isMobile = useIsMobile();

  // Determine if sidebar should be visible
  // On desktop: always visible (ignore isOpen state)
  // On mobile: follow isOpen state
  const shouldShowSidebar = !isMobile || isOpen;

  // Auto-expand menu items that contain active submenu on mount and pathname change
  useEffect(() => {
    const itemsToExpand: string[] = [];

    sidebarItems.forEach((item) => {
      if (item.subItems) {
        const hasActiveSubItem = item.subItems.some(
          (subItem) => pathname === subItem.href,
        );
        if (hasActiveSubItem) {
          itemsToExpand.push(item.key);
        }
      }
    });

    if (itemsToExpand.length > 0) {
      setExpandedItems((prev) => {
        const newExpanded = [...new Set([...prev, ...itemsToExpand])];
        return newExpanded;
      });
    }
  }, [pathname, sidebarItems]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authServices.logout();
      signOut();
    } catch (error) {
      console.log(error);
      addToast({
        title: "Failed",
        description: "Gagal logout",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemKey)
        ? prev.filter((key) => key !== itemKey)
        : [...prev, itemKey],
    );
  };

  const isItemActive = (item: SidebarItem) => {
    if (item.href && pathname === item.href) return true;
    if (item.subItems) {
      return item.subItems.some((subItem) => pathname === subItem.href);
    }
    return false;
  };

  const isSubItemActive = (href: string) => pathname === href;

  const handleItemClick = (item: SidebarItem) => {
    if (item.subItems && item.subItems.length > 0) {
      toggleExpanded(item.key);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <motion.div
      initial={{ x: isMobile ? -300 : 0 }}
      animate={{
        x: shouldShowSidebar ? 0 : -300,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[280px] flex-col border-r border-gray-200 bg-gradient-to-b from-slate-50 to-white shadow-xl",
        // Desktop: always relative positioning, no transform
        "lg:relative lg:!translate-x-0 lg:!transform-none",
        // Mobile: fixed positioning with transform
        "lg:shadow-none",
      )}
      style={{
        // Override framer-motion transform on desktop
        transform: !isMobile ? "translateX(0px)" : undefined,
      }}
    >
      {/* Header */}
      <div className="border-b border-gray-100 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex cursor-pointer items-center gap-3"
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
            <Ticket className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">EventKu</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </motion.div>
      </div>

      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-4 mt-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-4"
      >
        <div className="flex items-center gap-3">
          <Avatar
            name={dataProfile?.profilePicture as string}
            src={
              ["user.jpg", "nana.jpg"].includes(
                dataProfile?.profilePicture as string,
              )
                ? "/images/user/user.png"
                : (dataProfile?.profilePicture as string)
            }
            size="md"
            alt={dataProfile?.profilePicture as string}
            className="cursor-pointer ring-2 ring-blue-200"
            showFallback
            onClick={() => router.push("/member/profile")}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-800">
              {dataProfile?.fullname}
            </p>
            <p className="truncate text-xs text-gray-500">
              {" "}
              {dataProfile?.email}
            </p>
          </div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-green-400"></div>
        </div>
      </motion.div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-4">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Main Menu Item */}
              <motion.div
                className={cn(
                  "group flex cursor-pointer items-center justify-between rounded-xl p-3 transition-all duration-200",
                  isItemActive(item)
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100",
                )}
                onClick={() => handleItemClick(item)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-lg p-2 transition-colors",
                      isItemActive(item)
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-gray-200",
                    )}
                  >
                    <div
                      className={cn(
                        "h-5 w-5",
                        isItemActive(item) ? "text-white" : "text-gray-600",
                      )}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </div>

                {item.subItems && item.subItems.length > 0 && (
                  <motion.div
                    animate={{
                      rotate: expandedItems.includes(item.key) ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isItemActive(item) ? "text-white" : "text-gray-400",
                      )}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Submenu Items */}
              <AnimatePresence>
                {item.subItems && expandedItems.includes(item.key) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-2 space-y-1 overflow-hidden"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <motion.div
                        key={subItem.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg p-2 pl-4 transition-all duration-200",
                          isSubItemActive(subItem.href)
                            ? "border-l-2 border-blue-500 bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50",
                        )}
                        onClick={() => router.push(subItem.href)}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                        {subItem.icon && (
                          <div className="h-4 w-4">{subItem.icon}</div>
                        )}
                        <span className="text-sm font-medium">
                          {subItem.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </nav>
      </div>

      <Divider className="w-full" />

      {/* Footer Actions */}
      <div className="space-y-3 p-4">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-2"
        >
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            className="bg-gray-100 hover:bg-gray-200"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            className="bg-gray-100 hover:bg-gray-200"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            className="bg-gray-100 hover:bg-gray-200"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            disabled={isLoading}
            onPress={handleLogout}
            fullWidth
            variant="flat"
            color="danger"
            className="bg-red-50 font-medium text-red-600 hover:bg-red-100"
            startContent={
              isLoading ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <LogOut className="h-4 w-4" />
              )
            }
          >
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardLayoutSidebar;
