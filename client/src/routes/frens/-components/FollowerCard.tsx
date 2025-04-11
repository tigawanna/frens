import { useFragment } from "react-relay";
import { FollowerCard_follower$key } from "./__generated__/FollowerCard_follower.graphql";
import { format } from "date-fns";
import defaultAvatar from "../../../assets/default-avatar.png";
import { graphql } from "relay-runtime";
interface Props {
  follower: FollowerCard_follower$key;
}

export function FollowerCard({ follower }: Props) {
  const data = useFragment(FollowerCardFragment, follower);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
      <img
        src={data.image || defaultAvatar}
        alt={`${data.name}'s avatar`}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="font-semibold text-lg">{data.name}</h3>
        <p className="text-gray-600">{data.email}</p>
        <div className="flex items-center space-x-2 mt-1">
          {data?.createdAt && (
            <span className="text-sm text-gray-500">
              Joined {format(new Date(data?.createdAt), "MMM d, yyyy")}
            </span>
          )}
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            {data.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export const FollowerCardFragment = graphql`
  fragment FollowerCard_follower on Follower {
    id
    name
    email
    image
    createdAt
    role
  }
`;
