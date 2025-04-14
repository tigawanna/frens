import { Card, CardContent } from "@/components/shadcn/ui/card";
import { returnTo } from "@/lib/tanstack/router/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { User } from "lucide-react";

export function NotSignedIn() {
  const location = useLocation();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <User className="h-16 w-16 text-muted-foreground/50" />
            <div>
              <h3 className="text-lg font-medium">Not Signed In</h3>
              <Link
                to="/auth"
                search={{ returnTo: returnTo(location) }}
                className="text-sm text-muted-foreground">
                Please sign in to view your profile
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
