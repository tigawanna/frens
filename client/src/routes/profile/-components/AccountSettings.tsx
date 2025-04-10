import { BetterAthViewer } from "@/lib/viewer/use-viewer";
import { AccountApikeys } from "./api-keys/AccountApikeys";
import { Suspense } from "react";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";

interface AccountSettingsProps {
  viewer: BetterAthViewer;
}

export function AccountSettings({viewer}:AccountSettingsProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
    uwu
    <Suspense fallback={<CardsListSuspenseFallback/>}>
    <AccountApikeys viewer={viewer}/>
    </Suspense>
 </div>
);
}

