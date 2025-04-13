import { authClient } from "@/lib/better-auth/auth-client";
import { BetterAthViewer } from "@/lib/viewer/use-viewer";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { FileWarningIcon, Key } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { CreateApiKeyButton } from "./CreateApikey";
import { DeleteKey } from "./DeleteAPIKey";

interface AccountApikeysProps {
  viewer: BetterAthViewer;
}

export function AccountApikeys({ viewer }: AccountApikeysProps) {
  const query = useSuspenseQuery({
    queryKey: ["apikeys"],
    queryFn: async () => {
      const result = await authClient.apiKey.list();
      return result;
    },
  });

  const apiKeys = query.data.data;
  const error = query.data.error;


  if (!apiKeys || apiKeys.length === 0 || error) {
    return (
      <div className="w-full min-h-[60vh] h-full flex items-center justify-center">
        <Card className="w-full max-w-md border-dashed">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center gap-4">
            <Key className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">No API Keys Found</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Create your first API key to integrate with our services
              </p>
            </div>
            {/* <Button className="mt-2 bg-primary/70 text-primary-content">Create API Key</Button> */}
            <CreateApiKeyButton viewer={viewer} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col items-end gap-4">
        <CreateApiKeyButton viewer={viewer} />
      </div>

      {apiKeys.map((apiKey) => (
        <Card key={apiKey.id} className="w-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {apiKey.name || "Unnamed API Key"}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant={apiKey.enabled ? "default" : "destructive"}>
                  {apiKey.enabled ? "Active" : "Disabled"}
                </Badge>
                {apiKey.expiresAt && (
                  <Badge variant="outline">
                    Expires: {formatDistanceToNow(new Date(apiKey.expiresAt), { addSuffix: true })}
                  </Badge>
                )}
              </div>
            </div>
            <CardDescription className="flex flex-col  mt-1">
              Key ID:{apiKey.id}
              <span className="text-sm italic text-warning-content/60 flex gap-2 items-center">
                <FileWarningIcon className="size-4" /> This isn't the actual key , if you lost it
                consider deleting this one and cratinga anew one
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p>{formatDistanceToNow(new Date(apiKey.createdAt), { addSuffix: true })}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Used</p>
                <p>
                  {apiKey.lastRequest
                    ? formatDistanceToNow(new Date(apiKey.lastRequest), { addSuffix: true })
                    : "Never"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Requests</p>
                <p>{apiKey.requestCount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Remaining</p>
                <p>{apiKey.remaining !== null ? apiKey.remaining.toLocaleString() : "Unlimited"}</p>
              </div>
              {apiKey.rateLimitEnabled && (
                <div className="col-span-2">
                  <p className="text-muted-foreground">Rate Limit</p>
                  <p>
                    {apiKey.rateLimitMax} requests per {apiKey.rateLimitTimeWindow}s
                  </p>
                </div>
              )}
              {apiKey.permissions && (
                <div className="col-span-2">
                  <p className="text-muted-foreground">Permissions</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {apiKey.permissions.split(",").map((permission, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {permission.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <button className="btn btn-sm">Edit</button>
            <DeleteKey keyId={apiKey.id} keyName={apiKey.name} userId={viewer.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
