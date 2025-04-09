import { useViewer } from "@/lib/viewer/use-viewer";
import { format } from "date-fns";
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
import { Separator } from "@/components/shadcn/ui/separator";

interface ProfileComponenProps {}

export function ProfileComponen({}: ProfileComponenProps) {
  const { viewer } = useViewer();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?"
    );
  };

  if (!viewer) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <User className="h-16 w-16 text-muted-foreground/50" />
              <div>
                <h3 className="text-lg font-medium">Not Signed In</h3>
                <p className="text-sm text-muted-foreground">Please sign in to view your profile</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-4xl">
        {/* Profile header */}
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

        {/* Tabs for different profile sections */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Account Details</TabsTrigger>
            <TabsTrigger value="status">Account Status</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
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
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">User ID</dt>
                    <dd className="font-mono text-xs bg-muted p-2 rounded-md">{viewer.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                    <dd>{viewer.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                    <dd className="flex items-center gap-2">
                      {viewer.email}
                      {viewer.emailVerified ? (
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-600 border-green-500/30">
                          Verified
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
                          Not Verified
                        </Badge>
                      )}
                    </dd>
                  </div>
                  {viewer.role && (
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Role</dt>
                      <dd>{viewer.role}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Profile Image</dt>
                    <dd>
                      {viewer.image ? (
                        <div className="mt-2">
                          <img
                            src={viewer.image}
                            alt={viewer.name}
                            className="h-24 w-24 rounded-md object-cover"
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">No image set</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <span className="text-xs text-muted-foreground">
                  Created: {format(new Date(viewer.createdAt), "MMM d, yyyy")}
                </span>
                <span className="text-xs text-muted-foreground">
                  Last updated: {format(new Date(viewer.updatedAt), "MMM d, yyyy")}
                </span>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status">
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
                        <p className="text-sm">
                          Your account has been banned from using this platform.
                        </p>
                      </div>
                    </div>

                    {viewer.banReason && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">
                          Reason for Ban
                        </h4>
                        <p className="p-3 bg-muted rounded-md">{viewer.banReason}</p>
                      </div>
                    )}

                    {viewer.banExpires && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">
                          Ban Expires
                        </h4>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(viewer.banExpires), "MMMM d, yyyy 'at' h:mm a")}
                          </span>
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
                        <button className="text-xs underline mt-1">
                          Resend verification email
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground border-t pt-6">
                If you need help with your account, please contact support.
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
