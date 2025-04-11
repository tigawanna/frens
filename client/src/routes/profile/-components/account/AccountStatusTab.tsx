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

// Account Status Tab Component
interface AccountStatusTabProps {
  viewer: BetterAthViewer;
}

export function AccountStatusTab({ viewer }: AccountStatusTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Account Status
          {viewer.banned ? (
            <Badge variant="destructive" className="ml-2">
              Banned
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-600 border-green-500/30 ml-2">
              Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {viewer.banned ? (
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-destructive/10 text-destructive rounded-md">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <div>
                <h4 className="font-medium">Account Banned</h4>
                <p className="text-sm">Your account has been banned from using this platform.</p>
              </div>
            </div>

            {viewer.banReason && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Reason for Ban</h4>
                <p className="p-3 bg-muted rounded-md">{viewer.banReason}</p>
              </div>
            )}

            {viewer.banExpires && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Ban Expires</h4>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(viewer.banExpires), "MMMM d, yyyy 'at' h:mm a")}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center p-4 bg-green-500/10 text-green-600 rounded-md">
            <CheckCircle className="h-5 w-5 mr-2" />
            <div>
              <h4 className="font-medium">Account in Good Standing</h4>
              <p className="text-sm">Your account is active and in good standing.</p>
            </div>
          </div>
        )}

        <Separator className="my-6" />

        <div className="space-y-4">
          <h4 className="font-medium">Email Verification</h4>
          {viewer.emailVerified ? (
            <div className="flex items-center p-4 bg-green-500/10 text-green-600 rounded-md">
              <CheckCircle className="h-5 w-5 mr-2" />
              <div>
                <p className="text-sm">Your email address has been verified.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center p-4 bg-yellow-500/10 text-yellow-600 rounded-md">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <div>
                <p className="text-sm">Your email address has not been verified.</p>
                <button className="text-xs underline mt-1">Resend verification email</button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-6">
        If you need help with your account, please contact support.
      </CardFooter>
    </Card>
  );
}
