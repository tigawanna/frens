import { useState } from "react";
import { graphql } from "relay-runtime";
import { usePaginationFragment } from "react-relay";
import { FrenFollowing_fren$key } from "./__generated__/FrenFollowing_fren.graphql";
import { FrenFollowingPaginationQuery } from "./__generated__/FrenFollowingPaginationQuery.graphql";
import { Button } from "@/components/shadcn/ui/button";
import { Loader2, Users, UserX } from "lucide-react";
import { FellowFrenCard } from "./FellowFrenCard";
import { Link } from "@tanstack/react-router";

interface FrenFollowingProps {
  queryRef?: FrenFollowing_fren$key | null;
}

export function FrenFollowing({ queryRef }: FrenFollowingProps) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    FrenFollowingPaginationQuery,
    FrenFollowing_fren$key
  >(FrenFollowingPaginatedFragment, queryRef);

  const following = data?.following?.edges?.map((edge) => edge?.node) || [];
  const followingCount = data?.followingCount || 0;

  const loadMoreFollowing = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(10);
    }
  };

  if (following.length === 0) {
    return (
      <div className="w-full space-y-4">
        <div className="text-center py-12">
          <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No following yet</h3>
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
        <h2 className="text-xl font-bold">Following ({followingCount})</h2>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {following.map(
          (followedUser) =>
            followedUser && <FellowFrenCard key={followedUser.id} fellowRef={followedUser} />
        )}
      </div>

      {hasNext && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={loadMoreFollowing} disabled={isLoadingNext}>
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

export const FrenFollowingPaginatedFragment = graphql`
  fragment FrenFollowing_fren on Fren
  @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" })
  @refetchable(queryName: "FrenFollowingPaginationQuery") {
    id
    followingCount
    following(first: $first, after: $after) @connection(key: "FrenFollowing_following") {
      edges {
        cursor
        node {
          id
          ...FellowFrenCard_following
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
