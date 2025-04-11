import { useState } from "react";
import { graphql } from "relay-runtime";
import { usePaginationFragment } from "react-relay";
import { FrenFollowers_fren$key } from "./__generated__/FrenFollowers_fren.graphql";
import { FrenFollowersPaginationQuery } from "./__generated__/FrenFollowersPaginationQuery.graphql";
import { Button } from "@/components/shadcn/ui/button";
import { Loader2, UserX } from "lucide-react";
import { FrenFollowerCard } from "./FrenFollowerCard";

interface FrenFollowersProps {
  queryRef?: FrenFollowers_fren$key |null ;
}

export function FrenFollowers({ queryRef }: FrenFollowersProps) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    FrenFollowersPaginationQuery,
    FrenFollowers_fren$key
  >(FrenFollowersPaginatedFragment, queryRef);

  const followers = data?.followers?.edges?.map(edge => edge?.node) || [];
  const followerCount = data?.followerCount || 0;

  const loadMoreFollowers = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(10);
    }
  };

  return (
    <div className="w-full space-y-4">
      {followers.length === 0 ? (
        <div className="text-center py-12">
          <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No followers yet</h3>
          <p className="text-muted-foreground mt-2">
            When people follow you, they'll appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Followers ({followerCount})</h2>
          </div>

          <div className="space-y-4">
            {followers.map(follower => 
              follower && <FrenFollowerCard key={follower.id} followerRef={follower} />
            )}
          </div>

          {hasNext && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={loadMoreFollowers}
                disabled={isLoadingNext}
              >
                {isLoadingNext ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export const FrenFollowersPaginatedFragment = graphql`
  fragment FrenFollowers_fren on Fren 
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
  )
  @refetchable(queryName: "FrenFollowersPaginationQuery") {
      id
      followerCount
      followers(first: $first, after: $after)
        @connection(key: "FrenFollowers_followers") {
        edges {
          cursor
          node {
            id
            ...FrenFollowerCard_follower
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  
`;
