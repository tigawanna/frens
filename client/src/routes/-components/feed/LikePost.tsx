import { Heart } from "lucide-react";
import {  graphql, useMutation } from "react-relay";
import { LikePostUntoggleLikedMutation } from "./__generated__/LikePostUntoggleLikedMutation.graphql";


const toggleLikedMutation = graphql`
  mutation LikePostUntoggleLikedMutation($postId: String!) {
    toggleLiked(postId: $postId) {
      ...FeedCard_post
    }
  }
`;

interface LikeButtonProps {
  postId: string;
  isLiked: boolean | null | undefined;
  likeCount: number | null | undefined;
  showCount?: boolean;
  className?: string;
}

interface LikeState {
  isLiked: boolean;
  count: number;
}

export function LikeButton({
  postId,
  isLiked = false,
  likeCount = 0,
  className = "",
}: LikeButtonProps) {

  const state = {
    isLiked: isLiked || false,
    count: likeCount || 0,
  };
 const [toggleLiked, togglingUnlikepending] =
    useMutation<LikePostUntoggleLikedMutation>(toggleLikedMutation);

  const isLoading = togglingUnlikepending;


  const toggleLike = () => {
    if (isLoading) return;
    toggleLiked({
      variables: { postId },
    });
  };

  return (
    <button
      onClick={toggleLike}
      disabled={isLoading}
      className={`btn btn-ghost gap-3`}
      aria-label={state.isLiked ? "Unlike post" : "Like post"}>
      <Heart
        className={` size-6 ${
          state.isLiked ? "fill-error-content stroke-0" : ""
        } ${isLoading ? "animate-spin fill-error-content" : ""}`}
      />
      <span className="">{state.count}</span>
    </button>
  );
}
