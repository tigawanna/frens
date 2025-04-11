import { graphql } from "relay-runtime";

interface MyFrensContainerProps {}

export function FrenContainer({}: MyFrensContainerProps) {
  return <div className="w-full h-full flex flex-col items-center justify-center"></div>;
}

const MyFrensContainerFragment = graphql`
  fragment MyFrensContainer_user on Fren {
    id
    name
    email
    image
    frenId
    followerCount
    followingCount

    # ...Followers_query
    # ...Following_query
  }
`;
