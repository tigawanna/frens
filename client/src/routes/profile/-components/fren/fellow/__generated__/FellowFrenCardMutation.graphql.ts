/**
 * @generated SignedSource<<ce72fbc9b10ba8f26225436f85b00d99>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowInput = {
  userId: string;
};
export type FellowFrenCardMutation$variables = {
  input: FollowInput;
};
export type FellowFrenCardMutation$data = {
  readonly toggleFollow: {
    readonly " $fragmentSpreads": FragmentRefs<"FellowFrenCard_following">;
  } | null | undefined;
};
export type FellowFrenCardMutation = {
  response: FellowFrenCardMutation$data;
  variables: FellowFrenCardMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FellowFrenCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Follower",
        "kind": "LinkedField",
        "name": "toggleFollow",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FellowFrenCard_following"
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
    "name": "FellowFrenCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Follower",
        "kind": "LinkedField",
        "name": "toggleFollow",
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
            "name": "image",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isMe",
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
            "name": "isFollowingMe",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fb00f3e6717a1226f572378bc3838363",
    "id": null,
    "metadata": {},
    "name": "FellowFrenCardMutation",
    "operationKind": "mutation",
    "text": "mutation FellowFrenCardMutation(\n  $input: FollowInput!\n) {\n  toggleFollow(input: $input) {\n    ...FellowFrenCard_following\n    id\n  }\n}\n\nfragment FellowFrenCard_following on Follower {\n  id\n  frenId\n  name\n  email\n  image\n  isMe\n  amFollowing\n  isFollowingMe\n}\n"
  }
};
})();

(node as any).hash = "5ec3a5beb86b041c2f62b6bf222d2923";

export default node;
