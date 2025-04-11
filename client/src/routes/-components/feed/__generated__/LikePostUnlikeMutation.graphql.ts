/**
 * @generated SignedSource<<ceed7c57d9bd83f5aa9b1e365c59d556>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LikePostUnlikeMutation$variables = {
  postId: string;
};
export type LikePostUnlikeMutation$data = {
  readonly unlikePost: {
    readonly " $fragmentSpreads": FragmentRefs<"FeedCard_post">;
  } | null | undefined;
};
export type LikePostUnlikeMutation = {
  response: LikePostUnlikeMutation$data;
  variables: LikePostUnlikeMutation$variables;
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
    "name": "LikePostUnlikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FeedPost",
        "kind": "LinkedField",
        "name": "unlikePost",
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
    "name": "LikePostUnlikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FeedPost",
        "kind": "LinkedField",
        "name": "unlikePost",
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
    "cacheID": "8c5c58557aa932378cf3d8c9f3295ce3",
    "id": null,
    "metadata": {},
    "name": "LikePostUnlikeMutation",
    "operationKind": "mutation",
    "text": "mutation LikePostUnlikeMutation(\n  $postId: String!\n) {\n  unlikePost(postId: $postId) {\n    ...FeedCard_post\n    id\n  }\n}\n\nfragment FeedCard_post on FeedPost {\n  id\n  imageUrl\n  postId\n  content\n  createdAt\n  likeCount\n  likedByMe\n  updatedAt\n  postedBy {\n    frenId\n    name\n    email\n    amFollowing\n    image\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5843fdd49001f1d1ce2255c3e03c641e";

export default node;
