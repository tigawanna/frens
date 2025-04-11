import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Following_query$key } from "./__generated__/Following_query.graphql";
import { FollowingPaginationQuery } from "./__generated__/FollowingPaginationQuery.graphql";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Loader2, Search, Users } from "lucide-react";
import { useState } from "react";
import { FrenCard } from "./FrenCard";

interface FollowingProps {
  queryRef: Following_query$key;
}

export function Following({ queryRef }: FollowingProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    FollowingPaginationQuery,
    Following_query$key
  >(
    followingFragment,
    queryRef
  );

  const following = data?.me?.following?.edges?.map(edge => edge?.node) || [];
  const followingCount = data?.me?.followingCount || 0;

  // Filter following based on search query
//   const filteredFollowing = searchQuery 
//     ? following.filter(f => 
//         f?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//         f?.email?.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : following;

  const loadMoreFollowing = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(10);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Following ({followingCount})</h2>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search following..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {data?.length === 0 ? (
        <div className="text-center py-12 w-full">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Not following anyone yet</h3>
          <p className="text-muted-foreground mt-2">
            Start following other users to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {data?.map((followingUser) => (
            followingUser && (
              <FrenCard 
                key={followingUser.id} 
                fren={followingUser} 
              />
            )
          ))}
        </div>
      )}

      {hasNext && (
        <div className="flex justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={loadMoreFollowing}
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
    </div>
  );
}

// Fragment to fetch following data with pagination
export const followingFragment = graphql`
  fragment Following_query on Query
  @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" })
  @refetchable(queryName: "FollowingPaginationQuery") {
    me {
      id
      followingCount
      following(first: $first, after: $after) @connection(key: "Following_following") {
        edges {
          cursor
          node {
            ...FollowerCard_follower
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
