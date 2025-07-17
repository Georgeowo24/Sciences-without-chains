export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Categories",
      href: "/docs",
    },
    {
      label: "About Us",
      href: "/pricing",
    },
    {
      label: "Help",
      href: "/blog",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help",
      href: "/help",
    },
    {
      label: "Log In",
      href: "/LogIn",
    },
    {
      label: "Sign Up",
      href: "/SignUp",
    },
    {
      label: "Log Out",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
