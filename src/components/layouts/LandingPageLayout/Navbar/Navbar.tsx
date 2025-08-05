import React, { useState, useEffect } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  addToast,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import {
  Search,
  User,
  Menu,
  X,
  Calendar,
  Ticket,
  Settings,
  LogOut,
  LayoutDashboard,
  LogOutIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { NAV_ITEMS } from "../LandingPageLayout.constant";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import useNavbar from "./useNavbar";
import Link from "next/link";
import authServices from "@/services/auth.service";
import NavbarModalSearch from "./NavbarModalSearch";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useNavbar();
  const [isLoading, setIsLoading] = useState(false);
  const searchEventModal = useDisclosure();

  const isHome = router.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state for background blur
      setIsScrolled(currentScrollY > 10);

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authServices.logout();
      signOut();
    } catch (error) {
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
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 right-0 top-0 z-50"
          >
            <HeroNavbar
              isMenuOpen={isMenuOpen}
              onMenuOpenChange={setIsMenuOpen}
              className={cn(
                "transition-all duration-300",
                isScrolled
                  ? "border-b border-white/20 bg-white/80 shadow-lg backdrop-blur-md"
                  : "bg-transparent",
              )}
              maxWidth="full"
              height="4rem"
            >
              {/* Brand */}
              <NavbarContent>
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className={cn("text-gray-800 sm:hidden", {
                    // "text-black": isScrolled,
                    "text-white/90": isHome && !isScrolled,
                  })}
                  icon={
                    isMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )
                  }
                />
                <NavbarBrand>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                      <Ticket
                        className={cn("h-5 w-5 text-white", {
                          "text-white": isHome,
                        })}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-xl font-bold text-gray-800 transition-colors",
                        {
                          "text-white/90": isHome && !isScrolled,
                        },
                      )}
                    >
                      EventKu
                    </span>
                  </motion.div>
                </NavbarBrand>
              </NavbarContent>

              {/* Desktop Menu */}
              <NavbarContent className="hidden gap-8 sm:flex" justify="center">
                {NAV_ITEMS.map((item) => (
                  <NavbarItem key={item.label} className="hidden lg:flex">
                    <motion.a
                      href={item.href}
                      className={cn(
                        "relative font-medium transition-colors hover:text-blue-600",
                        isHome ? "text-white/90" : "text-gray-700",
                        {
                          "block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent":
                            router.pathname === item.href,
                          "text-gray-700":
                            isScrolled && router.pathname !== item.href,
                        },
                      )}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.label}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 origin-left bg-blue-600"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  </NavbarItem>
                ))}
              </NavbarContent>

              {/* Right Content */}
              <NavbarContent justify="end">
                {router.pathname !== "/" && (
                  <NavbarItem className="flex">
                    <Button
                      onPress={() => searchEventModal.onOpen()}
                      isIconOnly
                      variant="light"
                      className={cn(
                        "transition-colors",
                        isHome ? "text-white/90" : "text-gray-700",
                        // isScrolled
                        //   ? "text-gray-600 hover:bg-gray-100"
                        //   : "text-white/80 hover:bg-white/10",
                      )}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </NavbarItem>
                )}

                <NavbarItem>
                  {session.status !== "authenticated" && (
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          variant="light"
                          className={cn(
                            "gap-2 text-gray-800 transition-colors",
                            {
                              "text-white/90": isHome && !isScrolled,
                            },
                          )}
                          startContent={<User className="h-4 w-4" />}
                        ></Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="User menu actions">
                        <DropdownItem
                          key="login"
                          startContent={<User className="h-4 w-4" />}
                          href="/auth/login"
                          as={Link}
                        >
                          Login
                        </DropdownItem>
                        <DropdownItem
                          key="register"
                          startContent={<Calendar className="h-4 w-4" />}
                          href="/auth/register"
                        >
                          Register
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}

                  {session.status === "authenticated" && (
                    <Dropdown placement="bottom-end">
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          variant="light"
                          className={cn(
                            "gap-2 text-gray-800 transition-colors",
                            {
                              "text-white/90": isHome && !isScrolled,
                            },
                          )}
                          startContent={<User className="h-4 w-4" />}
                        ></Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="User menu actions">
                        {dataProfile?.role === "member" ? (
                          <>
                            <DropdownItem
                              key="profile"
                              startContent={<User className="h-4 w-4" />}
                              href="/member/profile"
                              as={Link}
                            >
                              Profile
                            </DropdownItem>

                            <DropdownItem
                              key="member"
                              startContent={
                                <LayoutDashboard className="h-4 w-4" />
                              }
                              href="/member/dashboard"
                              as={Link}
                            >
                              Member
                            </DropdownItem>
                          </>
                        ) : (
                          <DropdownItem
                            key={"dummy-member"}
                            className="hidden"
                          ></DropdownItem>
                        )}

                        {dataProfile?.role === "company" ? (
                          <>
                            <DropdownItem
                              key="profile"
                              startContent={<User className="h-4 w-4" />}
                              href="/company/profile"
                              as={Link}
                            >
                              Profile
                            </DropdownItem>

                            <DropdownItem
                              key="company"
                              startContent={
                                <LayoutDashboard className="h-4 w-4" />
                              }
                              href="/company/dashboard"
                              as={Link}
                            >
                              Company
                            </DropdownItem>
                          </>
                        ) : (
                          <DropdownItem
                            key={"dummy-company"}
                            className="hidden"
                          ></DropdownItem>
                        )}

                        {dataProfile?.role === "admin" ? (
                          <>
                            <DropdownItem
                              key="profile"
                              startContent={<User className="h-4 w-4" />}
                              href="/admin/profile"
                              as={Link}
                            >
                              Profile
                            </DropdownItem>
                            <DropdownItem
                              key="admin"
                              startContent={
                                <LayoutDashboard className="h-4 w-4" />
                              }
                              href="/admin/dashboard"
                              as={Link}
                            >
                              Admin
                            </DropdownItem>
                          </>
                        ) : (
                          <DropdownItem
                            key={"dummy-admin"}
                            className="hidden"
                          ></DropdownItem>
                        )}
                        {isLoading ? (
                          <DropdownItem
                            key="logout"
                            startContent={<LogOutIcon className="h-4 w-4" />}
                            onPress={handleLogout}
                          >
                            <Spinner size="sm" />
                          </DropdownItem>
                        ) : (
                          <DropdownItem
                            key="logout"
                            startContent={<LogOutIcon className="h-4 w-4" />}
                            onPress={handleLogout}
                          >
                            Logout
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  )}
                </NavbarItem>

                <NavbarItem className="hidden lg:flex">
                  <Button
                    color="primary"
                    variant={isScrolled ? "solid" : "bordered"}
                    className={cn(
                      "bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white transition-all",
                      // isScrolled
                      //   ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      //   : "border-white text-white hover:bg-white hover:text-blue-600",
                    )}
                    size="sm"
                  >
                    Buat Event
                  </Button>
                </NavbarItem>
              </NavbarContent>

              {/* Mobile Menu */}
              <NavbarMenu className="bg-white/95 backdrop-blur-md">
                <div className="flex flex-col gap-4 pt-6">
                  {NAV_ITEMS.map((item, index) => (
                    <NavbarMenuItem key={item.label}>
                      <motion.a
                        href={item.href}
                        className={cn(
                          "text-lg font-medium text-gray-700 transition-colors hover:text-blue-600",
                          {
                            "block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent":
                              router.pathname === item.href,
                          },
                        )}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </motion.a>
                    </NavbarMenuItem>
                  ))}
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex flex-col gap-3">
                      {session?.status !== "authenticated" && (
                        <Button
                          color="primary"
                          variant="flat"
                          className="justify-start"
                          startContent={<User className="h-4 w-4" />}
                        >
                          Masuk
                        </Button>
                      )}
                      <Button
                        color="primary"
                        className="justify-start bg-gradient-to-r from-blue-600 to-purple-600"
                        startContent={<Ticket className="h-4 w-4" />}
                      >
                        Buat Event
                      </Button>
                    </div>
                  </div>
                </div>
              </NavbarMenu>
            </HeroNavbar>
          </motion.div>
        )}
      </AnimatePresence>
      <NavbarModalSearch {...searchEventModal} />
    </>
  );
};

export default Navbar;
