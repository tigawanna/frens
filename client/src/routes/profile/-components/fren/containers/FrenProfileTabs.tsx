import { Suspense } from "react";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { FrenBasicDetails } from "./FrenBasicDetails";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { FrenPosts } from "../posts/FrenPosts";
import { FrenFollowers } from "../fellow/FrenFollowers";

import { FrenProfileTabsFragment_fren$key } from "./__generated__/FrenProfileTabsFragment_fren.graphql";
import { FrenFollowing } from "../fellow/FrenFollowing";

interface FrenProfileTabsProps {
  frenRef?: FrenProfileTabsFragment_fren$key|null;
}

export function FrenProfileTabs({ frenRef }: FrenProfileTabsProps) {
  const fragData = useFragment(FrenProfileTabsFragment, frenRef);
  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-6xl space-y-6">
        <FrenBasicDetails queryRef={fragData} />

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="text-base">
              Posts
            </TabsTrigger>
            <TabsTrigger value="followers" className="text-base">
              Followers
            </TabsTrigger>
            <TabsTrigger value="following" className="text-base">
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6 space-y-4">
            <Suspense fallback={<CardsListSuspenseFallback />}>
              <FrenPosts queryRef={fragData} />
            </Suspense>
          </TabsContent>

          <TabsContent value="followers" className="mt-6 space-y-4">
            <Suspense fallback={<CardsListSuspenseFallback />}>
              <FrenFollowers queryRef={fragData} />
            </Suspense>
          </TabsContent>

          <TabsContent value="following" className="mt-6 space-y-4">
            <Suspense fallback={<CardsListSuspenseFallback />}>
              <FrenFollowing queryRef={fragData} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const FrenProfileTabsFragment = graphql`
  fragment FrenProfileTabsFragment_fren on Fren
  @argumentDefinitions(
    postsFirst: { type: "Int", defaultValue: 5 }
    postsAfter: { type: "String" }
    followersFirst: { type: "Int", defaultValue: 10 }
    followersAfter: { type: "String" }
    followingFirst: { type: "Int", defaultValue: 10 }
    followingAfter: { type: "String" }
  ) {
    id
    ...FrenBasicDetails_fren
    ...FrenPosts_fren @arguments(first: $postsFirst, after: $postsAfter)
    ...FrenFollowers_fren @arguments(first: $followersFirst, after: $followersAfter)
    ...FrenFollowing_fren @arguments(first: $followingFirst, after: $followingAfter)
  }
`;

