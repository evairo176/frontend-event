import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface sidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}
type Props = {
  sidebarItems: sidebarItem[];
  isOpen: boolean;
};

const DashboardLayoutSidebar = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarItems, isOpen } = props;
  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all lg:relative lg:translate-x-0",
        {
          "translate-x-0": isOpen,
        },
      )}
    >
      <div className="">
        <div className="flex justify-center">
          <Image
            onClick={() => router.push("/")}
            src={"/images/general/logo.svg"}
            alt="logo"
            width={180}
            height={60}
            className="mb-6 w-32"
          />
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="dashboard menu"
        >
          {(item) => {
            return (
              <ListboxItem
                key={item.key}
                className={cn("my-1 h-12 text-2xl", {
                  "bg-danger-500 text-white": pathname === item.href,
                })}
                startContent={item.icon}
                textValue={item.label}
                aria-labelledby={item.label}
                aria-describedby={item.label}
              >
                <p className="text-small">{item.label}</p>
              </ListboxItem>
            );
          }}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
        <Button
          onClick={signOut}
          fullWidth
          variant="light"
          color="danger"
          className="flex justify-start rounded-lg px-2 py-1.5"
          size="lg"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
