import { useFragment, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import { Card } from "@/components/shadcn/ui/card";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import { UserCircle } from "lucide-react";
import { FellowFrenCard_following$key } from "./__generated__/FellowFrenCard_following.graphql";
import { FellowToggleFollowings } from "./FellowToggleFollowings";

interface FellowFrenCardProps {
  fellowRef: FellowFrenCard_following$key;
}

export function FellowFrenCard({ fellowRef }: FellowFrenCardProps) {
  const fellow = useFragment(FellowFrenCardFragment, fellowRef);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <Link
          to="/profile/$frenId"
          params={{ frenId: fellow.frenId }}
          className="flex items-center gap-3 p-2 px-4 rounded-2xl hover:bg-primary/20">
          <Avatar>
            {fellow.image ? (
              <AvatarImage src={fellow.image} alt={fellow.name} />
            ) : (
              <AvatarFallback>
                <UserCircle className="w-full h-full text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-semibold">{fellow.name}</h3>
            <p className="text-sm text-muted-foreground">{fellow.email}</p>
          </div>
        </Link>
        {/*  button go here */}
        <FellowToggleFollowings fellow={fellow} />
      </div>
    </Card>
  );
}

const FellowFrenCardFragment = graphql`
  fragment FellowFrenCard_following on Follower {
    id
    frenId
    name
    email
    image
    isMe
    amFollowing
    isFollowingMe
  }
`;
