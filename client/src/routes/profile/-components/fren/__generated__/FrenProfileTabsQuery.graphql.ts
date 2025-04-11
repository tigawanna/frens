/**
 * @generated SignedSource<<5bad9b56a615ad391d47108590bb3310>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenProfileTabsQuery$variables = {
  followersAfter?: string | null | undefined;
  followersFirst?: number | null | undefined;
  followingAfter?: string | null | undefined;
  followingFirst?: number | null | undefined;
  postsAfter?: string | null | undefined;
  postsFirst?: number | null | undefined;
};
export type FrenProfileTabsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FrenBasicDetails_user" | "FrenFollowers_user" | "FrenFollowing_user" | "FrenPosts_user">;
};
export type FrenProfileTabsQuery = {
  response: FrenProfileTabsQuery$data;
  variables: FrenProfileTabsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "followersAfter"
},
v1 = {
  "defaultValue": 10,
  "kind": "LocalArgument",
  "name": "followersFirst"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "followingAfter"
},
v3 = {
  "defaultValue": 10,
  "kind": "LocalArgument",
  "name": "followingFirst"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "postsAfter"
},
v5 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "postsFirst"
},
v6 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "postsAfter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "postsFirst"
  }
],
v7 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "followersAfter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "followersFirst"
  }
],
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "followingAfter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "followingFirst"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "frenId",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v17 = [
  (v14/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Follower",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v9/*: any*/),
      (v13/*: any*/),
      (v10/*: any*/),
      (v11/*: any*/),
      (v12/*: any*/),
      (v15/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FrenProfileTabsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FrenBasicDetails_user"
      },
      {
        "args": (v6/*: any*/),
        "kind": "FragmentSpread",
        "name": "FrenPosts_user"
      },
      {
        "args": (v7/*: any*/),
        "kind": "FragmentSpread",
        "name": "FrenFollowers_user"
      },
      {
        "args": (v8/*: any*/),
        "kind": "FragmentSpread",
        "name": "FrenFollowing_user"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v5/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "FrenProfileTabsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Fren",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "followerCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "followingCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "postsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "FrenPostsConnection",
            "kind": "LinkedField",
            "name": "posts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FrenPostsConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FrenPost",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "postId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "content",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageUrl",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "updatedAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "likeCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "likedByMe",
                        "storageKey": null
                      },
                      (v15/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v16/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FrenPosts_posts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "FrenFollowersConnection",
            "kind": "LinkedField",
            "name": "followers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FrenFollowersConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v17/*: any*/),
                "storageKey": null
              },
              (v16/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FrenFollowers_followers",
            "kind": "LinkedHandle",
            "name": "followers"
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "FrenFollowingConnection",
            "kind": "LinkedField",
            "name": "following",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FrenFollowingConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": (v17/*: any*/),
                "storageKey": null
              },
              (v16/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FrenFollowing_following",
            "kind": "LinkedHandle",
            "name": "following"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1aeef02b3086f5bc16d68731b33e763f",
    "id": null,
    "metadata": {},
    "name": "FrenProfileTabsQuery",
    "operationKind": "query",
    "text": "query FrenProfileTabsQuery(\n  $postsFirst: Int = 5\n  $postsAfter: String\n  $followersFirst: Int = 10\n  $followersAfter: String\n  $followingFirst: Int = 10\n  $followingAfter: String\n) {\n  ...FrenBasicDetails_user\n  ...FrenPosts_user_2fWGjs\n  ...FrenFollowers_user_1JmbCR\n  ...FrenFollowing_user_2COcfD\n}\n\nfragment FrenBasicDetails_user on Query {\n  me {\n    id\n    name\n    email\n    image\n    frenId\n    followerCount\n    followingCount\n  }\n}\n\nfragment FrenFollowerCard_follower on Follower {\n  id\n  frenId\n  name\n  email\n  image\n}\n\nfragment FrenFollowers_user_1JmbCR on Query {\n  me {\n    id\n    followerCount\n    followers(first: $followersFirst, after: $followersAfter) {\n      edges {\n        cursor\n        node {\n          id\n          ...FrenFollowerCard_follower\n          __typename\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}\n\nfragment FrenFollowingCard_following on Follower {\n  id\n  frenId\n  name\n  email\n  image\n}\n\nfragment FrenFollowing_user_2COcfD on Query {\n  me {\n    id\n    followingCount\n    following(first: $followingFirst, after: $followingAfter) {\n      edges {\n        cursor\n        node {\n          id\n          ...FrenFollowingCard_following\n          __typename\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}\n\nfragment FrenPostcard_post on FrenPost {\n  id\n  postId\n  content\n  imageUrl\n  createdAt\n  updatedAt\n  likeCount\n  likedByMe\n}\n\nfragment FrenPosts_user_2fWGjs on Query {\n  me {\n    id\n    postsCount\n    posts(first: $postsFirst, after: $postsAfter) {\n      edges {\n        cursor\n        node {\n          id\n          ...FrenPostcard_post\n          __typename\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "98592733b9e8c15626164de5867f3e1d";

export default node;
