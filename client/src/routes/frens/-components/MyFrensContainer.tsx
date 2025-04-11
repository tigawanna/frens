import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { Input } from "@/components/shadcn/ui/input";
import { Search, UserCircle } from "lucide-react";
import { Card } from "@/components/shadcn/ui/card";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import { MyFrensContainer_user$key } from "./__generated__/MyFrensContainer_user.graphql";
import { Followers } from "./Followers";
import { Following } from "./Following";

interface MyFrensContainerProps {
  queryRef: MyFrensContainer_user$key;
}

export function MyFrensContainer({ queryRef }: MyFrensContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Use a single fragment for the profile info
  const data = useFragment(
   MyFrensContainerFragment,
    queryRef
  );

  const me = data?.me;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-6xl space-y-6">
        {me && (
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative size-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {me.image ? (
                  <img src={me.image} alt={me.name || "Profile"} className="object-cover" />
                ) : (
                  <UserCircle className="size-20 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h2 className="text-2xl font-bold">{me.name}</h2>
                  <p className="text-muted-foreground">{me.email}</p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{me.followerCount || 0}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold">{me.followingCount || 0}</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                </div>

                <div>
                  {/* <CopypasteButton 
                    text={`${window.location.origin}/frens/${me.frenId}`}
                    displayText="Copy profile link" 
                    className="inline-flex"
                    showFullText={false}
                  /> */}
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Frens</h1>
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
              Followers ({me?.followerCount || 0})
            </TabsTrigger>
            <TabsTrigger value="following" className="text-base">
              Following ({me?.followingCount || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="mt-6 space-y-4">
            {/* <Followers queryRef={data} /> */}
          </TabsContent>

          <TabsContent value="following" className="mt-6 space-y-4">
            {/* <Following queryRef={data} /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


const MyFrensContainerFragment = graphql`
  fragment MyFrensContainer_user on Query {
    me {
      id
      name
      email
      image
      frenId
      followerCount
      followingCount
    }
    ...Followers_query
    ...Following_query
  }
`;



// Suspense fallback for loading state
export function FrensSuspenseFallback() {
  return (
    <Tabs defaultValue="followers" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="followers" className="text-base">
          Followers
        </TabsTrigger>
        <TabsTrigger value="following" className="text-base">
          Following
        </TabsTrigger>
      </TabsList>

      <TabsContent value="followers" className="mt-6">
        <CardsListSuspenseFallback />
      </TabsContent>

      <TabsContent value="following" className="mt-6">
        <CardsListSuspenseFallback />
      </TabsContent>
    </Tabs>
  );
}
