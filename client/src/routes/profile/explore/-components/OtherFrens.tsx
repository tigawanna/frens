import { Suspense, useState } from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { OtherFrensQuery } from "./__generated__/OtherFrensQuery.graphql";
import { OtherFrensPaginationQuery } from "./__generated__/OtherFrensPaginationQuery.graphql";
import { OtherFrens_frens$key } from "./__generated__/OtherFrens_frens.graphql";
import { OtherFrenCard } from "./OtherFrenCard";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Loader2, Search, Users } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/ui/card";



export function OtherFrensContent({ queryRef }: { queryRef: OtherFrens_frens$key }) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    OtherFrensPaginationQuery,
    OtherFrens_frens$key
  >(OtherFrensPaginatedQuery, queryRef);

  const frens = data?.frens?.edges?.map((edge) => edge?.node) || [];

  const loadMoreFrens = () => {
    if (hasNext && !isLoadingNext) {
      loadNext(10);
    }
  };

  return (
    <div className="w-full space-y-6">
      {frens.length === 0 ? (
        <div className="text-center py-16">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No users found</h3>
          <p className="text-muted-foreground mt-2">
            Try searching for different users or check back later
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frens.map((fren) => fren && <OtherFrenCard key={fren.id} frenRef={fren} />)}
          </div>

          {hasNext && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={loadMoreFrens} disabled={isLoadingNext}>
                {isLoadingNext ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading more users...
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



export function OtherFrensContainer({ searchText }: { searchText: string }) {
  const queryData = useLazyLoadQuery<OtherFrensQuery>(
    graphql`
      query OtherFrensQuery($frensFirst: Int = 30, $searchText: String) {
        ...OtherFrens_frens @arguments(first: $frensFirst, search: $searchText)
      }
    `,
    {
      frensFirst: 30,
      searchText: searchText || undefined,
    }
  );

  return <OtherFrensContent queryRef={queryData} />;
}

export function SearchBar({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) {
  return (
    <div className="relative mb-6">
      <div className="flex w-full max-w-sm mx-auto items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
    </div>
  );
}

const OtherFrensPaginatedQuery = graphql`
  fragment OtherFrens_frens on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "String" }
    search: { type: "String", defaultValue: "" }
  )
  @refetchable(queryName: "OtherFrensPaginationQuery") {
    frens(first: $first, after: $after, sort: { field: "name", order: asc }, search: $search)
      @connection(key: "OtherFrens_frens", filters: ["search"]) {
      edges {
        cursor
        node {
          id
          ...OtherFrenCard_fren
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

export function LoadingSkeletons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <Card key={i} className="w-full">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
              <div className="flex-1">
                <div className="h-5 w-1/2 bg-muted rounded animate-pulse mb-2" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse mb-4" />
                <div className="flex gap-4">
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="h-8 w-20 bg-muted rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
