import { Button } from "@/components/shadcn/ui/button";
import { Heart } from "lucide-react";
import { useState, useOptimistic } from "react";
import { ConnectionHandler, graphql, useMutation } from "react-relay";
import { LikePostLikeMutation } from "./__generated__/LikePostLikeMutation.graphql";
import { FeedPostCard } from "./FeedCard";
import { LikePostUntoggleLikedMutation } from "./__generated__/LikePostUntoggleLikedMutation.graphql";

// Define the mutations
// const likePostMutation = graphql`
//   mutation LikePostLikeMutation($postId: String!) {
//     likePost(postId: $postId) {
//       ...FeedCard_post
//     }
//   }
// `;

// const unlikePostMutation = graphql`
//   mutation LikePostUnlikeMutation($postId: String!) {
//     unlikePost(postId: $postId) {
//       ...FeedCard_post
//     }
//   }
// `;
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
  // Base state from props
  const state = {
    isLiked: isLiked || false,
    count: likeCount || 0,
  };
 const [toggleLiked, togglingUnlikepending] =
    useMutation<LikePostUntoggleLikedMutation>(toggleLikedMutation);

  const isLoading = togglingUnlikepending;
  // Handle the like/unlike action

  const toggleLike = () => {
    if (isLoading) return;
    toggleLiked({
      variables: { postId },
    });
  };

  return (
    <button
      // variant="ghost"
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
