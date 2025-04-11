// import { useLazyLoadQuery } from "react-relay";
// import { graphql } from "relay-runtime";

// function OtherFrenProfileWrapper({ frenId }: { frenId: string }) {
//   export const queryData = useLazyLoadQuery<FrenProfilePageQuery>(
//     graphql`
//       query FrenProfilePageQuery(
//         $frenId: String!
//         $postsFirst: Int = 5
//         $postsAfter: String
//         $followersFirst: Int = 10
//         $followersAfter: String
//         $followingFirst: Int = 10
//         $followingAfter: String
//       ) {
//         fren(id: $frenId) {
//           ...OtherFrenProfileContainer_fren
//             @arguments(
//               postsFirst: $postsFirst
//               postsAfter: $postsAfter
//               followersFirst: $followersFirst
//               followersAfter: $followersAfter
//               followingFirst: $followingFirst
//               followingAfter: $followingAfter
//             )
//         }
//       }
//     `,
//     {
//       frenId,
//       postsFirst: 5,
//       followersFirst: 10,
//       followingFirst: 10,
//     }
//   );

//   // Handle case where fren doesn't exist
//   if (!queryData.fren) {
//     return <div>User not found</div>;
//   }

//   return <OtherFrenProfileContainer frenRef={queryData.fren} />;
// }
