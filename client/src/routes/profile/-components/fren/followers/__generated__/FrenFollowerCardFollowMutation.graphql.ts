/**
 * @generated SignedSource<<5b79ae63ccd3df538b30305924420a33>>
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
export type FrenFollowerCardFollowMutation$variables = {
  input: FollowInput;
};
export type FrenFollowerCardFollowMutation$data = {
  readonly toggleFollow: {
    readonly " $fragmentSpreads": FragmentRefs<"FrenFollowerCard_follower">;
  } | null | undefined;
};
export type FrenFollowerCardFollowMutation = {
  response: FrenFollowerCardFollowMutation$data;
  variables: FrenFollowerCardFollowMutation$variables;
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
    "name": "FrenFollowerCardFollowMutation",
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
            "name": "FrenFollowerCard_follower"
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
    "name": "FrenFollowerCardFollowMutation",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a0fb29e88b575ad610ea0dcc2452da4d",
    "id": null,
    "metadata": {},
    "name": "FrenFollowerCardFollowMutation",
    "operationKind": "mutation",
    "text": "mutation FrenFollowerCardFollowMutation(\n  $input: FollowInput!\n) {\n  toggleFollow(input: $input) {\n    ...FrenFollowerCard_follower\n    id\n  }\n}\n\nfragment FrenFollowerCard_follower on Follower {\n  id\n  frenId\n  name\n  email\n  image\n}\n"
  }
};
})();

(node as any).hash = "1e8670695a80ee07230fd37d512b7072";

export default node;
