import { useViewer } from "@/lib/viewer/use-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { AccountStatusTab } from "./AccountStatusTab";
import { AccountDetailsTab } from "./AccountDetailsTab";
import { OverviewTab } from "./OverviewTab";
import { ProfileHeader } from "./ProfileHeader";
import { NotSignedIn } from "@/lib/viewer/cmponents/NotSignedin";

// Not Signed In Component

// Main Profile Component
interface ProfileComponenProps {}

export function ProfileComponen({}: ProfileComponenProps) {
  const { viewer } = useViewer();

  if (!viewer) {
    return <NotSignedIn />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-4xl">
        {/* Profile header */}
        <ProfileHeader viewer={viewer} />

        {/* Tabs for different profile sections */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Account Details</TabsTrigger>
            <TabsTrigger value="status">Account Status</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab viewer={viewer} />
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details">
            <AccountDetailsTab viewer={viewer} />
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status">
            <AccountStatusTab viewer={viewer} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
