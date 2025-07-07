import PageHead from "@/components/commons/PageHead";
import React, { useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

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
  const [open, setOpen] = useState(true);
  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
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
