/**
 * @generated SignedSource<<7dde433fbf5875264e77b62d4d743da1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PostDialogsCreateMutation$variables = {
  content: string;
  imageUrl?: string | null | undefined;
};
export type PostDialogsCreateMutation$data = {
  readonly createPost: {
    readonly content: string | null | undefined;
    readonly createdAt: string | null | undefined;
    readonly id: string;
    readonly imageUrl: string | null | undefined;
    readonly likeCount: number | null | undefined;
    readonly likedByMe: boolean | null | undefined;
    readonly postId: string;
  } | null | undefined;
};
export type PostDialogsCreateMutation = {
  response: PostDialogsCreateMutation$data;
  variables: PostDialogsCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "content"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "imageUrl"
  }
],
v1 = [
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
        "name": "imageUrl",
        "variableName": "imageUrl"
      }
    ],
    "concreteType": "FeedPost",
    "kind": "LinkedField",
    "name": "createPost",
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
        "name": "postId",
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
    "name": "PostDialogsCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostDialogsCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b2f048564ac3aca51ee0ca24f1aee5b9",
    "id": null,
    "metadata": {},
    "name": "PostDialogsCreateMutation",
    "operationKind": "mutation",
    "text": "mutation PostDialogsCreateMutation(\n  $content: String!\n  $imageUrl: String\n) {\n  createPost(content: $content, imageUrl: $imageUrl) {\n    id\n    content\n    imageUrl\n    createdAt\n    likeCount\n    likedByMe\n    postId\n  }\n}\n"
  }
};
})();

(node as any).hash = "57f3e6f6e9a87854e4ded6c40a521d04";

export default node;
