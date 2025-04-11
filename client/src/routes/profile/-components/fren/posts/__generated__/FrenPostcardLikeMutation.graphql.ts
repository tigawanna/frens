/**
 * @generated SignedSource<<39d6445c15cf8eb5706539e42dd26992>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FrenPostcardLikeMutation$variables = {
  postId: string;
};
export type FrenPostcardLikeMutation$data = {
  readonly toggleLiked: {
    readonly id: string;
    readonly likeCount: number | null | undefined;
    readonly likedByMe: boolean | null | undefined;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "postId",
        "variableName": "postId"
      }
    ],
    "concreteType": "FeedPost",
    "kind": "LinkedField",
    "name": "toggleLiked",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FrenPostcardLikeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FrenPostcardLikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4f950c06273789882ccb7a74d58517e5",
    "id": null,
    "metadata": {},
    "name": "FrenPostcardLikeMutation",
    "operationKind": "mutation",
    "text": "mutation FrenPostcardLikeMutation(\n  $postId: String!\n) {\n  toggleLiked(postId: $postId) {\n    id\n    likeCount\n    likedByMe\n  }\n}\n"
  }
};
})();

(node as any).hash = "64be8917a191aa14dad2996becc95360";

export default node;
