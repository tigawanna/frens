import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/shadcn/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { authClient } from "@/lib/better-auth/auth-client";
import { makeHotToast } from "@/components/toasters";
import { ConfirmDialog } from "@/components/shadcn/mine/ConfirmDialog";


interface DeleteKeyProps {
  keyId: string;
  keyName: string | null;
  userId: string;
}

export function DeleteKey({ keyId, keyName, userId }: DeleteKeyProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.apiKey.delete({
        keyId: keyId,
      });

      if (error) throw new Error(error.message || "Failed to delete API key");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apikeys"] });
      setOpen(false);
      makeHotToast({
        title: "API Key Deleted",
        description: `The API key "${keyName || keyId}" has been deleted successfully`,
        variant: "success",
        duration: 4000,
      });
    },
    onError: (error) => {
      makeHotToast({
        title: "Error",
        description: error.message || "Failed to delete API key",
        variant: "error",
        duration: 5000,
      });
    },
  });

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1">
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete API Key"
        description={`Are you sure you want to delete the API key "${keyName || keyId}"? This action cannot be undone.`}
        confirmLabel="Delete API Key"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate()}>
        <div className="text-sm text-muted-foreground">
          <p>Deleting this API key will immediately revoke access for any applications using it.</p>
          {deleteMutation.isPending && (
            <div className="mt-3 flex items-center justify-center p-2 rounded-md bg-muted">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mr-2" />
              <span>Deleting API key...</span>
            </div>
          )}
        </div>
      </ConfirmDialog>
    </>
  );
}
