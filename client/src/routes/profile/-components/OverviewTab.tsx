import { Badge } from "@/components/shadcn/ui/badge";
import {
  CalendarIcon,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Mail,
  User,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";

import { BetterAthViewer } from "@/lib/viewer/use-viewer";
import { Separator } from "@/components/shadcn/ui/separator";
import { format } from "date-fns";


// Overview Tab Component
interface OverviewTabProps {
  viewer: BetterAthViewer;
}

export function OverviewTab({ viewer }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Name</dt>
              <dd>{viewer.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Email</dt>
              <dd className="flex items-center gap-2">
                {viewer.email}
                {viewer.emailVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
              </dd>
            </div>
            {viewer.role && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Role</dt>
                <dd>{viewer.role}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Timestamps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Created</dt>
              <dd>{format(new Date(viewer.createdAt), "MMMM d, yyyy 'at' h:mm a")}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
              <dd>{format(new Date(viewer.updatedAt), "MMMM d, yyyy 'at' h:mm a")}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
