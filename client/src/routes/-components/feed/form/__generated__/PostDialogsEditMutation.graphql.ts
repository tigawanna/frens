/**
 * @generated SignedSource<<9d0bf3f33b87428d5c11a38c15803326>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PostDialogsEditMutation$variables = {
  content?: string | null | undefined;
  id: string;
  imageUrl?: string | null | undefined;
};
export type PostDialogsEditMutation$data = {
  readonly updatePost: {
    readonly content: string | null | undefined;
    readonly id: string;
    readonly imageUrl: string | null | undefined;
    readonly likeCount: number | null | undefined;
    readonly likedByMe: boolean | null | undefined;
    readonly postId: string;
    readonly updatedAt: string | null | undefined;
  } | null | undefined;
};
export type PostDialogsEditMutation = {
  response: PostDialogsEditMutation$data;
  variables: PostDialogsEditMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "content"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "imageUrl"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "content",
        "variableName": "content"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "imageUrl",
        "variableName": "imageUrl"
      }
    ],
    "concreteType": "FeedPost",
    "kind": "LinkedField",
    "name": "updatePost",
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
        "name": "postId",
        "storageKey": null
      }
    ],
    "storageKey": null
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
    "name": "PostDialogsEditMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "PostDialogsEditMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "3f5cc81bcb1849ecc97c34cd7c402502",
    "id": null,
    "metadata": {},
    "name": "PostDialogsEditMutation",
    "operationKind": "mutation",
    "text": "mutation PostDialogsEditMutation(\n  $id: String!\n  $content: String\n  $imageUrl: String\n) {\n  updatePost(id: $id, content: $content, imageUrl: $imageUrl) {\n    id\n    content\n    imageUrl\n    updatedAt\n    likeCount\n    likedByMe\n    postId\n  }\n}\n"
  }
};
})();

(node as any).hash = "427139894992890e5bfe14028417b5b0";

export default node;
