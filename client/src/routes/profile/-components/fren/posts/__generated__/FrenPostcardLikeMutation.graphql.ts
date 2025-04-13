/**
 * @generated SignedSource<<f11ca1ff28194b069b82ace9da89f2b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenPostcardLikeMutation$variables = {
  postId: string;
};
export type FrenPostcardLikeMutation$data = {
  readonly toggleFrenLiked: {
    readonly " $fragmentSpreads": FragmentRefs<"FrenPostcard_post">;
  } | null | undefined;
};
export type FrenPostcardLikeMutation = {
  response: FrenPostcardLikeMutation$data;
  variables: FrenPostcardLikeMutation$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FrenPostcardLikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FrenPost",
        "kind": "LinkedField",
        "name": "toggleFrenLiked",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FrenPostcard_post"
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
    "name": "FrenPostcardLikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FrenPost",
        "kind": "LinkedField",
        "name": "toggleFrenLiked",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c487a4b1da0e40f6edc2db27af7e7fa1",
    "id": null,
    "metadata": {},
    "name": "FrenPostcardLikeMutation",
    "operationKind": "mutation",
    "text": "mutation FrenPostcardLikeMutation(\n  $postId: String!\n) {\n  toggleFrenLiked(postId: $postId) {\n    ...FrenPostcard_post\n    id\n  }\n}\n\nfragment FrenPostcard_post on FrenPost {\n  id\n  postId\n  content\n  imageUrl\n  createdAt\n  updatedAt\n  likeCount\n  likedByMe\n}\n"
  }
};
})();

(node as any).hash = "a14d7c42fb98db7cab670bb750e27062";

export default node;
