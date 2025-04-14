import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";

import { AlertTriangle, Info, HelpCircle, Loader } from "lucide-react";
import { cn } from "../lib/utils";

type DialogVariant = "danger" | "warning" | "info" | "default";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: DialogVariant;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function ConfirmDialog({
  open,
  trigger,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  loading = false,
  icon,
  children,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    if (!loading) {
      onCancel?.();
      onOpenChange(false);
    }
  };

  const handleConfirm = () => {
    if (!loading) {
      onConfirm();
    }
  };

  const getIconByVariant = () => {
    if (icon) return icon;

    switch (variant) {
      case "danger":
        return <AlertTriangle className="size-6 text-error-content " />;
      case "info":
        return <Info className="size-6 text-info-content" />;
      case "warning":
        return <AlertTriangle className="size-6 text-warning-content" />;
      default:
        return <HelpCircle className="size-6 text-primary-content" />;
    }
  };

  const confirmButtonVariant = () => {
    switch (variant) {
      case "danger":
        return "btn-error";
      case "warning":
        return "btn-warning";
      case "info":
        return "btn-info";
      default:
        return "btn-primary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="outline" className="btn btn-primary">
            Open Dialog
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row  gap-4">
          <div className="flex items-center justify-center mt-1">{getIconByVariant()}</div>
          <div className="flex-1 gap-2">
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            {description && <DialogDescription className="mt-1 text-xs">{description}</DialogDescription>}
          </div>
        </DialogHeader>

        <div className="py-2">{children}</div>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className={cn("mt-2 sm:mt-0")}>
            {cancelLabel}
          </Button>
          <button type="button" 
          className={`btn ${confirmButtonVariant()} mt-2 sm:mt-0`}
           onClick={handleConfirm} disabled={loading}>
            {confirmLabel} {loading && <Loader className="animate-spin"/>}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    //  example usage
      // <ConfirmDialog
      //   open={open}
      //   onOpenChange={setOpen}
      //   title="Delete API Key"
      //   description={`Are you sure you want to delete the API key "${keyName || keyId}"? This action cannot be undone.`}
      //   confirmLabel="Delete API Key"
      //   cancelLabel="Cancel"
      //   variant="danger"
      //   loading={deleteMutation.isPending}
      //   onConfirm={() => deleteMutation.mutate()}>
      //   <div className="text-sm text-muted-foreground">
      //     <p>Deleting this API key will immediately revoke access for any applications using it.</p>
      //     {deleteMutation.isPending && (
      //       <div className="mt-3 flex items-center justify-center p-2 rounded-md bg-muted">
      //         <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mr-2" />
      //         <span>Deleting API key...</span>
      //       </div>
      //     )}
      //   </div>
      // </ConfirmDialog>
