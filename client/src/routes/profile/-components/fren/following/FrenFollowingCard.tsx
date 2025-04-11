import { Card } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { UserCircle } from "lucide-react";
import { graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import { FrenFollowingCard_following$key } from "./__generated__/FrenFollowingCard_following.graphql";
import { Link } from "@tanstack/react-router";

interface FrenFollowingCardProps {
  followingRef: FrenFollowingCard_following$key;
}

export function FrenFollowingCard({ followingRef }: FrenFollowingCardProps) {
  const following = useFragment(
    graphql`
      fragment FrenFollowingCard_following on Follower {
        id
        frenId
        name
        email
        image
      }
    `,
    followingRef
  );

  const [commitUnfollowMutation, isUnfollowing] = useMutation(graphql`
    mutation FrenFollowingCardUnfollowMutation($input: FollowInput!) {
      unfollow(input: $input) {
        ...FrenFollowingCard_following
      }
    }
  `);

  const handleUnfollow = () => {
    if (isUnfollowing) return;
    commitUnfollowMutation({
      variables: {
        input: {
          userId: following.frenId,
        },
      },
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <Link
          to="/profile/$frenId"
          params={{ frenId: following.frenId }}
          className="flex items-center gap-3 p-2 px-4 rounded-2xl hover:bg-primary/20"
        >
          <Avatar>
            {following.image ? (
              <AvatarImage src={following.image} alt={following.name} />
            ) : (
              <AvatarFallback>
                <UserCircle className="w-full h-full text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-semibold">{following.name}</h3>
            <p className="text-sm text-muted-foreground">{following.email}</p>
          </div>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={handleUnfollow}
          disabled={isUnfollowing}
        >
          {isUnfollowing ? "Unfollowing..." : "Unfollow"}
        </Button>
      </div>
    </Card>
  );
}
