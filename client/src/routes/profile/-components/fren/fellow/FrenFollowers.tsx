import { useState } from "react";
import { graphql } from "relay-runtime";
import { usePaginationFragment } from "react-relay";

import { Button } from "@/components/shadcn/ui/button";
import { Loader2, UserX } from "lucide-react";
import { FellowFrenCard } from "./FellowFrenCard";
import { FrenFollowers_fren$key } from "./__generated__/FrenFollowers_fren.graphql";
import { FrenFollowersPaginationQuery } from "./__generated__/FrenFollowersPaginationQuery.graphql";
import { Link } from "@tanstack/react-router";

interface FrenFollowersProps {
  queryRef?: FrenFollowers_fren$key | null;
}

export function FrenFollowers({ queryRef }: FrenFollowersProps) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    FrenFollowersPaginationQuery,
    FrenFollowers_fren$key
  >(FrenFollowersPaginatedFragment, queryRef);

  const followers = data?.followers?.edges?.map((edge) => edge?.node) || [];
  const followerCount = data?.followerCount || 0;

  const loadMoreFollowers = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(10);
    }
  };

  if (followers.length === 0) {
    return (
      <div className="w-full space-y-4">
        <div className="text-center py-12">
          <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No followers yet</h3>
          <p className="text-muted-foreground mt-2">
            Build your network by sharing content and engaging with others to gain followers.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/profile/explore">
              <Button variant="default">Find People to Follow</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Browse Feed</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Followers ({followerCount})</h2>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {followers.map(
          (follower) => follower && <FellowFrenCard key={follower.id} fellowRef={follower} />
        )}
      </div>

      {hasNext && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={loadMoreFollowers} disabled={isLoadingNext}>
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
    </div>
  );
}

export const FrenFollowersPaginatedFragment = graphql`
  fragment FrenFollowers_fren on Fren
  @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" })
  @refetchable(queryName: "FrenFollowersPaginationQuery") {
    id
    followerCount
    followers(first: $first, after: $after) @connection(key: "FrenFollowers_followers") {
      edges {
        cursor
        node {
          id
          ...FellowFrenCard_following
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
