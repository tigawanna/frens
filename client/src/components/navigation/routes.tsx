import { ValidRoutes } from "@/lib/tanstack/router/router-types";
import { Droplet, Home, LayoutDashboard, NotepadText, SearchSlash, ShieldCheck, Store, User, Users, Wallet, Zap } from "lucide-react";
import React, { JSX } from "react";

export const dashboard_routes = [
  { name: "repositories", href: "/dashboard/repositories", icon: <Store /> },
  { name: "gists", href: "/dashboard/gists", icon: <Store /> },
];



type Routes = {
  name: string;
  href: ValidRoutes;
  icon: React.ReactNode;
  children?: {
    name: string;
    href: ValidRoutes;
    icon: JSX.Element;
  }[];
};
export const routes:Readonly<Routes>[] = [
  {
    name: "Home",
    href: "/",
    icon: <Home />,
    children: undefined,
  },
  {
    name: "About",
    href: "/about",
    icon: <SearchSlash />,
    children: undefined,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User />,
    children: undefined,
  },
] as const;


