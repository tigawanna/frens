import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { MeQuery } from "./__generated__/MeQuery.graphql";
import { FrenProfileTabs } from "./FrenProfileTabs";

interface MeProps {}

export function Me({}: MeProps) {
  const queryData = useLazyLoadQuery<MeQuery>(MeFrenQuery, {
    postsFirst: 5,
    followersFirst: 10,
    followingFirst: 10,
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <FrenProfileTabs frenRef={queryData.me} />
    </div>
  );
}

const MeFrenQuery = graphql`
  query MeQuery($postsFirst: Int = 5, $followersFirst: Int = 10, $followingFirst: Int = 10) {
    me {
      ...FrenProfileTabsFragment_fren
        @arguments(
          postsFirst: $postsFirst
          followingFirst: $followingFirst
          followersFirst: $followersFirst
        )
    }
  }
`;
