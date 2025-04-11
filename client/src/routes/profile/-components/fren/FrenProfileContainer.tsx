import { Suspense, useState } from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { FrenBasicDetails } from "./FrenBasicDetails";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { FrenProfileContainerQuery } from "./__generated__/FrenProfileContainerQuery.graphql";
import { FrenPosts } from "./posts/FrenPosts";
import { FrenFollowers } from "./followers/FrenFollowers";
import { FrenFollowing } from "./following/FrenFollowing";

interface FrenProfileContainerProps {}

export function FrenProfileContainer({}: FrenProfileContainerProps) {
  const queryData = useLazyLoadQuery<FrenProfileContainerQuery>(FrenProfileQuery, {
    postsFirst: 5,
    followersFirst: 10,
    followingFirst: 10,
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-6xl space-y-6">
        <FrenBasicDetails queryRef={queryData} />

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
              <FrenPosts queryRef={queryData} />
            </Suspense>
          </TabsContent>

          <TabsContent value="followers" className="mt-6 space-y-4">
            <Suspense fallback={<CardsListSuspenseFallback />}>
              <FrenFollowers queryRef={queryData} />
            </Suspense>
          </TabsContent>

          <TabsContent value="following" className="mt-6 space-y-4">
            <Suspense fallback={<CardsListSuspenseFallback />}>
              <FrenFollowing queryRef={queryData} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export const FrenProfileQuery = graphql`
  query FrenProfileContainerQuery(
    $postsFirst: Int = 5,
    $postsAfter: String,
    $followersFirst: Int = 10,
    $followersAfter: String,
    $followingFirst: Int = 10,
    $followingAfter: String
  ) {
    ...FrenBasicDetails_user
    ...FrenPosts_user @arguments(first: $postsFirst, after: $postsAfter)
    ...FrenFollowers_user @arguments(first: $followersFirst, after: $followersAfter)
    ...FrenFollowing_user @arguments(first: $followingFirst, after: $followingAfter)
  }
`;


