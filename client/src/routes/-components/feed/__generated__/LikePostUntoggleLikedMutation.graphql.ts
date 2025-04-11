/**
 * @generated SignedSource<<ad7cf12bc7fa70e222167dcc00509477>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LikePostUntoggleLikedMutation$variables = {
  postId: string;
};
export type LikePostUntoggleLikedMutation$data = {
  readonly toggleLiked: {
    readonly " $fragmentSpreads": FragmentRefs<"FeedCard_post">;
  } | null | undefined;
};
export type LikePostUntoggleLikedMutation = {
  response: LikePostUntoggleLikedMutation$data;
  variables: LikePostUntoggleLikedMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "postId",
    "variableName": "postId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LikePostUntoggleLikedMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FeedPost",
        "kind": "LinkedField",
        "name": "toggleLiked",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FeedCard_post"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LikePostUntoggleLikedMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FeedPost",
        "kind": "LinkedField",
        "name": "toggleLiked",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "createdAt",
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
            "name": "updatedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Fren",
            "kind": "LinkedField",
            "name": "postedBy",
            "plural": false,
            "selections": [
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
                "name": "amFollowing",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "image",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2237c039c45dae1ada12ec3940a07a52",
    "id": null,
    "metadata": {},
    "name": "LikePostUntoggleLikedMutation",
    "operationKind": "mutation",
    "text": "mutation LikePostUntoggleLikedMutation(\n  $postId: String!\n) {\n  toggleLiked(postId: $postId) {\n    ...FeedCard_post\n    id\n  }\n}\n\nfragment FeedCard_post on FeedPost {\n  id\n  imageUrl\n  postId\n  content\n  createdAt\n  likeCount\n  likedByMe\n  updatedAt\n  postedBy {\n    frenId\n    name\n    email\n    amFollowing\n    image\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "cecbdfee588992204f3cd1e4fa512c45";

export default node;
