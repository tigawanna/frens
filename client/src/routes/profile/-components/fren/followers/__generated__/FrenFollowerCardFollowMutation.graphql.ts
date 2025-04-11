/**
 * @generated SignedSource<<663879bf5fcbb8f3d6a7008f49b31bbd>>
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
  readonly follow: {
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
        "name": "follow",
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
        "name": "follow",
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
    "cacheID": "e500d136ff849ec41aa0144a0d89e020",
    "id": null,
    "metadata": {},
    "name": "FrenFollowerCardFollowMutation",
    "operationKind": "mutation",
    "text": "mutation FrenFollowerCardFollowMutation(\n  $input: FollowInput!\n) {\n  follow(input: $input) {\n    ...FrenFollowerCard_follower\n    id\n  }\n}\n\nfragment FrenFollowerCard_follower on Follower {\n  id\n  frenId\n  name\n  email\n  image\n}\n"
  }
};
})();

(node as any).hash = "621e7d894805e1d9c10372c5620030b2";

export default node;
