import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar"; // Update import
import { formatDistance } from "date-fns";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { LikeButton } from "./LikePost";
import { graphql } from "relay-runtime";
import { MainFeed_feedPosts$data } from "./__generated__/MainFeed_feedPosts.graphql";
import { useFragment } from "react-relay";
import { FeedCard_post$key } from "./__generated__/FeedCard_post.graphql";
import { BetterAthViewer } from "@/lib/viewer/use-viewer";
import { EditPostModal } from "./form/PostDialogs";
import { useState } from "react";
import { ClipboardButton } from "@/components/wrappers/ClipboardButton";
import { Link } from "@tanstack/react-router";

// Define the interface for a post based on your GraphQL schema

export type FeedPostCard = NonNullable<
  NonNullable<NonNullable<MainFeed_feedPosts$data["feedPosts"]>["edges"]>[number]
>["node"];

interface PostCardProps {
  postRef: FeedCard_post$key;
  viewer?: BetterAthViewer;
}

// interface PostCardProps {
//   post: FeedPostCard;
// }

// Post Card Component to render individual posts
export function PostCard({ postRef, viewer }: PostCardProps) {
  const postData = useFragment<FeedCard_post$key>(FeedCardFragment, postRef);
  const postDate = postData?.createdAt ? new Date(postData.createdAt) : new Date();
  const timeAgo = formatDistance(postDate, new Date(), { addSuffix: true });
  const [open, setOpen] = useState(false);
  // Since we don't have user information in FeedPost, we'll use the post ID to create a unique identifier
  const postIdFirstChars = postData?.id.substring(0, 2).toUpperCase();
  if (!postData) {
    return null;
  }

  return (
    <Card className="w-full mb-4 border-none bg-base-300">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between gap-3 mb-4 ">
          <Link to="/profile/$frenId" params={{frenId: postData.postedBy?.frenId??""}} className="flex items-center gap-3 p-2 px-4 rounded-2xl hover:bg-primary/20">
            <Avatar>
              <AvatarFallback className="bg-primary/10 flex items-center justify-center h-10 w-10 rounded-full text-primary font-medium">
                {postIdFirstChars}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{postData.postedBy?.name}</div>
              <div className="text-xs text-muted-foreground">{timeAgo}</div>
            </div>
          </Link>
          <div className="">
            {viewer && viewer.id === postData?.postedBy?.frenId && (
              <EditPostModal post={postData} open={open} setOpen={setOpen} />
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="whitespace-pre-wrap">{postData.content}</p>
        </div>
        <ClipboardButton
          text={postData.postId}
          displayText={postData.postId}
          show={import.meta.env.DEV}
        />

        {postData.imageUrl && (
          <div className="rounded-md overflow-hidden mb-4">
            <img
              src={postData.imageUrl}
              alt="Post content"
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
        )}

        <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t">
          <LikeButton
            postId={postData.postId}
            isLiked={postData?.likedByMe}
            likeCount={postData.likeCount}
          />
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            Comment
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// interface PostCardProps {
//   post: FeedCard_post$key;
// }

// const postData = useFragment(FeedCardFragment, post);
// // Update the fragment to include all needed fields from FeedPost
export const FeedCardFragment = graphql`
  fragment FeedCard_post on FeedPost {
    id
    imageUrl
    postId
    content
    createdAt
    likeCount
    likedByMe
    updatedAt
    postedBy {
      frenId
      name
      email
      amFollowing
      amFollowing
      image
    }
  }
`;
