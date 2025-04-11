import { Button } from "@/components/shadcn/ui/button";
import { Heart } from "lucide-react";
import { useState, useOptimistic } from "react";
import { ConnectionHandler, graphql, useMutation } from "react-relay";
import { LikePostLikeMutation } from "./__generated__/LikePostLikeMutation.graphql";
import { LikePostUnlikeMutation } from "./__generated__/LikePostUnlikeMutation.graphql";
import { FeedPostCard } from "./FeedCard";

// Define the mutations
const likePostMutation = graphql`
  mutation LikePostLikeMutation($postId: String!) {
    likePost(postId: $postId) {
      ...FeedCard_post
    }
  }
`;

const unlikePostMutation = graphql`
  mutation LikePostUnlikeMutation($postId: String!) {
    unlikePost(postId: $postId) {
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
  }
  // Set up the mutations
  const [commitLike, commitingLikepending] = useMutation<LikePostLikeMutation>(likePostMutation);
  const [commitUnlike, commitingUnlikepending] =
    useMutation<LikePostUnlikeMutation>(unlikePostMutation);

  const isLoading = commitingLikepending || commitingUnlikepending;
  // Handle the like/unlike action

  const mutationOptions = {
    variables: { postId },
    onCompleted(response: any, errors: any) {
      if (errors) {
        console.error("Unlike operation failed:", errors);
        return;
      }
    },

  };
  const toggleLike = () => {
    if (isLoading) return;
    if (state.isLiked) {
      console.log("unlike post");
      commitLike({
        ...mutationOptions,
        // updater: (store) => {
        //   // Get the new post record
        //   const payload = store.getRootField("createPost");
        //   // Get the connection
        //   const root = store.getRoot();
        //   const connection = ConnectionHandler.getConnection(
        //     root,
        //     "MainFeed_feedPosts" // This matches your @connection key in MainFeed.tsx
        //   );
        //   if (connection && payload) {
        //     // Create a new edge with the post as the node
        //     const edge = ConnectionHandler.createEdge(
        //       store,
        //       connection,
        //       payload,
        //       "QueryFeedPostsConnectionEdge" // Edge type from your schema
        //     );

        //     // Insert at the beginning of the feed
        //     ConnectionHandler.insertEdgeBefore(connection, edge);
        //   }
        // },
      });
    } else {
      console.log("like post");
      commitUnlike({
        ...mutationOptions,
        // updater: (store) => {
        //   // Get the new post record
        //   const payload = store.getRootField("createPost");
        //   // Get the connection
        //   const root = store.getRoot();
        //   const connection = ConnectionHandler.getConnection(
        //     root,
        //     "MainFeed_feedPosts" // This matches your @connection key in MainFeed.tsx
        //   );
        //   if (connection && payload) {
        //     // Create a new edge with the post as the node
        //     const edge = ConnectionHandler.createEdge(
        //       store,
        //       connection,
        //       payload,
        //       "QueryFeedPostsConnectionEdge" // Edge type from your schema
        //     );

        //     // Insert at the beginning of the feed
        //     ConnectionHandler.insertEdgeBefore(connection, edge);
        //   }
        // },
      });
    }
  };

  return (
    <button
      // variant="ghost"
      onClick={toggleLike}
      disabled={isLoading}
      className={`btn gap-3`}
      aria-label={state.isLiked ? "Unlike post" : "Like post"}>
      <Heart
        className={` size-6 ${
          state.isLiked ? "fill-error-content stroke-0" : ""
        } ${isLoading ? "animate-spin" : ""}`}
      />
      <span className="">{state.count}</span>
    </button>
  );
}
