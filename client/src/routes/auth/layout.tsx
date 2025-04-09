import { MainDrawer } from "@/components/navigation/drawer/MainDrawer";
import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainDrawer links={null} footer={<AuthLayoutDrawerFooter />}>
      <Outlet />
    </MainDrawer>
  );
}

function AuthLayoutDrawerFooter() {
  const { state, isMobile } = useSidebar();
  const notCompact = state === "expanded" || isMobile;
  return (
    <div>
      <ThemeToggle compact={!notCompact} />
    </div>
  );
}
