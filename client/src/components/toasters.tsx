import { CheckCircle2, CircleAlert, CircleX } from "lucide-react";
import toast, { ToastOptions } from "react-hot-toast";

export interface MakeToasterProps extends ToastOptions {
  title: string;
  description?: string;
  duration?: number;
  variant: "success" | "error" | "warning" | "info";
}

export function makeHotToast({ title, description, variant = "info", ...props }: MakeToasterProps) {
  const toastVariantStyle = (toastAvriant: typeof variant) => {
    switch (toastAvriant) {
      case "success":
        return "shadow-success text-success";
      case "info":
        return "shadow-info text-info";
      case "warning":
        return "shadow-warning text-warning";
      case "error":
        return " shadow-error text-error-content";
      default:
        return "shadow-info text-info";
    }
  };
  return toast.custom(
    (t) => {
      return (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} ${toastVariantStyle(
            variant
          )} shadow-sm pointer-events-auto flex w-full max-w-md rounded-lg bg-base-100 dark:shadow-sm`}>
          <div className="w-0 flex-1 p-4">
            <div className="flex items-center justify-center">
              <div className="h-full flex-shrink-0 items-center justify-center pt-0.5">
                {variant === "success" && (
                  <CheckCircle2 className="aspect-square h-full text-success" />
                )}
                {variant === "info" && <CircleAlert className="aspect-square h-full text-info" />}
                {variant === "warning" && (
                  <CircleAlert className="aspect-square h-full text-warning" />
                )}
                {variant === "error" && <CircleX className="aspect-square h-full text-error" />}
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-sm">{description}</p>
              </div>
            </div>
          </div>
          <div className="flex ">
            <button onClick={() => toast.dismiss(t.id)} className="btn btn-ghost h-full w-full">
              Close
            </button>
          </div>
        </div>
      );
    },
    { ...props, position: "bottom-left" }
  );
}
