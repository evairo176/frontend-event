import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NavbarUi,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NAV_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <NavbarUi
      maxWidth="full"
      className="max-w-screen-3xl 3xl:container"
      isBordered
      isBlurred
      shouldHideOnScroll
    >
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href={"/"}>
          <Image
            src={"/images/general/logo.svg"}
            alt="logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent>
          {NAV_ITEMS?.map((row, index) => {
            return (
              <NavbarItem
                key={`${row.label}-${index}`}
                as={Link}
                href={row.href}
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    "font-bold text-danger-500": router.pathname === row.href,
                  },
                )}
              >
                {row.label}
              </NavbarItem>
            );
          })}
        </NavbarContent>
      </div>
    </NavbarUi>
  );
};

export default Navbar;
