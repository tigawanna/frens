import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Followers_query$key } from "./__generated__/Followers_query.graphql";
import { FollowersPaginationQuery } from "./__generated__/FollowersPaginationQuery.graphql";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Loader2, Search, Users } from "lucide-react";
import { useState } from "react";
import { FrenCard } from "./FrenCard";

interface FollowersProps {
  queryRef: Followers_query$key;
}

export function Followers({ queryRef }: FollowersProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    FollowersPaginationQuery,
    Followers_query$key
  >(
    followersFragment,
    queryRef
  );

  const followers = data?.me?.followers?.edges?.map(edge => edge?.node) || [];
  const followerCount = data?.me?.followerCount || 0;

  // Filter followers based on search query
  const filteredFollowers = searchQuery 
    ? followers.filter(f => 
        f?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : followers;

  const loadMoreFollowers = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(10);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Followers ({followerCount})</h2>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search followers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredFollowers.length === 0 ? (
        <div className="text-center py-12 w-full">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No followers yet</h3>
          <p className="text-muted-foreground mt-2">
            Share your profile with others to gain followers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredFollowers.map((follower) => (
            follower && (
              <FrenCard 
                key={follower.id} 
                frenRef={follower} 
              />
            )
          ))}
        </div>
      )}

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
    </div>
  );
}

// Fragment to fetch followers data with pagination
export const followersFragment = graphql`
  fragment Followers_query on Query
  @argumentDefinitions(first: { type: "Int", defaultValue: 10 }, after: { type: "String" })
  @refetchable(queryName: "FollowersPaginationQuery") {
    me {
      id
      followerCount
      followers(first: $first, after: $after) @connection(key: "Followers_followers") {
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


