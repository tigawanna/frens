import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar"; // Update import
import { formatDistance } from "date-fns";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { LikeButton } from "./LikePost";
import { graphql } from "relay-runtime";
import { MainFeed_feedPosts$data } from "./__generated__/MainFeed_feedPosts.graphql";

// Define the interface for a post based on your GraphQL schema

export type FeedPostCard = NonNullable<
  NonNullable<NonNullable<MainFeed_feedPosts$data["feedPosts"]>["edges"]>[number]
>["node"];

interface PostCardProps {
  post: FeedPostCard;
}

// Post Card Component to render individual posts
export function PostCard({ post }: PostCardProps) {
  const postDate = post?.createdAt ? new Date(post.createdAt) : new Date();
  const timeAgo = formatDistance(postDate, new Date(), { addSuffix: true });

  // Since we don't have user information in FeedPost, we'll use the post ID to create a unique identifier
  const postIdFirstChars = post?.id.substring(0, 2).toUpperCase();
  if(!post) {
    return null;
  }

  return (
    <Card className="w-full mb-4 border-none bg-base-300">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-primary/10 flex items-center justify-center h-10 w-10 rounded-full text-primary font-medium">
              {postIdFirstChars}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.postedBy?.name}</div>
            <div className="text-xs text-muted-foreground">{timeAgo}</div>
          </div>
        </div>

        <div className="mb-4">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>

        {post.imageUrl && (
          <div className="rounded-md overflow-hidden mb-4">
            <img
              src={post.imageUrl}
              alt="Post content"
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
        )}

        <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t">
          <LikeButton postId={post.postId} isLiked={post?.likedByMe} likeCount={post.likeCount} />
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

// const postData = useFragment(PostCardFragment, post);
// // Update the fragment to include all needed fields from FeedPost
// export const PostCardFragment = graphql`
//   fragment FeedCard_post on FeedPost {
//     id
//     postId
//     imageUrl
//     content
//     createdAt
//     likeCount
//     likedByMe
//     updatedAt
//   }
// `;
