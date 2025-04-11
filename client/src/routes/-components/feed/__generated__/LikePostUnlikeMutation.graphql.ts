/**
 * @generated SignedSource<<32ef43a7e6ca25778c19bff31cfdc60f>>
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
    readonly likeCount: number | null | undefined;
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
    "cacheID": "77bfc84af3495834ffde4d7951d36744",
    "id": null,
    "metadata": {},
    "name": "LikePostUnlikeMutation",
    "operationKind": "mutation",
    "text": "mutation LikePostUnlikeMutation(\n  $postId: String!\n) {\n  unlikePost(postId: $postId) {\n    content\n    createdAt\n    id\n    imageUrl\n    likeCount\n    likedByMe\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "5bf2c7d859b499a6867ea76464e707c5";

export default node;
