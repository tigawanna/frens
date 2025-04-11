import { useState } from "react";
import { graphql } from "relay-runtime";
import { usePaginationFragment } from "react-relay";
import { FrenPosts_user$key } from "./__generated__/FrenPosts_user.graphql";
import { FrenPostsPaginationQuery } from "./__generated__/FrenPostsPaginationQuery.graphql";
import { Button } from "@/components/shadcn/ui/button";
import { Loader2, FileX } from "lucide-react";
import { FrenPostcard } from "./FrenPostcard";

interface FrenPostsProps {
  queryRef: FrenPosts_user$key;
}

export function FrenPosts({ queryRef }: FrenPostsProps) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    FrenPostsPaginationQuery,
    FrenPosts_user$key
  >(FrenPostsPaginatedFragment, queryRef);

  const posts = data?.me?.posts?.edges?.map(edge => edge?.node) || [];
  const postsCount = data?.me?.postsCount || 0;

  const loadMorePosts = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(5);
    }
  };

  return (
    <div className="w-full space-y-4">
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No posts yet</h3>
          <p className="text-muted-foreground mt-2">
            Your posts will appear here once you start posting.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Posts ({postsCount})</h2>
          </div>

          <div className="space-y-4">
            {posts.map(post => 
              post && <FrenPostcard key={post.id} postRef={post} />
            )}
          </div>

          {hasNext && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={loadMorePosts}
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

const FrenPostsPaginatedFragment=  graphql`
      fragment FrenPosts_user on Query
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 5 },
        after: { type: "String" }
      )
      @refetchable(queryName: "FrenPostsPaginationQuery") {
        me {
          id
          postsCount
          posts(first: $first, after: $after)
            @connection(key: "FrenPosts_posts") {
            edges {
              cursor
              node {
                id
                ...FrenPostcard_post
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `
