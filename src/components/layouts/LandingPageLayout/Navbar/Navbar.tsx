import {
  addToast,
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NavbarUi,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import authServices from "@/services/auth.service";
import useNavbar from "./useNavbar";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useNavbar();

  const [isLoading, setIsLoading] = useState(false);

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
        <NavbarContent className="hidden lg:flex">
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
      <NavbarContent justify="end">
        <NavbarMenuToggle className="lg:hidden" />
        <NavbarItem className="hidden lg:relative lg:flex">
          <Input
            isClearable
            className="w-[300px]"
            placeholder="Search event"
            startContent={<Search className="h-4 w-4 text-gray-500" />}
            onClear={() => {}}
            onChange={() => {}}
          />
        </NavbarItem>
        {session?.status === "authenticated" ? (
          <NavbarItem className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                  name={dataProfile?.fullname}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={"admin"}
                  href="/admin/dashboard"
                  className={cn({
                    hidden: dataProfile?.role !== "admin",
                  })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem key={"profile"} href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key={"signout"}>
                  <Button
                    disabled={isLoading}
                    onPress={handleLogout}
                    variant="light"
                    className="flex h-full w-full justify-start p-0"
                  >
                    {isLoading ? <Spinner size="sm" color="white" /> : "Logout"}
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden lg:flex lg:gap-4">
            {BUTTON_ITEMS?.map((row, index) => {
              return (
                <NavbarItem key={`${row.label}-${index}`}>
                  <Button
                    color="danger"
                    as={Link}
                    href={row.href}
                    variant={row.variant as ButtonProps["variant"]}
                  >
                    {row.label}
                  </Button>
                </NavbarItem>
              );
            })}
          </div>
        )}

        <NavbarMenu className="gap-4">
          {NAV_ITEMS?.map((row, index) => {
            return (
              <NavbarMenuItem
                key={`${row.label}-${index}`}
                as={Link}
                href={row.href}
                className={cn("hover:danger font-medium text-default-700", {
                  "font-bold text-danger": router.pathname === row.href,
                })}
              >
                {row.label}
              </NavbarMenuItem>
            );
          })}
          {session?.status === "authenticated" ? (
            <>
              <NavbarMenuItem
                className={cn("hover:danger font-medium text-default-700", {
                  hidden: dataProfile?.role !== "admin",
                })}
              >
                <Link href={"/admin/dashboard"}>Admin</Link>
              </NavbarMenuItem>
              <NavbarMenuItem
                className={cn("hover:danger font-medium text-default-700")}
              >
                <Link href={"/member/profile"}>Profile</Link>
              </NavbarMenuItem>

              <NavbarMenuItem
                className={cn("hover:danger font-medium text-default-700")}
              >
                <Button
                  variant={"bordered"}
                  color={"danger"}
                  disabled={isLoading}
                  onPress={handleLogout}
                  className="w-full"
                >
                  {isLoading ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    <div className="text-danger">Logout</div>
                  )}
                </Button>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              {BUTTON_ITEMS?.map((row, index) => {
                return (
                  <NavbarMenuItem key={`${row.label}-${index}`}>
                    <Button
                      variant={row.variant as ButtonProps["variant"]}
                      color={"danger"}
                      as={Link}
                      href={row.href}
                      className="w-full"
                    >
                      {row.label}
                    </Button>
                  </NavbarMenuItem>
                );
              })}
            </>
          )}
        </NavbarMenu>
      </NavbarContent>
    </NavbarUi>
  );
};

export default Navbar;
