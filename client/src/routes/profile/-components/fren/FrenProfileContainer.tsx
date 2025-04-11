import { Suspense, useState } from "react";
import { graphql } from "relay-runtime";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { FrenBasicDetails } from "./FrenBasicDetails";
import { FrenProfileContainer_user$key } from "./__generated__/FrenProfileContainer_user.graphql";
// import { FrenPosts } from "./FrenPosts";
import { Followers } from "../../../frens/-components/Followers";
import { Following } from "../../../frens/-components/Following";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { FrenProfileContainerQuery } from "./__generated__/FrenProfileContainerQuery.graphql";

interface FrenProfileContainerProps {

}

export function FrenProfileContainer({  }: FrenProfileContainerProps) {
  const queryData = useLazyLoadQuery<FrenProfileContainerQuery>(FrenProfileQuery, {});
  // const fragsData = useFragment<FrenProfileContainer_user$key>(
  //   FrensProfileContainerFragment,
  //   queryData
  // );
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
            {/* <Suspense fallback={<PostsSkeleton />}>
              <FrenPosts queryRef={queryData} />
            </Suspense> */}
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
// export const FrenProfileQuery = graphql`
//   query FrenProfileContainerQuery {
//     ...FrenProfileContainer_user
//   }
// `;
export const FrenProfileQuery = graphql`
  query FrenProfileContainerQuery {
    ...FrenBasicDetails_user
    # ...Followers_query @arguments(first: $followersFirst, after: $followersAfter)
    # ...Following_query @arguments(first: $followingFirst, after: $followingAfter)
  }
`;



  // query FrenProfileContainerQuery(
  //   # $followersFirst: Int = 10
  //   # $followersAfter: String
  //   # $followingFirst: Int = 10
  //   # $followingAfter: String
  // )

// const FrensProfileContainerFragment = graphql`
//   fragment FrenProfileContainer_user on Query {
//       ...FrenBasicDetails_user
  
//     # ...FrenPosts_user
//     # ...Followers_query
//     # ...Following_query
//     }
  
// `;
