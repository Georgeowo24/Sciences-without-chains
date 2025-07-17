import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@heroui/dropdown";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import Logo from "./icons";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="border-b border-gray-200 shadow-md">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">

        {/* Logo */}
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo height={30} className="pr-2"/>
                      
            
            <p className="font-bold text-inherit">Science Without Chains</p>
          </Link>
        </NavbarBrand>
        
        {/* Navigation Items */}
        <div className="hidden lg:flex gap-5 justify-start ml-10">
          {siteConfig.navItems.map((item) => {
            // If the item is "Categories", render a dropdown
            if (item.label === "Categories") {
              return (
                <Dropdown key="categories">
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className="bg-transparent p-0 text-foreground hover:text-primary"
                        radius="sm"
                        variant="light"
                      >
                        Categories
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label="Category menu"
                    itemClasses={{
                      base: "py-1 px-3 text-sm",
                    }}
                  >
                    <DropdownItem key="all" href="/categories">
                      All
                    </DropdownItem>
                    <DropdownItem key="science" href="/categories/science">
                      Science
                    </DropdownItem>
                    <DropdownItem key="technology" href="/categories/technology">
                      Technology
                    </DropdownItem>
                    <DropdownItem key="biology" href="/categories/biology">
                      Biology
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              );
            }

            // For other items, render a normal button
            return (
              <NavbarItem key={item.href}>
                <Button
                  as={Link}
                  href={item.href}
                  variant="light"
                  radius="sm"
                  className="bg-transparent p-0 text-foreground hover:text-primary"
                >
                  {item.label}
                </Button>
              </NavbarItem>
            );
          })}


        </div>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/3 sm:basis-full" justify="center">
        {/* Dark Mode */}
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        {/* Log In */}
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            href="/login"
            variant="light"
            radius="sm"
            className="bg-transparent p-0 text-foreground hover:text-primary"
          >
            Log In
          </Button>
        </NavbarItem>

        {/* Sign Up */}
        <NavbarItem className="hidden md:flex">
          <Button color="primary" radius="md" variant="shadow">
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 4
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
