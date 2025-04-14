import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Link, useLocation } from "@tanstack/react-router";
import { useViewer } from "../use-viewer";
import { Button } from "@/components/shadcn/ui/button";
import { Lock, LogIn } from "lucide-react";
import { returnTo } from "@/lib/tanstack/router/utils";

interface AuthenticationRequiredDialogProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  message?: string;
  title?: string;
}

export function AuthenticationRequiredDialog({
  children,
  icon=<Lock className="mr-2 h-4 w-4" />,
  message = "You need to be signed in to perform this action.",
  title = "Authentication Required",
}: AuthenticationRequiredDialogProps) {
  const location = useLocation();
  const { viewer } = useViewer();
  if (viewer) {
    return children;
  }
  return (
    <Dialog>
      <DialogTrigger>{icon}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Button asChild>
            <Link to="/auth" search={{ returnTo: returnTo(location) }}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
          {/* <Button variant="outline">Cancel</Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
