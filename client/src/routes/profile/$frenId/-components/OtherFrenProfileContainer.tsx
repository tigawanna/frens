// import { Suspense } from "react";
// import { graphql } from "relay-runtime";
// import { useFragment } from "react-relay";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
// import { OtherFrenBasicDetails } from "./OtherFrenBasicDetails";
// import { OtherFrenPosts } from "./posts/OtherFrenPosts";
// import { OtherFrenFollowers } from "./followers/OtherFrenFollowers";
// import { OtherFrenFollowing } from "./following/OtherFrenFollowing";
// import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
// import { OtherFrenProfileContainer_fren$key } from "./__generated__/OtherFrenProfileContainer_fren.graphql";

// interface OtherFrenProfileContainerProps {
//   frenRef: OtherFrenProfileContainer_fren$key;
// }

// export function OtherFrenProfileContainer({ frenRef }: OtherFrenProfileContainerProps) {
//   // Use fragment to extract the data
//   const fren = useFragment(
//     graphql`
//       fragment OtherFrenProfileContainer_fren on Fren
//       @argumentDefinitions(
//         postsFirst: { type: "Int", defaultValue: 5 }
//         postsAfter: { type: "String" }
//         followersFirst: { type: "Int", defaultValue: 10 }
//         followersAfter: { type: "String" }
//         followingFirst: { type: "Int", defaultValue: 10 }
//         followingAfter: { type: "String" }
//       ) {
  
//         ...FrenBasicDetails_user
//         ...FrenPosts_user @arguments(first: $postsFirst, after: $postsAfter)
//         ...FrenFollowers_user @arguments(first: $followersFirst, after: $followersAfter)
//         ...FrenFollowing_user @arguments(first: $followingFirst, after: $followingAfter)
//       }
//     `,
//     frenRef
//   );

//   return (
//     <div className="w-full h-full flex flex-col items-center justify-start p-4">
//       <div className="w-full max-w-6xl space-y-6">
//         <OtherFrenBasicDetails frenRef={fren} />

//         <Tabs defaultValue="posts" className="w-full">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="posts" className="text-base">
//               Posts
//             </TabsTrigger>
//             <TabsTrigger value="followers" className="text-base">
//               Followers
//             </TabsTrigger>
//             <TabsTrigger value="following" className="text-base">
//               Following
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="posts" className="mt-6 space-y-4">
//             <Suspense fallback={<CardsListSuspenseFallback />}>
//               <OtherFrenPosts frenRef={fren} />
//             </Suspense>
//           </TabsContent>

//           <TabsContent value="followers" className="mt-6 space-y-4">
//             <Suspense fallback={<CardsListSuspenseFallback />}>
//               <OtherFrenFollowers frenRef={fren} />
//             </Suspense>
//           </TabsContent>

//           <TabsContent value="following" className="mt-6 space-y-4">
//             <Suspense fallback={<CardsListSuspenseFallback />}>
//               <OtherFrenFollowing frenRef={fren} />
//             </Suspense>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }
