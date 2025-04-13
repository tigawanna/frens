import { ConnectionHandler, graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { UserCheck, UserPlus, UserX, Users, User, Loader } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { OtherFrenCard_fren$key } from "./__generated__/OtherFrenCard_fren.graphql";
import { OtherFrenCardFollowMutation } from "./__generated__/OtherFrenCardFollowMutation.graphql";

interface OtherFrenCardProps {
  frenRef: OtherFrenCard_fren$key;
}

export function OtherFrenCard({ frenRef }: OtherFrenCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  const fren = useFragment(OtherFrenCardFragment, frenRef);

  const [toggleFollowMutation, isTogglingFollow] = useMutation<OtherFrenCardFollowMutation>(graphql`
    mutation OtherFrenCardFollowMutation($input: FollowInput!) {
      toggleFollowFren(input: $input) {
        ...OtherFrenCard_fren
      }
    }
  `);

  const handleToggleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTogglingFollow) return;
 const willFollow = !fren.amFollowing;
//  const newFollowerCount = fren.followerCount + (willFollow ? 1 : -1);
    toggleFollowMutation({
      variables: {
        input: {
          userId: fren.frenId,
        },
      },
    });
  };

  // Skip rendering if this is the current user
  if (fren.isMe) {
    return null;
  }

  return (
    <Link to="/profile/$frenId" params={{ frenId: fren.frenId }} className="block w-full">
      <Card className="w-full h-full hover:bg-accent/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              {fren.image ? (
                <AvatarImage src={fren.image} alt={fren.name} />
              ) : (
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{fren.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{fren.email}</p>

              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm">
                  <span className="font-medium">{fren.followerCount || 0}</span>{" "}
                  <span className="text-muted-foreground">followers</span>
                </span>

                <span className="text-sm">
                  <span className="font-medium">{fren.followingCount || 0}</span>{" "}
                  <span className="text-muted-foreground">following</span>
                </span>
              </div>
            </div>

            {/* Follow/Unfollow Button */}
            <div onClick={(e) => e.stopPropagation()}>
              {/* Not following, they're not following me */}
              {!fren.amFollowing && !fren.isFollowingMe && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleToggleFollow}
                  disabled={isTogglingFollow}>
                  {isTogglingFollow ? (
                    <Loader className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <UserPlus className="h-4 w-4 mr-1" />
                  )}
                  Follow
                </Button>
              )}

              {/* Not following, but they follow me */}
              {!fren.amFollowing && fren.isFollowingMe && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleToggleFollow}
                  disabled={isTogglingFollow}>
                  {isTogglingFollow ? (
                    <Loader className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <UserCheck className="h-4 w-4 mr-1" />
                  )}
                  Follow Back
                </Button>
              )}

              {/* I'm following, they're not following me */}
              {fren.amFollowing && !fren.isFollowingMe && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleToggleFollow}
                  disabled={isTogglingFollow}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}>
                  {isTogglingFollow ? (
                    <Loader className="h-4 w-4 animate-spin mr-1" />
                  ) : isHovering ? (
                    <UserX className="h-4 w-4 mr-1" />
                  ) : (
                    <UserCheck className="h-4 w-4 mr-1" />
                  )}
                  {isHovering ? "Unfollow" : "Following"}
                </Button>
              )}

              {/* Mutual following */}
              {fren.amFollowing && fren.isFollowingMe && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleToggleFollow}
                  disabled={isTogglingFollow}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}>
                  {isTogglingFollow ? (
                    <Loader className="h-4 w-4 animate-spin mr-1" />
                  ) : isHovering ? (
                    <UserX className="h-4 w-4 mr-1" />
                  ) : (
                    <Users className="h-4 w-4 mr-1" />
                  )}
                  {isHovering ? "Unfollow" : "Mutual"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

const OtherFrenCardFragment = graphql`
  fragment OtherFrenCard_fren on Fren {
    frenId
    name
    email
    image
    isMe
    amFollowing
    isFollowingMe
    followerCount
    followingCount
  }
`;
