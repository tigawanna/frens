/**
 * @generated SignedSource<<4d67b878a78088ead71803d652cfb024>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LikePostLikeMutation$variables = {
  postId: string;
};
export type LikePostLikeMutation$data = {
  readonly likePost: {
    readonly content: string | null | undefined;
    readonly createdAt: string | null | undefined;
    readonly id: string;
    readonly imageUrl: string | null | undefined;
    readonly likeCount: number | null | undefined;
    readonly likedByMe: boolean | null | undefined;
    readonly updatedAt: string | null | undefined;
  } | null | undefined;
};
export type LikePostLikeMutation = {
  response: LikePostLikeMutation$data;
  variables: LikePostLikeMutation$variables;
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
    "name": "likePost",
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
    "name": "LikePostLikeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LikePostLikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a1195019780460d8010bf4e834a05612",
    "id": null,
    "metadata": {},
    "name": "LikePostLikeMutation",
    "operationKind": "mutation",
    "text": "mutation LikePostLikeMutation(\n  $postId: String!\n) {\n  likePost(postId: $postId) {\n    content\n    createdAt\n    id\n    imageUrl\n    likeCount\n    likedByMe\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "7935a10f5c46203530a1744cf2db4f67";

export default node;
