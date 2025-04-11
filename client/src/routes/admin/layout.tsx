import { MainDrawer } from "@/components/navigation/drawer/MainDrawer";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";
import { MainDrawerLinks } from "@/components/navigation/drawer/MainDrawerLinks";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="min-h-screen flex flex-col items-center gap-3">
        <Outlet />
      </div>
    </MainDrawer>
  );
}
