/**
 * @generated SignedSource<<e7ae8dc351cfae795635edfdc5ef20e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostDialogsCreateMutation$variables = {
  content: string;
  imageUrl?: string | null | undefined;
};
export type PostDialogsCreateMutation$data = {
  readonly createPost: {
    readonly " $fragmentSpreads": FragmentRefs<"FeedCard_post">;
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
    "name": "PostDialogsCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FeedPost",
        "kind": "LinkedField",
        "name": "createPost",
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
    "name": "PostDialogsCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FeedPost",
        "kind": "LinkedField",
        "name": "createPost",
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
    "cacheID": "699f8582a44e00e33639a10ad8616967",
    "id": null,
    "metadata": {},
    "name": "PostDialogsCreateMutation",
    "operationKind": "mutation",
    "text": "mutation PostDialogsCreateMutation(\n  $content: String!\n  $imageUrl: String\n) {\n  createPost(content: $content, imageUrl: $imageUrl) {\n    ...FeedCard_post\n    id\n  }\n}\n\nfragment FeedCard_post on FeedPost {\n  id\n  imageUrl\n  postId\n  content\n  createdAt\n  likeCount\n  likedByMe\n  updatedAt\n  postedBy {\n    frenId\n    name\n    email\n    amFollowing\n    image\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d633ea46b89f83b05c3a7aec5f0220e9";

export default node;
