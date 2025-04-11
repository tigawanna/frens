import { MainDrawer } from "@/components/navigation/drawer/MainDrawer";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";
import { MainDrawerLinks } from "@/components/navigation/drawer/MainDrawerLinks";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileComponen } from "./-components/account/ProfileComponen";
import { authGuard } from "@/lib/viewer/auth0guard";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
  beforeLoad(ctx) {
    authGuard(ctx);
  },
});

function RouteComponent() {
  return (
      <div className="min-h-screen w-full flex flex-col items-center gap-3">
        <h1>profile</h1>
      </div>
  );
}
