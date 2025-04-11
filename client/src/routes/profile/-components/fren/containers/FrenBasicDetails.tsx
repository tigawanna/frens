import { Card } from "@/components/shadcn/ui/card";
import { UserCircle } from "lucide-react";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import { ClipboardButton } from "@/components/wrappers/ClipboardButton";
import { FrenBasicDetails_fren$key } from "./__generated__/FrenBasicDetails_fren.graphql";
import { FrenDetalsFollowStatus } from "./FrenDetalsFollowStatus";


interface FrenBasicDetailsProps {
  queryRef?: FrenBasicDetails_fren$key | null;
}

export function FrenBasicDetails({ queryRef }: FrenBasicDetailsProps) {
  const data = useFragment<FrenBasicDetails_fren$key>(FrenBasicDetailsFragment, queryRef);

  const me = data
  

  if (!me) return null;

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative size-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {me.image ? (
            <img src={me.image} alt={me.name || "Profile"} className="object-cover" />
          ) : (
            <UserCircle className="size-20 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 w-full space-y-4 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold">{me.name}</h2>
            <p className="text-muted-foreground">{me.email}</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="text-center">
              <p className="text-2xl font-bold">{me.followerCount || 0}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold">{me.followingCount || 0}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

        </div>
          <div>
            <ClipboardButton
              text={`${window.location.origin}/frens/${me.frenId}`}
              displayText="Copy profile link"
              className="inline-flex"
              showFullText={false}
            />
            <FrenDetalsFollowStatus  
            fren={me}
            />
          </div>
      </div>
    </Card>
  );
}

export const FrenBasicDetailsFragment = graphql`
  fragment FrenBasicDetails_fren on Fren {
    id
    name
    email
    image
    frenId
    followerCount
    followingCount
    isFollowingMe
    amFollowing
    isMe
  }
`;
