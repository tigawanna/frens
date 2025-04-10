/**
 * @generated SignedSource<<56c6e1f17d675200093ba71f5fb55f63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LikePostUnlikeMutation$variables = {
  postId: string;
};
export type LikePostUnlikeMutation$data = {
  readonly unlikePost: {
    readonly content: string | null | undefined;
    readonly createdAt: string | null | undefined;
    readonly id: string;
    readonly imageUrl: string | null | undefined;
    readonly likeCoount: number | null | undefined;
    readonly likedByMe: boolean | null | undefined;
    readonly updatedAt: string | null | undefined;
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
    "name": "unlikePost",
    "plural": false,
    "selections": [
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
        "name": "id",
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
        "name": "likeCoount",
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
    "name": "LikePostUnlikeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LikePostUnlikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "10bc04145bf24b416ddc1137c2fb46e9",
    "id": null,
    "metadata": {},
    "name": "LikePostUnlikeMutation",
    "operationKind": "mutation",
    "text": "mutation LikePostUnlikeMutation(\n  $postId: String!\n) {\n  unlikePost(postId: $postId) {\n    content\n    createdAt\n    id\n    imageUrl\n    likeCoount\n    likedByMe\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd2c1c27b9eeec3660ecd00fcd035820";

export default node;
