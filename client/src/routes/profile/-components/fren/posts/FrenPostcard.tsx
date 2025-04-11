import { Card, CardContent, CardFooter } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share, MoreHorizontal, Trash2 } from "lucide-react";
import { graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import { FrenPostcard_post$key } from "./__generated__/FrenPostcard_post.graphql";
import { FrenPostcardLikeMutation } from "./__generated__/FrenPostcardLikeMutation.graphql";

import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

interface FrenPostcardProps {
  postRef: FrenPostcard_post$key;
}

export function FrenPostcard({ postRef }: FrenPostcardProps) {
//   const [isLiking, setIsLiking] = useState(false);

  
  const post = useFragment(
    FrenPostcardFragment,
    postRef
  );

  const [commitLikeMutation,isLiking] = useMutation<FrenPostcardLikeMutation>(
    graphql`
      mutation FrenPostcardLikeMutation($postId: String!) {
        toggleLiked(postId: $postId) {
          id
          likeCount
          likedByMe
        }
      }
    `
  );

  const [commitDeleteMutation,isDeleting] = useMutation(
    graphql`
      mutation FrenPostcardDeleteMutation($id: String!) {
        deletePost(id: $id)
      }
    `
  );

  const handleLikeToggle = () => {
    if (isLiking) return;
    commitLikeMutation({
      variables: {
        postId: post.postId
      },
    });
  };

  const handleDeletePost = () => {
    if (isDeleting) return;
    commitDeleteMutation({
      variables: {
        id: post.postId
      },

    });
  };

  const formattedDate = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : "";

  const wasEdited = post.updatedAt && post.createdAt !== post.updatedAt;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              <span>{formattedDate}</span>
              {wasEdited && <span className="ml-1">(edited)</span>}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeletePost}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {post.content && (
          <div className="text-base mb-4 whitespace-pre-wrap">{post.content}</div>
        )}
        
        {post.imageUrl && (
          <div className="relative aspect-video rounded-md overflow-hidden mb-4">
            <img
              src={post.imageUrl}
              alt="Post image"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t py-3 flex justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${post.likedByMe ? 'text-primary' : ''}`}
            onClick={handleLikeToggle}
            disabled={isLiking}
          >
            <Heart className={`h-4 w-4 ${post.likedByMe ? 'fill-primary' : ''}`} />
            <span>{post.likeCount || 0}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

const FrenPostcardFragment = graphql`
  fragment FrenPostcard_post on FrenPost {
    id
    postId
    content
    imageUrl
    createdAt
    updatedAt
    likeCount
    likedByMe
  }
`;
