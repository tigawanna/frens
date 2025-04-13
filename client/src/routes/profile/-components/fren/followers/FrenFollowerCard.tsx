import { Card } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { UserCircle } from "lucide-react";
import { ConnectionHandler, graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import { FrenFollowerCard_follower$key } from "./__generated__/FrenFollowerCard_follower.graphql";
import { Link } from "@tanstack/react-router";

interface FrenFollowerCardProps {
  followerRef: FrenFollowerCard_follower$key;
}

export function FrenFollowerCard({ followerRef }: FrenFollowerCardProps) {
  const follower = useFragment(
    graphql`
      fragment FrenFollowerCard_follower on Follower {
        id
        frenId
        name
        email
        image
      }
    `,
    followerRef
  );

  const [commitFollowMutation, isFollowing] = useMutation(graphql`
    mutation FrenFollowerCardFollowMutation($input: FollowInput!) {
      toggleFollow(input: $input) {
        ...FrenFollowerCard_follower
      }
    }
  `);

  const handleFollow = () => {
    if (isFollowing) return;
    commitFollowMutation({
      variables: {
        input: {
          userId: follower.frenId,
        },
      },
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <Link
          to="/profile/$frenId"
          params={{ frenId: follower.frenId }}
          className="flex items-center gap-3 p-2 px-4 rounded-2xl hover:bg-primary/20">
          <Avatar>
            {follower.image ? (
              <AvatarImage src={follower.image} alt={follower.name} />
            ) : (
              <AvatarFallback>
                <UserCircle className="w-full h-full text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-semibold">{follower.name}</h3>
            <p className="text-sm text-muted-foreground">{follower.email}</p>
          </div>
        </Link>

        <Button variant="outline" size="sm" onClick={handleFollow} disabled={isFollowing}>
          {isFollowing ? "Following..." : "Follow Back"}
        </Button>
      </div>
    </Card>
  );
}
