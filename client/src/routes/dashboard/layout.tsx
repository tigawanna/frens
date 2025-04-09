import { fetchCurrentViewer } from "@/lib/viewer/use-viewer";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "./-components/dashoboard-sidebar/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});
