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
import { getInitials } from "@/utils/string";


// Profile Header Component
interface ProfileHeaderProps {
  viewer: BetterAthViewer;
}

export function ProfileHeader({ viewer }: ProfileHeaderProps) {

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
      <Avatar className="h-28 w-28 border-4 border-primary/30">
        <AvatarImage src={viewer.image || ""} alt={viewer.name} />
        <AvatarFallback className="text-2xl bg-primary/20">
          {getInitials(viewer.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">{viewer.name}</h1>
          {viewer.emailVerified && (
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-600 border-green-500/30 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          )}
          {viewer.role && (
            <Badge className="bg-primary/20 text-primary border-primary/30 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              {viewer.role}
            </Badge>
          )}
          {viewer.banned && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Banned
            </Badge>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-start text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>{viewer.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {format(new Date(viewer.createdAt), "MMM d, yyyy")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
