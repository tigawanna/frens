import { MainDrawer } from "@/components/navigation/drawer/MainDrawer";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";
import { MainDrawerLinks } from "@/components/navigation/drawer/MainDrawerLinks";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="min-h-screen flex w-full flex-col items-center gap-1">
        <nav className="w-full flex justify-evenly gap-3">
          <Link className="btn " to="/profile/account">
            Accoutn
          </Link>
          <Link className="btn btn-sm" to="/profile/explore">
            Explore
          </Link>
        </nav>
        <Outlet />
      </div>
    </MainDrawer>
  );
}
