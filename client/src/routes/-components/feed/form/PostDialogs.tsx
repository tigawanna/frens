import { PostForm, PostFormData } from "./PostForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { useState } from "react";
import { ConnectionHandler, graphql, useMutation } from "react-relay";
import { PostDialogsCreateMutation } from "./__generated__/PostDialogsCreateMutation.graphql";
import { PostDialogsEditMutation } from "./__generated__/PostDialogsEditMutation.graphql";
import { Edit, Plus } from "lucide-react";

// Fixed mutation name to match the file name pattern
const createPostMutation = graphql`
  mutation PostDialogsCreateMutation($content: String!, $imageUrl: String) {
    createPost(content: $content, imageUrl: $imageUrl) {
      ...FeedCard_post
    }
  }
`;

interface CreatePostModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreatePostModal({ open, setOpen }: CreatePostModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [commitMutation, isInFlight] = useMutation<PostDialogsCreateMutation>(createPostMutation);

  const handleSubmit = (data: PostFormData) => {
    setError(null);
    commitMutation({
      variables: {
        content: data.content,
        imageUrl: data.imageUrl || null,
      },
      onCompleted: (response, errors) => {
        if (errors && errors.length > 0) {
          setError(errors[0].message);
          return;
        }

        setOpen(false);
      },
      updater: (store) => {
        // Get the new post record
        const payload = store.getRootField("createPost");
        // Get the connection
        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(
          root,
          "MainFeed_feedPosts" // This matches your @connection key in MainFeed.tsx
        );
        if (connection && payload) {
          // Create a new edge with the post as the node
          const edge = ConnectionHandler.createEdge(
            store,
            connection,
            payload,
            "QueryFeedPostsConnectionEdge" // Edge type from your schema
          );

          // Insert at the beginning of the feed
          ConnectionHandler.insertEdgeBefore(connection, edge);
        }
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="fixed z-50 bottom-[10%] bg-primary hover:bg-secondary rounded-full text-primary-content right-[5%]">
        <button>
          <Plus className="size-14" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-2 max-h-[90vh] overflow-auto bg-base-200 border-0 z-50">
        <DialogHeader className="p-5">
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>What's on your mind</DialogDescription>
        </DialogHeader>

        <PostForm
          onSubmit={handleSubmit}
          isSubmitting={isInFlight}
          error={error}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

// Fixed mutation name to match the file name pattern
const editPostMutation = graphql`
  mutation PostDialogsEditMutation($id: String!, $content: String, $imageUrl: String) {
    updatePost(id: $id, content: $content, imageUrl: $imageUrl) {
      ...FeedCard_post
    }
  }
`;

interface EditPostModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: {
    postId: string;
    content?: string | null;
    imageUrl?: string | null;
  };
}

export function EditPostModal({ open, setOpen, post }: EditPostModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [commitMutation, isInFlight] = useMutation<PostDialogsEditMutation>(editPostMutation);

  const handleSubmit = (data: PostFormData) => {
    setError(null);

    commitMutation({
      variables: {
        id: post.postId,
        content: data.content,
        imageUrl: data.imageUrl || null,
      },
      onCompleted: (response, errors) => {
        if (errors && errors.length > 0) {
          setError(errors[0].message);
          return;
        }

        setOpen(false);
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="size-4" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-2 max-h-[90vh] overflow-auto bg-base-200 border-0 z-50">
        <DialogHeader>
          <DialogHeader className="p-5">
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>Change in mind?</DialogDescription>
          </DialogHeader>
        </DialogHeader>

        <PostForm
          initialData={{
            id:post.postId,
            content: post.content || "",
            imageUrl: post.imageUrl || "",
          }}
          onSubmit={handleSubmit}
          isSubmitting={isInFlight}
          error={error}
          onCancel={() => setOpen(false)}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
