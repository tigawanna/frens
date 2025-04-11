import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";

import { FrenProfileTabs } from "./FrenProfileTabs";
import { FrenQuery } from "./__generated__/FrenQuery.graphql";

interface FrenProps {
  frenId: string; // Make it optional so component can show current user if no ID provided
}

export function Fren({ frenId }: FrenProps) {
  const queryData = useLazyLoadQuery<FrenQuery>(OtherFrenQuery, {
    frenId, // Pass the frenId to the query
    postsFirst: 5,
    followersFirst: 10,
    followingFirst: 10,
  });
return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <FrenProfileTabs frenRef={queryData.fren} />
    </div>
  );
}

// Update the query to handle both current user (me) and specific fren
const OtherFrenQuery = graphql`
  query FrenQuery(
    $frenId: String!, 
    $postsFirst: Int = 5, 
    $followersFirst: Int = 10, 
    $followingFirst: Int = 10
  ) {
    fren(id: $frenId){
      ...FrenProfileTabsFragment_fren
        @arguments(
          postsFirst: $postsFirst
          followingFirst: $followingFirst
          followersFirst: $followersFirst
        )
    }
  }
`;
