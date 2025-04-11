import { Card, CardContent, CardFooter } from "@/components/shadcn/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { CheckCircle, Mail } from "lucide-react";
import { format } from "date-fns";
import { getInitials } from "@/utils/string";
import { FrenshipStatus } from "./FrenshipStatus";
import { graphql } from "relay-runtime";
import { FrenCard_fren$key } from "./__generated__/FrenCard_fren.graphql";
import { useFragment } from "react-relay";

interface FrenCardProps {
  frenRef: FrenCard_fren$key;
}

export function FrenCard({ frenRef }: FrenCardProps) {
  const fren = useFragment(FrenCardFragment, frenRef);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={fren.image || ""} alt={fren.name || ""} />
              <AvatarFallback>{getInitials(fren.name || "")}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold">{fren.name}</h3>
                {/* Keeping email verification UI if needed later */}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span>{fren.email}</span>
              </div>
              <div className="flex items-center gap-3 pt-1 text-sm">
                <span>
                  <strong>{fren.followerCount}</strong> followers
                </span>
                <span>
                  <strong>{fren.followingCount}</strong> following
                </span>
              </div>
            </div>
          </div>
          <FrenshipStatus
            frenStatus={{
              frenId: fren.frenId,
              isFollowing: fren.isFollowingMe, // They follow you
              amFollowing: fren.amFollowing, // You follow them
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Joined {format(new Date(fren.createdAt || ""), "MMM d, yyyy")}
        </p>
      </CardFooter>
    </Card>
  );
}

const FrenCardFragment = graphql`
  fragment FrenCard_fren on Fren {
    id
    frenId
    name
    email
    image
    createdAt
    followerCount
    followingCount
    amFollowing
    isFollowingMe
  }
`;
