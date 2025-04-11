import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";

interface FrensTabSuspenseFallBackProps {}

export function FrensTabSuspenseFallBack({}: FrensTabSuspenseFallBackProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <div className="h-[20vh] skeleton bg-base-300 roundedlg"></div>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="text-base">
              Posts
            </TabsTrigger>
            <TabsTrigger value="followers" className="text-base">
              Followers
            </TabsTrigger>
            <TabsTrigger value="following" className="text-base">
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6 space-y-4">
            <CardsListSuspenseFallback />
          </TabsContent>

          <TabsContent value="followers" className="mt-6 space-y-4">
            <CardsListSuspenseFallback />
          </TabsContent>

          <TabsContent value="following" className="mt-6 space-y-4">
            <CardsListSuspenseFallback />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
