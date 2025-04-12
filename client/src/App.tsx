import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { queryClient, router } from "./main";
import { themeChange } from "theme-change";
import { useViewer } from "./lib/viewer/use-viewer";
export function App() {
  useEffect(() => {
    document.documentElement.dataset.style = "vertical";
    document.documentElement.dataset.theme = "dark";
    themeChange(false);
  }, []);
  const viewer = useViewer()
  return (
    <RouterProvider
      router={router}
      defaultPreload="intent"
      context={{
        queryClient,
        viewer: viewer.viewer,
        session: viewer.session,
      }}
    />
  );
}
