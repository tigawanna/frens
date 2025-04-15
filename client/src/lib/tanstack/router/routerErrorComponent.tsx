import { Button } from "@/components/shadcn/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ClipboardButton } from "@/components/wrappers/ClipboardButton";

interface RouterErrorComponentProps {
  error: Error;
}

export function RouterErrorComponent({ error }: RouterErrorComponentProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  // Format just the error message and name for a quick copy
  const getErrorSummary = () => {
    return `Error: ${error.name}\nMessage: ${error.message}`;
  };

  // Format the complete error information for copying
  const getFullErrorText = () => {
    return `Error: ${error.name}
Message: ${error.message}
Stack Trace:
${error.stack || "No stack trace available"}
URL: ${window.location.href}
Time: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}`;
  };

  // In production, show a user-friendly error
  if (import.meta.env.PROD) {
    return (
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-base-200/70 p-10 rounded-lg flex flex-col items-center text-center space-y-6">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-10 w-10 text-error-content" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="text-muted-foreground">
              We're sorry, but we encountered an unexpected error. Our team has been notified.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
            <Button variant="outline" className="flex-1" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Button asChild className="flex-1">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="w-full pt-4 border-t border-border mt-2">
            <p className="text-xs text-muted-foreground mb-3">
              If this issue persists, please contact support with the error details:
            </p>
            <div className="flex gap-2 min-w-fit">
              <ClipboardButton
                text={getErrorSummary()}
                displayText="Copy Summary"
                className="min-w-fit"
              />

              <ClipboardButton
                displayText="Copy Full Details"
                text={getFullErrorText()}
                className="min-w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // In development, show the actual error details
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full rounded-xl border border-destructive bg-base-200 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-error-content" />
          <h2 className="text-xl font-semibold text-error-content">{error.name}</h2>
        </div>

        <p className="font-medium">{error.message}</p>

        {error.stack && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Stack Trace:</h3>
            <pre className="bg-base-100 p-4 rounded-md text-xs overflow-auto max-h-[400px]">
              {error.stack}
            </pre>
          </div>
        )}

        <div className="flex flex-wrap gap-2 justify-between mt-4">
          <div className="flex gap-2 min-w-fit">
            <ClipboardButton
              text={getErrorSummary()}
              displayText="Copy Summary"
              className="min-w-fit"
            />

            <ClipboardButton
              displayText="Copy Full Details"
              text={getFullErrorText()}
              className="min-w-fit"
            />
          </div>

          <Button variant="default" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
}
