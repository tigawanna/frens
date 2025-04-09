import { MainDrawer } from "@/components/navigation/drawer/MainDrawer";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";
import { MainDrawerLinks } from "@/components/navigation/drawer/MainDrawerLinks";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileComponen } from "./-components/ProfileComponen";
import { authGuard } from "@/lib/viewer/auth0guard";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
  beforeLoad(ctx) {
    authGuard(ctx);
  },
});

function RouteComponent() {
  return (
    <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="min-h-screen flex flex-col items-center gap-3">
        <div className="min-h-[70vh] w-full flex flex-col items-center gap-3 justify-center">
          <ProfileComponen />
        </div>
      </div>
    </MainDrawer>
  );
}
