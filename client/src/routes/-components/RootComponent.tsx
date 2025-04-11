import Nprogress from "@/components/navigation/nprogress/Nprogress";
import { TailwindIndicator } from "@/components/navigation/tailwind-indicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

export function RootComponent() {
  const panding = useRouterState().status === "pending";
  return (
    <div className="content min-h-screen w-full">
       <Nprogress isAnimating={panding}/>
      <TailwindIndicator />
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <Toaster reverseOrder />
    </div>
  );
}
