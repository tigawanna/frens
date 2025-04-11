import { MainNavbar } from "@/components/navigation/navbar/MainNavbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MainDrawer } from "../components/navigation/drawer/MainDrawer";
import { MainDrawerLinks } from "../components/navigation/drawer/MainDrawerLinks";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";
import { BulkusresCreate } from "./admin/-components/BulkusresCreate";
import MainFeedWrapper from "./-components/feed/MainFeedContainer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="min-h-screen flex flex-col items-center gap-3">
        <MainFeedWrapper />
      </div>
    </MainDrawer>
  );
}
