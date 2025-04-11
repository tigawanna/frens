// import { Card } from "@/components/shadcn/ui/card";
// import { Button } from "@/components/shadcn/ui/button";
// import { UserCircle, UserPlus, UserCheck, UserMinus } from "lucide-react";
// import { graphql } from "relay-runtime";
// import { useFragment, useMutation } from "react-relay";
// import { OtherFrenBasicDetails_fren$key } from "./__generated__/OtherFrenBasicDetails_fren.graphql";
// import { OtherFrenBasicDetailsFollowMutation } from "./__generated__/OtherFrenBasicDetailsFollowMutation.graphql";
// import { OtherFrenBasicDetailsUnfollowMutation } from "./__generated__/OtherFrenBasicDetailsUnfollowMutation.graphql";
// import { CopypasteButton } from "@/components/wrappers/CopypastButton";
// import { useState } from "react";

// interface OtherFrenBasicDetailsProps {
//   frenRef: OtherFrenBasicDetails_fren$key;
// }

// export function OtherFrenBasicDetails({ frenRef }: OtherFrenBasicDetailsProps) {
//   const [isFollowLoading, setIsFollowLoading] = useState(false);
  
//   const fren = useFragment(
//     graphql`
//       fragment OtherFrenBasicDetails_fren on Fren {
//         id
//         frenId
//         name
//         email
//         image
//         followerCount
//         followingCount
//       }
//     `,
//     frenRef
//   );

//   const [commitFollowMutation] = useMutation<OtherFrenBasicDetailsFollowMutation>(
//     graphql`
//       mutation OtherFrenBasicDetailsFollowMutation($input: FollowInput!) {
//         follow(input: $input) {
//           id
//           amFollowing
//         }
//       }
//     `
//   );

//   const [commitUnfollowMutation] = useMutation<OtherFrenBasicDetailsUnfollowMutation>(
//     graphql`
//       mutation OtherFrenBasicDetailsUnfollowMutation($input: FollowInput!) {
//         unfollow(input: $input) {
//           id
//           amFollowing
//         }
//       }
//     `
//   );

//   const handleFollowToggle = () => {
//     if (isFollowLoading) return;
    
//     setIsFollowLoading(true);
    
//     if (fren.amFollowing) {
//       commitUnfollowMutation({
//         variables: {
//           input: {
//             userId: fren.frenId,
//           },
//         },
//         onCompleted: () => {
//           setIsFollowLoading(false);
//         },
//         onError: () => {
//           setIsFollowLoading(false);
//         }
//       });
//     } else {
//       commitFollowMutation({
//         variables: {
//           input: {
//             userId: fren.frenId,
//           },
//         },
//         onCompleted: () => {
//           setIsFollowLoading(false);
//         },
//         onError: () => {
//           setIsFollowLoading(false);
//         }
//       });
//     }
//   };

//   return (
//     <Card className="p-6">
//       <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
//         <div className="relative size-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
//           {fren.image ? (
//             <img src={fren.image} alt={fren.name || "Profile"} className="object-cover" />
//           ) : (
//             <UserCircle className="size-20 text-muted-foreground" />
//           )}
//         </div>

//         <div className="flex-1 space-y-4 text-center md:text-left">
//           <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
//             <div>
//               <h2 className="text-2xl font-bold">{fren.name}</h2>
//               <p className="text-muted-foreground">{fren.email}</p>
//             </div>
            
//             <Button
//               variant={fren.amFollowing ? "secondary" : "default"}
//               size="sm"
//               onClick={handleFollowToggle}
//               disabled={isFollowLoading}
//               className="mt-2 md:mt-0"
//             >
//               {isFollowLoading ? (
//                 "Processing..."
//               ) : fren.amFollowing ? (
//                 <>
//                   <UserCheck className="mr-1 h-4 w-4" />
//                   Following
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="mr-1 h-4 w-4" />
//                   Follow
//                 </>
//               )}
//             </Button>
//           </div>

//           <div className="flex flex-wrap gap-4 justify-center md:justify-start">
//             <div className="text-center">
//               <p className="text-2xl font-bold">{fren.followerCount || 0}</p>
//               <p className="text-sm text-muted-foreground">Followers</p>
//             </div>
            
//             <div className="text-center">
//               <p className="text-2xl font-bold">{fren.followingCount || 0}</p>
//               <p className="text-sm text-muted-foreground">Following</p>
//             </div>
//           </div>

//           <div>
//             <CopypasteButton 
//               text={`${window.location.origin}/profile/${fren.frenId}`}
//               displayText="Copy profile link" 
//               className="inline-flex"
//               showFullText={false}
//             />
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }
