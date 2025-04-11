/**
 * @generated SignedSource<<3d8efe8e798cdd8a6def019adf6e302e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenProfileContainerQuery$variables = {
  postsAfter?: string | null | undefined;
  postsFirst?: number | null | undefined;
};
export type FrenProfileContainerQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FrenBasicDetails_user" | "FrenPosts_user">;
};
export type FrenProfileContainerQuery = {
  response: FrenProfileContainerQuery$data;
  variables: FrenProfileContainerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "postsAfter"
},
v1 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "postsFirst"
},
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FrenProfileContainerQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FrenBasicDetails_user"
      },
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "FrenPosts_user"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "FrenProfileContainerQuery",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "image",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "frenId",
            "storageKey": null
          },
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
            "args": (v2/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "FrenPosts_posts",
            "kind": "LinkedHandle",
            "name": "posts"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "716646031be324ee6382ca6e3658dec5",
    "id": null,
    "metadata": {},
    "name": "FrenProfileContainerQuery",
    "operationKind": "query",
    "text": "query FrenProfileContainerQuery(\n  $postsFirst: Int = 5\n  $postsAfter: String\n) {\n  ...FrenBasicDetails_user\n  ...FrenPosts_user_2fWGjs\n}\n\nfragment FrenBasicDetails_user on Query {\n  me {\n    id\n    name\n    email\n    image\n    frenId\n    followerCount\n    followingCount\n  }\n}\n\nfragment FrenPostcard_post on FrenPost {\n  id\n  postId\n  content\n  imageUrl\n  createdAt\n  updatedAt\n  likeCount\n  likedByMe\n}\n\nfragment FrenPosts_user_2fWGjs on Query {\n  me {\n    id\n    postsCount\n    posts(first: $postsFirst, after: $postsAfter) {\n      edges {\n        cursor\n        node {\n          id\n          ...FrenPostcard_post\n          __typename\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b79f8c7fb4bcca03eca472ac459f3818";

export default node;
