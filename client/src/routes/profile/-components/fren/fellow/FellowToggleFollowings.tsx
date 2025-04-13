import { Button } from "@/components/shadcn/ui/button";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { FellowFrenCard_following$data } from "./__generated__/FellowFrenCard_following.graphql";
import { Loader, User, UserPlus, UserCheck, Users } from "lucide-react";
import { useState } from "react";

interface FellowToggleFollowingsProps {
  fellow: FellowFrenCard_following$data;
}

export function FellowToggleFollowings({ fellow }: FellowToggleFollowingsProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [commitToggleFollowMutation, isTogglingFollow] = useMutation(graphql`
    mutation FellowToggleFollowingsMutation($input: FollowInput!) {
      toggleFollow(input: $input) {
        ...FellowFrenCard_following
      }
    }
  `);

  const handleToggleFollow = () => {
    if (isTogglingFollow || fellow.isMe) return;
    commitToggleFollowMutation({
      variables: {
        input: {
          userId: fellow.frenId,
        },
      },
    });
  };

  const frenshipStatus = () => {
    if (fellow.isMe) {
      return (
        <>
          <User className="h-4 w-4 mr-1" />
          <span>You</span>
        </>
      );
    }

    if (fellow.isFollowingMe && !fellow.amFollowing) {
      return (
        <>
          <UserPlus className="h-4 w-4 mr-1 fill-accent" />
          <span>Follow back</span>
        </>
      );
    }

    if (fellow.amFollowing && fellow.isFollowingMe) {
      return isHovering ? (
        <>
          <User className="h-4 w-4 mr-1" />
          <span>Unfollow</span>
        </>
      ) : (
        <>
          <Users className="h-4 w-4 mr-1" />
          <span>Mutual</span>
        </>
      );
    }

    if (fellow.amFollowing) {
      return isHovering ? (
        <>
          <User className="h-4 w-4 mr-1" />
          <span>Unfollow</span>
        </>
      ) : (
        <>
          <UserCheck className="h-4 w-4 mr-1 fill-success" />
          <span>Following</span>
        </>
      );
    }

    return (
      <>
        <UserPlus className="h-4 w-4 mr-1" />
        <span>Follow</span>
      </>
    );
  };
  if (fellow.isMe) {
    return;
  }

  return (
    <Button
      variant={fellow.isMe ? "ghost" : "outline"}
      size="sm"
      onClick={handleToggleFollow}
      disabled={isTogglingFollow}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={fellow.isMe ? "cursor-default opacity-70" : ""}>
      {frenshipStatus()}
      {isTogglingFollow && <Loader className="h-4 w-4 animate-spin mr-1" />}
    </Button>
  );
}
