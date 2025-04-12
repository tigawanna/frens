import { createFileRoute } from "@tanstack/react-router";
import { Shield, Home, RefreshCw, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/error/")({
  component: RouteComponent,
});

function RouteComponent() {


  return (
    <div className="w-full h-screen flex justify-center items-center bg-background p-4">
      <div className="flex flex-col items-center justify-center max-w-md w-full text-center space-y-6">
        <div className="rounded-full bg-primary/10 p-4 mb-2">
          <Lock className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
          <Link to="/auth" search={{ returnTo: "/" }} className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Link>

          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="border-t border-border w-full pt-4 mt-2">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please try a different sign-in method or contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
