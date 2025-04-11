import { Suspense, useState } from "react";
import { graphql } from "relay-runtime";
import {  useLazyLoadQuery } from "react-relay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { FrenBasicDetails } from "./FrenBasicDetails";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { FrenProfileContainerQuery } from "./__generated__/FrenProfileContainerQuery.graphql";
import { FrenPosts } from "./posts/FrenPosts";


interface FrenProfileContainerProps {}

export function FrenProfileContainer({}: FrenProfileContainerProps) {
  const queryData = useLazyLoadQuery<FrenProfileContainerQuery>(FrenProfileQuery, {
    postsFirst: 5,
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
              {/* <Followers queryRef={queryData} /> */}
            </Suspense>
          </TabsContent>

          <TabsContent value="following" className="mt-6 space-y-4">
            <Suspense fallback={<CardsListSuspenseFallback />}>
              {/* <Following queryRef={queryData} /> */}
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export const FrenProfileQuery = graphql`
  query FrenProfileContainerQuery($postsFirst: Int = 5, $postsAfter: String) {
    ...FrenBasicDetails_user
    ...FrenPosts_user @arguments(first: $postsFirst, after: $postsAfter)
  }
`;


