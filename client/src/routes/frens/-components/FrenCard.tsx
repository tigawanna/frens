import { Card, CardContent, CardFooter } from "@/components/shadcn/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { CheckCircle, Mail } from "lucide-react";
import { format } from "date-fns";

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


interface FrenCardProps {
    fren:Fren;
}

export function FrenCard({fren}:FrenCardProps) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };


  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={fren.image || ""} alt={fren.name} />
              <AvatarFallback>{getInitials(fren.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold">{fren.name}</h3>
                {fren.emailVerified && (
                  <CheckCircle className="h-4 w-4 text-green-500" aria-label="Verified user" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span>{fren.email}</span>
              </div>
              <div className="flex items-center gap-3 pt-1 text-sm">
                <span>
                  <strong>{fren.followersCount}</strong> followers
                </span>
                <span>
                  <strong>{fren.followingCount}</strong> following
                </span>
              </div>
            </div>
          </div>
          {/* <div>{getFollowButton()}</div> */}
          <FrenshipStatus fren={fren} />
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Joined {format(new Date(fren.createdAt), "MMM d, yyyy")}
        </p>
      </CardFooter>
    </Card>
  );
}



interface FrenshipStatusProps {
 fren: Fren;
}

export function FrenshipStatus({fren}:FrenshipStatusProps){

if(!fren.isFollowing && fren.followsYou){    
return (
 <button className='btn btn-primary'>
    Follow back
 </button>
)
}
if (fren.isFollowing) {
  return <button className="btn btn-primary">Following</button>;
}
if (!fren.isFollowing) {
  return <button className="btn btn-primary">Follow</button>;
}


}
