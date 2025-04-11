import { graphql } from "relay-runtime";
import { usePaginationFragment } from 'react-relay';
import { MainFeed_feedPosts$key } from './__generated__/MainFeed_feedPosts.graphql';
import { Button } from "@/components/shadcn/ui/button";
import { Loader2 } from "lucide-react";
import { MainFeedPaginationQuery } from "./__generated__/MainFeedPaginationQuery.graphql";
import { PostCard } from "./FeedCard";


interface FeedProps {
  queryRef: MainFeed_feedPosts$key;
}

// Feed component that handles pagination
export function Feed({ queryRef }: FeedProps) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    MainFeedPaginationQuery, 
    MainFeed_feedPosts$key
  >(MainFeedFragment, queryRef);
  
  const loadMorePosts = () => {
    if (isLoadingNext || !hasNext) return;
    loadNext(5);
  };
  
  const posts = data?.feedPosts?.edges?.map(edge => edge?.node) || [];
  
  if (posts.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-muted-foreground">No posts in your feed yet.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      {posts.map(post => post && <PostCard key={post.id} post={post} />)}
      
      {hasNext && (
        <div className="flex justify-center my-4">
          <Button 
            onClick={loadMorePosts} 
            variant="outline" 
            disabled={isLoadingNext}
          >
            {isLoadingNext ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more posts...
              </>
            ) : (
              'Load More Posts'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}


// Define a fragment for the feed posts that supports pagination
export const MainFeedFragment = graphql`
  fragment MainFeed_feedPosts on Query 
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 24 }
    after: { type: "String" }
  )
  @refetchable(queryName: "MainFeedPaginationQuery") {
    feedPosts(first: $first, after: $after)
      @connection(key: "MainFeed_feedPosts", filters: []) {
      edges {
        cursor
        node {
          id
          imageUrl
          postId
          content
          createdAt
          likeCount
          likedByMe
          updatedAt
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
