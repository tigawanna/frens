import { useState, useEffect } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { Label } from "@/components/shadcn/ui/label";
import { Card, CardContent, CardFooter } from "@/components/shadcn/ui/card";
import { Image, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/shadcn/ui/alert";

export interface PostFormData {
  id: string;
  content: string;
  imageUrl: string;
}

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  error?: string | null;
}

export function PostForm({
  initialData = { content: "", imageUrl: "", id: "" },
  onSubmit,
  isSubmitting = false,
  submitLabel = "Post",
  cancelLabel = "Cancel",
  onCancel,
  error = null,
}: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>(initialData);
  const [imagePreviewError, setImagePreviewError] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(true);
  
  // Reset form when initialData changes (for editing different posts)
  // useEffect(() => {
  //   setFormData(initialData);
  //   setIsPreviewVisible(Boolean(initialData.imageUrl));
  //   setImagePreviewError(null);
  // }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Reset image preview error when URL changes
    if (name === 'imageUrl') {
      setImagePreviewError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.content.trim() && !formData.imageUrl.trim()) {
      // Don't allow completely empty posts
      return;
    }
    
    onSubmit(formData);
  };

  const handleImageLoad = () => {
    setImagePreviewError(null);
  };

  const handleImageError = () => {
    if (formData.imageUrl) {
      setImagePreviewError("Failed to load image from URL. Please check the URL and try again.");
    }
  };
  
  const isFormValid = formData.content.trim().length > 0 || (formData.imageUrl.trim().length > 0 && !imagePreviewError);
  const isEditMode = initialData.content !== "" || initialData.imageUrl !== "";

  return (
    <Card className="w-full bg-transparent p-1 border-0">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-0 m-0">
          <div className="">
            <Label htmlFor="content" className="sr-only">
              Content
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="What's on your mind?"
              value={formData.content}
              onChange={handleChange}
              className="min-h-[120px] resize-y w-full border-none p-4 focus-visible:ring-0"
              disabled={isSubmitting}
            />
          </div>

          <div className="p-4 sacey-2">
            <Label htmlFor="imageUrl" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image URL (optional)
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              className="focus-visible:ring-1"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            {formData.imageUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                className="mt-1">
                {isPreviewVisible ? "Hide Preview" : "Show Preview"}
              </Button>
            )}
          </div>

          {formData.imageUrl && isPreviewVisible && (
            <div className="mt-2 rounded-md overflow-hidden border">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-auto max-h-[300px] object-contain bg-gray-100"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          )}

          {imagePreviewError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{imagePreviewError}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              {cancelLabel}
            </Button>
          )}
          <Button type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Saving..." : "Posting..."}
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
