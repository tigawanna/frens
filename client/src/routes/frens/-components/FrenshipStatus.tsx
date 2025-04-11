import { Fren } from "@/types/frens";

interface FrenshipStatusProps {
  frenStatus:{
    frenId:string;
    isFollowing: boolean;
    amFollowing: boolean;
  }
}

export function FrenshipStatus({ frenStatus }: FrenshipStatusProps) {
  if (frenStatus.isFollowing && !frenStatus.amFollowing) {
    return <button className="btn btn-primary">Follow back</button>;
  }
  if (frenStatus.isFollowing) {
    return <button className="btn btn-primary">Following</button>;
  }
  if (!frenStatus.amFollowing) {
    return <button className="btn btn-primary">Follow</button>;
  }
}
