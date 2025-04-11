import { useState, Suspense } from "react";
import { SearchBar, OtherFrensContent, LoadingSkeletons, OtherFrensContainer } from "./OtherFrens";
import { OtherFrens_frens$key } from "./__generated__/OtherFrens_frens.graphql";

interface OtherFrensProps {
  queryRef?: OtherFrens_frens$key;
}

export function OtherFrensPage({ queryRef }: OtherFrensProps) {
  const [searchText, setSearchText] = useState("");

  // If a queryRef is provided, use it (for when this component is used as a child)
  // Otherwise, fetch the data directly (for when used as a standalone component)
  if (queryRef) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <OtherFrensContent queryRef={queryRef} />
      </div>
    );
  }

  // Fetch data directly for standalone usage
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Explore Other Frens</h1>

      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      <Suspense fallback={<LoadingSkeletons />}>
        <OtherFrensContainer searchText={searchText} />
      </Suspense>
    </div>
  );
}
