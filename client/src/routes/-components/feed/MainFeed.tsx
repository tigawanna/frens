import { graphql } from "relay-runtime";
import { usePaginationFragment } from 'react-relay';
import { Button } from "@/components/shadcn/ui/button";
import { Coffee, Link, Loader2, PenSquare, UserPlus } from "lucide-react";
import { MainFeed_feedPosts$key } from './__generated__/MainFeed_feedPosts.graphql';
import { MainFeedPaginationQuery } from "./__generated__/MainFeedPaginationQuery.graphql";
import { PostCard } from "./FeedCard";
import { CreatePostModal } from "./form/PostDialogs";
import { useState } from "react";
import { useViewer } from "@/lib/viewer/use-viewer";


interface FeedProps {
  queryRef: MainFeed_feedPosts$key;
}

// Feed component that handles pagination
export function Feed({ queryRef }: FeedProps) {
  const fragData = usePaginationFragment<
    MainFeedPaginationQuery, 
    MainFeed_feedPosts$key
  >(MainFeedFragment, queryRef);

    const { data, loadNext, hasNext, isLoadingNext } = fragData
  const [open, setOpen] = useState(false);
  const {viewer} = useViewer()
  const loadMorePosts = () => {
    if (isLoadingNext || !hasNext) return;
    loadNext(5);
  };
  
  const posts = data?.feedPosts?.edges?.map(edge => edge?.node) || [];
  
  if (posts.length === 0) {
    return (
      <div className="w-full max-w-2xl min-h-screen flex flex-col justify-center mx-auto">
        <div className="bg-muted/20 rounded-lg p-8 flex flex-col items-center justify-center gap-4 border border-dashed">
          <div className="rounded-full bg-primary/10 p-4">
            <Coffee className="h-10 w-10 text-primary" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">Your feed is empty</h3>
            <p className="text-muted-foreground max-w-md">
              Start following some frens or create your first post to see updates in your feed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              onClick={() => setOpen(true)}
              variant="default"
              className="flex items-center gap-2">
              <PenSquare className="h-4 w-4" />
              Create a Post
            </Button>

            <Button variant="outline" asChild className="flex items-center gap-2">
              <Link to="/profile/explore">
                <UserPlus className="h-4 w-4" />
                Find Frens to Follow
              </Link>
            </Button>
          </div>
        </div>

        {/* Keep the modal here but it will be opened by the button click */}
        <CreatePostModal open={open} setOpen={setOpen} />
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      {posts.map((post) => post && <PostCard viewer={viewer} key={post.id} postRef={post} />)}

      {hasNext && (
        <div className="flex justify-center my-4">
          <Button onClick={loadMorePosts} variant="outline" disabled={isLoadingNext}>
            {isLoadingNext ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more posts...
              </>
            ) : (
              "Load More Posts"
            )}
          </Button>
        </div>
      )}
      <CreatePostModal open={open} setOpen={setOpen} />
    </div>
  );
}


// Define a fragment for the feed posts that supports pagination
export const MainFeedFragment = graphql`
  fragment MainFeed_feedPosts on Query
  @argumentDefinitions(first: { type: "Int", defaultValue: 24 }, after: { type: "String" })
  @refetchable(queryName: "MainFeedPaginationQuery") {
    feedPosts(first: $first, after: $after) @connection(key: "MainFeed_feedPosts", filters: []) {
      edges {
        cursor
        node {
          id
          ...FeedCard_post
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
