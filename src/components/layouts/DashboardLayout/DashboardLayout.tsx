import PageHead from "@/components/commons/PageHead";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import {
  SIDEBAR_ADMIN,
  SIDEBAR_COMPANY,
  SIDEBAR_MEMBER,
} from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@heroui/react";
import { useIsMobile } from "@heroui/use-is-mobile";

type Props = {
  title?: string;
  children: React.ReactNode;
  type: string;
  description?: string;
};

const DashboardLayout = ({
  title,
  children,
  type = "admin",
  description,
}: Props) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  // Auto open/close sidebar based on screen size
  useEffect(() => {
    if (isMobile) {
      setOpen(false); // Close sidebar on mobile by default
    } else {
      setOpen(true); // Open sidebar on desktop by default
    }
  }, [isMobile]);

  const sidebar = useMemo(() => {
    if (type === "admin") {
      return SIDEBAR_ADMIN;
    }

    if (type === "member") {
      return SIDEBAR_MEMBER;
    }

    if (type === "company_owner") {
      return SIDEBAR_COMPANY;
    }

    return [];
  }, []);

  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar sidebarItems={sidebar as any} isOpen={open} />
        <div className="h-screen w-full overflow-y-auto px-2 pt-2 lg:px-8">
          <Navbar
            className="mb-2 flex justify-between bg-transparent px-3 pt-2 lg:pt-0"
            isBlurred={false}
            position="static"
            classNames={{ wrapper: "p-0" }}
          >
            <div>
              <h1 className="mb-2 text-3xl font-bold">{title}</h1>
              <p className="mb-4 text-small">{description}</p>
            </div>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
