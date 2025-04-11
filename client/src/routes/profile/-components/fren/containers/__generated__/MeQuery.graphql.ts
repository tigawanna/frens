/**
 * @generated SignedSource<<0aa630cb2b042b21e3258bf01c4b31c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MeQuery$variables = {
  followersFirst?: number | null | undefined;
  followingFirst?: number | null | undefined;
  postsFirst?: number | null | undefined;
};
export type MeQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"FrenProfileTabsFragment_fren">;
  } | null | undefined;
};
export type MeQuery = {
  response: MeQuery$data;
  variables: MeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": 10,
  "kind": "LocalArgument",
  "name": "followersFirst"
},
v1 = {
  "defaultValue": 10,
  "kind": "LocalArgument",
  "name": "followingFirst"
},
v2 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "postsFirst"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "frenId",
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "postsFirst"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
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
v12 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "followersFirst"
  }
],
v13 = [
  (v9/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Follower",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v7/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v10/*: any*/)
    ],
    "storageKey": null
  }
],
v14 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "followingFirst"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Fren",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "followersFirst",
                "variableName": "followersFirst"
              },
              {
                "kind": "Variable",
                "name": "followingFirst",
                "variableName": "followingFirst"
              },
              {
                "kind": "Variable",
                "name": "postsFirst",
                "variableName": "postsFirst"
              }
            ],
            "kind": "FragmentSpread",
            "name": "FrenProfileTabsFragment_fren"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "MeQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Fren",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
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
            "name": "isMe",
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
            "args": (v8/*: any*/),
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
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FrenPost",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FrenPosts_posts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          {
            "alias": null,
            "args": (v12/*: any*/),
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
                "selections": (v13/*: any*/),
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v12/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FrenFollowers_followers",
            "kind": "LinkedHandle",
            "name": "followers"
          },
          {
            "alias": null,
            "args": (v14/*: any*/),
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
                "selections": (v13/*: any*/),
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v14/*: any*/),
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
    "cacheID": "a1e752ee0a04eccf12a7876cbe00ea2e",
    "id": null,
    "metadata": {},
    "name": "MeQuery",
    "operationKind": "query",
    "text": "query MeQuery(\n  $postsFirst: Int = 5\n  $followersFirst: Int = 10\n  $followingFirst: Int = 10\n) {\n  me {\n    ...FrenProfileTabsFragment_fren_24KkgP\n    id\n  }\n}\n\nfragment FrenBasicDetails_fren on Fren {\n  id\n  name\n  email\n  image\n  frenId\n  followerCount\n  followingCount\n  isMe\n}\n\nfragment FrenFollowerCard_follower on Follower {\n  id\n  frenId\n  name\n  email\n  image\n}\n\nfragment FrenFollowers_fren_4G6HwG on Fren {\n  id\n  followerCount\n  followers(first: $followersFirst) {\n    edges {\n      cursor\n      node {\n        id\n        ...FrenFollowerCard_follower\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment FrenFollowingCard_following on Follower {\n  id\n  frenId\n  name\n  email\n  image\n}\n\nfragment FrenFollowing_fren_4acRjm on Fren {\n  id\n  followingCount\n  following(first: $followingFirst) {\n    edges {\n      cursor\n      node {\n        id\n        ...FrenFollowingCard_following\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment FrenPostcard_post on FrenPost {\n  id\n  postId\n  content\n  imageUrl\n  createdAt\n  updatedAt\n  likeCount\n  likedByMe\n}\n\nfragment FrenPosts_fren_weBIh on Fren {\n  id\n  postsCount\n  posts(first: $postsFirst) {\n    edges {\n      cursor\n      node {\n        id\n        ...FrenPostcard_post\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment FrenProfileTabsFragment_fren_24KkgP on Fren {\n  id\n  ...FrenBasicDetails_fren\n  ...FrenPosts_fren_weBIh\n  ...FrenFollowers_fren_4G6HwG\n  ...FrenFollowing_fren_4acRjm\n}\n"
  }
};
})();

(node as any).hash = "3b8189ce624924cb076e4177018c1faa";

export default node;
