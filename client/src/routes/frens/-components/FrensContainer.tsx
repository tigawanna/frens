import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { FrenCard } from "./FrenCard";
import { Input } from "@/components/shadcn/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { Card } from "@/components/shadcn/ui/card";

interface Fren {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  followsYou: boolean;
}

interface FrensContainerProps {
  // You can add props here if needed
}

export function FrensContainer({}: FrensContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Query for followers
  const followersQuery = useQuery({
    queryKey: ["followers", searchQuery],
    queryFn: async () => {
      // Replace with your actual API call
      // const response = await fetch(`/api/followers?search=${searchQuery}`);
      // return response.json();

      // Mock data for demonstration
      return await new Promise<Fren[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: "1",
                name: "Alex Johnson",
                email: "alex@example.com",
                emailVerified: true,
                image: "https://i.pravatar.cc/150?img=1",
                createdAt: new Date("2023-01-15"),
                followersCount: 324,
                followingCount: 125,
                isFollowing: false,
                followsYou: true,
              },
              {
                id: "2",
                name: "Taylor Swift",
                email: "taylor@example.com",
                emailVerified: true,
                image: "https://i.pravatar.cc/150?img=5",
                createdAt: new Date("2023-04-10"),
                followersCount: 1240,
                followingCount: 235,
                isFollowing: true,
                followsYou: true,
              },
            ]),
          500
        )
      );
    },
  });

  // Query for following
  const followingQuery = useQuery({
    queryKey: ["following", searchQuery],
    queryFn: async () => {
      // Replace with your actual API call
      // const response = await fetch(`/api/following?search=${searchQuery}`);
      // return response.json();

      // Mock data for demonstration
      return await new Promise<Fren[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: "3",
                name: "Jamie Smith",
                email: "jamie@example.com",
                emailVerified: false,
                image: "https://i.pravatar.cc/150?img=8",
                createdAt: new Date("2023-02-20"),
                followersCount: 56,
                followingCount: 78,
                isFollowing: true,
                followsYou: false,
              },
              {
                id: "4",
                name: "Morgan Lee",
                email: "morgan@example.com",
                emailVerified: true,
                image: null,
                createdAt: new Date("2023-05-05"),
                followersCount: 89,
                followingCount: 102,
                isFollowing: true,
                followsYou: false,
              },
            ]),
          700
        )
      );
    },
  });

  const renderFrensList = (query: typeof followersQuery) => {
    if (query.isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (query.isError) {
      return (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Failed to load frens. Please try again later.</p>
        </Card>
      );
    }

    if (query.data?.length === 0) {
      return (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No frens found</p>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {query.data?.map((fren) => <FrenCard key={fren.id} fren={fren} />)}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Frens</h1>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search frens..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="followers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="followers" className="text-base">
              Followers
              {followersQuery.data?.length ? (
                <span className="ml-2 rounded-full bg-primary/10 px-2 text-xs text-primary">
                  {followersQuery.data.length}
                </span>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="following" className="text-base">
              Following
              {followingQuery.data?.length ? (
                <span className="ml-2 rounded-full bg-primary/10 px-2 text-xs text-primary">
                  {followingQuery.data.length}
                </span>
              ) : null}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="mt-6 space-y-4">
            {renderFrensList(followersQuery)}
          </TabsContent>

          <TabsContent value="following" className="mt-6 space-y-4">
            {renderFrensList(followingQuery)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
