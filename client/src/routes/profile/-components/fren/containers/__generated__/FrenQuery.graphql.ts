/**
 * @generated SignedSource<<102904e5ecef1fd6547eb10df89cece1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenQuery$variables = {
  followersFirst?: number | null | undefined;
  followingFirst?: number | null | undefined;
  frenId: string;
  postsFirst?: number | null | undefined;
};
export type FrenQuery$data = {
  readonly fren: {
    readonly " $fragmentSpreads": FragmentRefs<"FrenProfileTabsFragment_fren">;
  } | null | undefined;
};
export type FrenQuery = {
  response: FrenQuery$data;
  variables: FrenQuery$variables;
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
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "frenId"
},
v3 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "postsFirst"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "frenId"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "frenId",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowingMe",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amFollowing",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMe",
  "storageKey": null
},
v13 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "postsFirst"
  }
],
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
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    (v16/*: any*/),
    (v17/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPreviousPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v19 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "followersFirst"
  }
],
v20 = [
  (v14/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Follower",
    "kind": "LinkedField",
    "name": "node",
    "plural": false,
    "selections": [
      (v5/*: any*/),
      (v9/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v12/*: any*/),
      (v11/*: any*/),
      (v10/*: any*/),
      (v15/*: any*/)
    ],
    "storageKey": null
  }
],
v21 = [
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
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FrenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Fren",
        "kind": "LinkedField",
        "name": "fren",
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
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "FrenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Fren",
        "kind": "LinkedField",
        "name": "fren",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
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
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "postsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v13/*: any*/),
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
                      (v5/*: any*/),
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
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v13/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FrenPosts_posts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          {
            "alias": null,
            "args": (v19/*: any*/),
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
                "selections": (v20/*: any*/),
                "storageKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v19/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FrenFollowers_followers",
            "kind": "LinkedHandle",
            "name": "followers"
          },
          {
            "alias": null,
            "args": (v21/*: any*/),
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
                "selections": (v20/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  (v17/*: any*/),
                  (v16/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v21/*: any*/),
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
    "cacheID": "6c939250a2a2187928374b8ddb9a3048",
    "id": null,
    "metadata": {},
    "name": "FrenQuery",
    "operationKind": "query",
    "text": "query FrenQuery(\n  $frenId: String!\n  $postsFirst: Int = 5\n  $followersFirst: Int = 10\n  $followingFirst: Int = 10\n) {\n  fren(id: $frenId) {\n    ...FrenProfileTabsFragment_fren_24KkgP\n    id\n  }\n}\n\nfragment FellowFrenCard_following on Follower {\n  id\n  frenId\n  name\n  email\n  image\n  isMe\n  amFollowing\n  isFollowingMe\n}\n\nfragment FrenBasicDetails_fren on Fren {\n  id\n  name\n  email\n  image\n  frenId\n  followerCount\n  followingCount\n  isFollowingMe\n  amFollowing\n  isMe\n}\n\nfragment FrenFollowers_fren_4G6HwG on Fren {\n  id\n  followerCount\n  followers(first: $followersFirst) {\n    edges {\n      cursor\n      node {\n        id\n        ...FellowFrenCard_following\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment FrenFollowing_fren_4acRjm on Fren {\n  id\n  followingCount\n  following(first: $followingFirst) {\n    edges {\n      cursor\n      node {\n        id\n        ...FellowFrenCard_following\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment FrenPostcard_post on FrenPost {\n  id\n  postId\n  content\n  imageUrl\n  createdAt\n  updatedAt\n  likeCount\n  likedByMe\n}\n\nfragment FrenPosts_fren_weBIh on Fren {\n  id\n  postsCount\n  posts(first: $postsFirst) {\n    edges {\n      cursor\n      node {\n        id\n        ...FrenPostcard_post\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment FrenProfileTabsFragment_fren_24KkgP on Fren {\n  id\n  ...FrenBasicDetails_fren\n  ...FrenPosts_fren_weBIh\n  ...FrenFollowers_fren_4G6HwG\n  ...FrenFollowing_fren_4acRjm\n}\n"
  }
};
})();

(node as any).hash = "85eda58e6fb7cf92abc8dd889d0ffb5a";

export default node;
