import { Badge } from "@/components/shadcn/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { BetterAthViewer } from "@/lib/viewer/use-viewer";
import { format } from "date-fns";



// Account Details Tab Component
interface AccountDetailsTabProps {
  viewer: BetterAthViewer;
}

export function AccountDetailsTab({ viewer }: AccountDetailsTabProps) {
  return (
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
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
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
  );
}

