import { Routes, routes } from "@/components/navigation/routes";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { cn } from "@/components/shadcn/lib/utils";

interface MainDrawerLinksProps {}

export function MainDrawerLinks({}: MainDrawerLinksProps) {
  const { state, isMobile } = useSidebar();
  const { pathname } = useLocation();
  return (
    <div className="h-full flex flex-col items-center ">
      <div className="flex h-full p-1 w-full flex-col items-center gap-5 px-3">
        {routes.map((route) => (
          <TooltipProvider key={route.name}>
            <Tooltip defaultOpen={false} delayDuration={10} disableHoverableContent>
              <TooltipTrigger asChild className={`flex w-full gap-3 rounded-sm `}>
                <span className="flex flex-col">
                  <Link
                    key={route.name}
                    to={route.href}
                    className={` w-full  hover:text-primary  gap-3 
                    flex items-center justify-between  bg-base-300 hover:bg-base-300
                     ${pathname === route.href ? "text-primary bg-primary/30 rounded-lg" : "text-muted-foreground"}
                    `}>
                    {route.icon}
                    {(state === "expanded" || isMobile) && (
                      <div className="flex w-full p-2">{route.name}</div>
                    )}
                  </Link>
                  {route.children && (
                    <SubLinks parentRoute={route.href} subroutes={route.children} />
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent side="right">{route.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}

interface SubRoutesProps {
  parentRoute: string;
  subroutes: Routes[];
}

function SubLinks({ parentRoute, subroutes }: SubRoutesProps) {
  const { state, isMobile } = useSidebar();
  const { pathname } = useLocation();

  return (
    <div className="pl-6 w-full  border-l-2 border-primary/20 ml-2 mr-1 my-1 space-y-1">
      {subroutes.map((route) => {
        const isActive = pathname === route.href;

        return (
          <TooltipProvider key={route.name}>
            <Tooltip defaultOpen={false} delayDuration={10} disableHoverableContent>
              <TooltipTrigger
                asChild
                className={cn("flex w-full items-center rounded-md py-1.5 pr-2 transition-colors")}>
                <span
                  className={`flex flex-col w-full pr-2
                      ${isActive ? "bg-primary/20 text-primary" : "hover:bg-muted hover:text-primary"}
                  `}>
                  <Link key={route.name} to={route.href} className="flex items-center w-full">
                    <span className="ml-1 mr-2 text-current">{route.icon}</span>
                    {(state === "expanded" || isMobile) && (
                      <span className="text-sm font-medium">{route.name}</span>
                    )}
                  </Link>
                  {route.children && (
                    <SubLinks parentRoute={route.href} subroutes={route.children} />
                  )}
                </span>
              </TooltipTrigger>

              {/* Only show tooltip when sidebar is collapsed */}
              {state !== "expanded" && !isMobile && (
                <TooltipContent side="right">{route.name}</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
