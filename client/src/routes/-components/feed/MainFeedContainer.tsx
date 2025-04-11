import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Suspense } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
// Rename the imported type with an alias
import { MainFeedQuery as MainFeedContainerQuery } from "./__generated__/MainFeedQuery.graphql";
import { Feed } from "./MainFeed"; // Make sure to import the Feed component

// Define the main query to fetch the feed
export const MainFeedQuery = graphql`
  query MainFeedContainerQuery($first: Int!, $after: String) {
    ...MainFeed_feedPosts @arguments(first: $first, after: $after)
  }
`;

// Main component that fetches data and renders the feed
export function MainFeed() {
  // Use the renamed type
  const queryData = useLazyLoadQuery<MainFeedContainerQuery>(MainFeedQuery, { first: 24 });

  return (
    <div className="w-full py-4">
      <Feed queryRef={queryData} />
    </div>
  );
}

// Export a wrapper component with Suspense
export default function MainFeedWrapper() {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <MainFeed />
    </Suspense>
  );
}

// Loading skeleton for the feed
function FeedSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto py-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="w-full mb-4">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-base-200 animate-pulse" />
              <div>
                <div className="h-4 w-24 bg-base-200 rounded animate-pulse" />
                <div className="h-3 w-16 bg-base-200 rounded mt-2 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-base-200 rounded animate-pulse" />
              <div className="h-4 bg-base-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-base-200 rounded animate-pulse" />
            </div>
            <div className="h-40 bg-base-200 rounded animate-pulse mb-4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
