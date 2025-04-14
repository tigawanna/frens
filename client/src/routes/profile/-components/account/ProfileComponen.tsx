import { useViewer } from "@/lib/viewer/use-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { AccountStatusTab } from "./AccountStatusTab";
import { AccountDetailsTab } from "./AccountDetailsTab";
import { OverviewTab } from "./OverviewTab";
import { ProfileHeader } from "./ProfileHeader";
import { NotSignedIn } from "@/lib/viewer/components/NotSignedin";
import { AccountSettings } from "./AccountSettings";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { accountTabs } from "../../account";

// Not Signed In Component

// Main Profile Component
interface ProfileComponenProps {}

export function ProfileComponen({}: ProfileComponenProps) {
  const { viewer } = useViewer();
  const navigate = useNavigate({
    from: "/profile/account",
  });
  const {tab} = useSearch({
    from: "/profile/account/",
  })
  function handleTabChange(value: string) {
    if (tab !== value) {
      navigate({ search: { tab: value as typeof accountTabs[number] } });
    }
    }
  if (!viewer) {
    return <NotSignedIn />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-4xl">
        {/* Profile header */}
        <ProfileHeader viewer={viewer} />

        {/* Tabs for different profile sections */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange} value={tab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 border-none">
            <TabsTrigger  value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Account Details</TabsTrigger>
            <TabsTrigger value="status">Account Status</TabsTrigger>
            <TabsTrigger value="keys">Account Keys</TabsTrigger>
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
          {/* Settings Tab */}
          <TabsContent value="keys">
            <AccountSettings viewer={viewer} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
