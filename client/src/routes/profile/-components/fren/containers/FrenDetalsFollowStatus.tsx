import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import {
  FrenDetalsFollowStatusMutation,
} from "./__generated__/FrenDetalsFollowStatusMutation.graphql";
import { Loader, UserCheck, UserPlus, UserX, Users } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";

interface FrenDetalsFollowStatusProps {
  fren: {
    frenId: string;
    isFollowingMe: boolean | null | undefined;
    amFollowing: boolean | null | undefined;
    isMe: boolean | null | undefined;
  };
}

export function FrenDetalsFollowStatus({ fren }: FrenDetalsFollowStatusProps) {
  const { amFollowing, frenId, isFollowingMe, isMe } = fren;
  const [isHovering, setIsHovering] = useState(false);

  // Use the toggleFollow mutation which handles both follow and unfollow
  const [toggleFollowMutation, isTogglingFollow] = useMutation<FrenDetalsFollowStatusMutation>(
    graphql`
      mutation FrenDetalsFollowStatusMutation($input: FollowInput!) {
        toggleFollowFren(input: $input) {
          ...FrenBasicDetails_fren
        }
      }
    `
  );

  const handleToggleFollow = () => {
    if (isTogglingFollow) return;

    toggleFollowMutation({
      variables: {
        input: {
          userId: frenId,
        },
      },
    });
  };

  // If this is the current user's profile, return nothing
  if (isMe) {
    return null;
  }

  // Render the appropriate button based on the relationship status
  return (
    <div className="flex items-center gap-2">


      <div className="ml-2">
        {/* Cases for different follow relationships */}
        {!amFollowing && !isFollowingMe && (
          <Button
            variant="default"
            size="sm"
            disabled={isTogglingFollow}
            onClick={handleToggleFollow}
            className="min-w-[100px]">
            {isTogglingFollow ? (
              <Loader className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <UserPlus className="h-4 w-4 mr-1" />
            )}
            Follow
          </Button>
        )}

        {!amFollowing && isFollowingMe && (
          <Button
            variant="secondary"
            size="sm"
            disabled={isTogglingFollow}
            onClick={handleToggleFollow}
            className="min-w-[100px]">
            {isTogglingFollow ? (
              <Loader className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <UserCheck className="h-4 w-4 mr-1" />
            )}
            Follow Back
          </Button>
        )}

        {amFollowing && !isFollowingMe && (
          <Button
            variant="outline"
            size="sm"
            disabled={isTogglingFollow}
            onClick={handleToggleFollow}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="min-w-[100px]">
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

        {amFollowing && isFollowingMe && (
          <Button
            variant="outline"
            size="sm"
            disabled={isTogglingFollow}
            onClick={handleToggleFollow}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="min-w-[100px]">
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
  );
}
