import { useState } from "react";
import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcn/ui/alert-dialog";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { makeHotToast } from "@/components/toasters";
import { Plus, Key, Loader2 } from "lucide-react";
import { authClient } from "@/lib/better-auth/auth-client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { Switch } from "@/components/shadcn/ui/switch";

const createApiKeySchema = z.object({
  name: z.string().min(1, "Name is required"),
  prefix: z.string().optional(),
  expiresIn: z.string(),
  permissions: z.string().optional(),
//   metadata: z.string().optional()
//     .transform((val) => {
//       if (!val) return {};
//       try {
//         return JSON.parse(val);
//       } catch (e) {
//         return {};
//       }
//     }),
  enabled: z.boolean(),
  rateLimitEnabled: z.boolean(),
  rateLimitTimeWindow: z.number().optional(),
  rateLimitMax: z.number().optional(),
});

type CreateApiKeyFormValues = z.infer<typeof createApiKeySchema>;
const dateBasedrandomNumber = new Date().getTime().toString().slice(-4);
const defaultValues: Partial<CreateApiKeyFormValues> = {
  name: `access_key_${dateBasedrandomNumber}`,
  prefix: "",
  expiresIn: "604800", // 7 days
  permissions: "",
//   metadata: "{\n  \"app\": \"my-app\"\n}",
  enabled: true,
  rateLimitEnabled: false,
  rateLimitTimeWindow: 60,
  rateLimitMax: 100,
};

export function CreateApiKeyButton() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const form = useForm<CreateApiKeyFormValues>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues,
  });

  const createApiKeyMutation = useMutation({
    mutationFn: async (values: CreateApiKeyFormValues) => {
      const payload: any = {
        name: values.name,
        expiresIn: values.expiresIn,
        enabled: values.enabled,
      };
      
      if (values.prefix) payload.prefix = values.prefix;
      if (values.permissions) payload.permissions = values.permissions;
    //   if (values.metadata) payload.metadata = values.metadata;
      
      if (values.rateLimitEnabled) {
        payload.rateLimitEnabled = true;
        payload.rateLimitTimeWindow = values.rateLimitTimeWindow;
        payload.rateLimitMax = values.rateLimitMax;
      }
      
      const { data, error } = await authClient.apiKey.create()
      if (error) throw new Error(error.message || "Failed to create API key");
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["viewer"] });
    //   setOpen(false);
    //   form.reset(defaultValues);
      makeHotToast({
        title: "API Key Created",
        description: "Your new API key has been created successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      makeHotToast({
        title: "Error",
        description: error.message || "Failed to create API key",
        variant: "error",
      });
    },
  });

  function onSubmit(values: CreateApiKeyFormValues) {
    createApiKeyMutation.mutate(values);
  }

  const expirationOptions = [
    { value: "3600", label: "1 Hour" },
    { value: "86400", label: "1 Day" },
    { value: "604800", label: "7 Days" },
    { value: "2592000", label: "30 Days" },
    { value: "31536000", label: "1 Year" },
    { value: "0", label: "Never" },
  ];
const data = createApiKeyMutation.data
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create API Key
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md md:max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Create New API Key
          </AlertDialogTitle>
          <AlertDialogDescription>
            Create a new API key to integrate with our services.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {createApiKeyMutation.isSuccess && (
          <Card className="mt-4 border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-green-800 dark:text-green-300">
                  API Key Created
                </div>
                <div className="font-mono text-xs bg-white dark:bg-gray-800 p-2 rounded border overflow-x-auto">
                  {createApiKeyMutation.data?.key}
                </div>
                <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                  Important: Copy this key now. You won't be able to see it again!
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    navigator.clipboard.writeText(createApiKeyMutation.data?.key || "");
                    makeHotToast({
                      title: "Copied!",
                      description: "API key copied to clipboard",
                      variant: "success",
                    });
                  }}>
                  Copy to Clipboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My API Key" {...field} />
                    </FormControl>
                    <FormDescription>A friendly name to identify this API key</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="prefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prefix (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="my_app" {...field} />
                      </FormControl>
                      <FormDescription>A prefix for the API key</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiresIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expiration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {expirationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>When this API key should expire</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissions (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="read,write,admin" {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated list of permissions</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enabled</FormLabel>
                      <FormDescription>
                        Whether this API key is active and can be used
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rateLimitEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Rate Limiting</FormLabel>
                      <FormDescription>
                        Limit how many requests can be made in a specific time window
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("rateLimitEnabled") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rateLimitMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Requests</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rateLimitTimeWindow"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Window (seconds)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="60"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* <FormField
                control={form.control}
                name="metadata"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metadata (Optional JSON)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder='{ "app": "my-app" }' 
                        className="font-mono text-xs h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Additional JSON metadata for this API key</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={createApiKeyMutation.isPending}>
                {createApiKeyMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create API Key
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
