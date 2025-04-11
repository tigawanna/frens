import { authClient } from "@/lib/better-auth/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader, CheckCircle, XCircle, ChevronRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/shadcn/ui/badge";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/shadcn/ui/collapsible";

interface BulkusresCreateProps {}

interface UserCreationResult {
  status: "fulfilled" | "rejected";
  value?: {
    data?: {
      token: null;
      user: {
        id: string;
        email: string;
        name: string;
        image: string | null | undefined;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
      };
    };
    error?: {
      message: string;
    };
  };
  reason?: any;
}

export function createNewDummyUser(fren: string) {
  const email = `${fren}@email.com`;
  return authClient.signUp.email({
    email,
    password: email,
    name: fren,
  });
}

function createaDummyUsers() {
  const frens = Array.from({ length: 20 }, (_, i) => `fren${i}`);
  const promises = frens.map((fren) => createNewDummyUser(fren));
  return Promise.allSettled(promises);
}

export function BulkusresCreate({}: BulkusresCreateProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return createaDummyUsers();
    },
    onSuccess: (data) => {
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const results = mutation.data as UserCreationResult[] | undefined;
  
  const succeededCount = results?.filter(result => 
    result.status === "fulfilled" && !result.value?.error
  ).length || 0;
  
  const failedCount = results?.filter(result => 
    result.status === "rejected" || result.value?.error
  ).length || 0;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Button 
        onClick={() => mutation.mutate()} 
        disabled={mutation.isPending}
        className="px-6"
      >
        Create Dummy Users 
        {mutation.isPending && <Loader className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
      
      {results && results.length > 0 && (
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Creation Results</h3>
              <div className="flex gap-2">
                <Badge  className="bg-green-100 text-green-800 hover:bg-green-200">
                  Success: {succeededCount}
                </Badge>
                <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">
                  Failed: {failedCount}
                </Badge>
              </div>
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              <ul className="space-y-2">
                {results.map((result, index) => {
                  const isError = result.status === "rejected" || result.value?.error;
                  const email = isError 
                    ? `fren${index}@email.com` 
                    : result.value?.data?.user.email;
                  const errorMessage = isError 
                    ? (result.value?.error?.message || result.reason?.message || "Unknown error") 
                    : null;
                  const user = !isError ? result.value?.data?.user : null;
                  const itemKey = `result-${index}`;
                  
                  return (
                    <li key={itemKey} className="w-full">
                      <Collapsible 
                        open={expandedItems[itemKey]} 
                        onOpenChange={() => toggleItem(itemKey)}
                        className={`border rounded-md ${isError ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}
                      >
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {isError ? (
                              <XCircle className="h-5 w-5 text-red-500" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            <span className="font-medium">{email}</span>
                          </div>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              {expandedItems[itemKey] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="px-4 pb-3 pt-0">
                            {isError ? (
                              <div className="text-sm text-red-700 bg-red-100 p-2 rounded-md">
                                <p className="font-semibold">Error Message:</p>
                                <p>{errorMessage}</p>
                              </div>
                            ) : user ? (
                              <div className="text-sm space-y-1 bg-green-100 p-2 rounded-md text-green-800">
                                <p><span className="font-semibold">ID:</span> {user.id}</p>
                                <p><span className="font-semibold">Name:</span> {user.name}</p>
                                <p><span className="font-semibold">Email:</span> {user.email}</p>
                                <p><span className="font-semibold">Verified:</span> {user.emailVerified ? 'Yes' : 'No'}</p>
                                <p>
                                  <span className="font-semibold">Created:</span>{' '}
                                  {user.createdAt ? format(new Date(user.createdAt), 'PPpp') : 'N/A'}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">No user data available</p>
                            )}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
