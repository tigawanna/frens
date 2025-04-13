import { useSidebar } from "@/components/shadcn/ui/sidebar";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface OpenCloseDrawerIconsProps {

}

export function OpenCloseDrawerIcons({}:OpenCloseDrawerIconsProps){
const { state, isMobile } = useSidebar();
if(isMobile){
    return <ChevronsRight className="text-primary" />;
}
if(state === "expanded" && !isMobile){
    return (<ChevronsLeft className="text-primary"/>

    )
}
return <ChevronsRight className="text-primary"/>

}
