/**
 * @generated SignedSource<<8a4418911bbecbe7651f2251efb05b3a>>
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
export type FrenFollowingCardUnfollowMutation$variables = {
  input: FollowInput;
};
export type FrenFollowingCardUnfollowMutation$data = {
  readonly unfollow: {
    readonly " $fragmentSpreads": FragmentRefs<"FrenFollowingCard_following">;
  } | null | undefined;
};
export type FrenFollowingCardUnfollowMutation = {
  response: FrenFollowingCardUnfollowMutation$data;
  variables: FrenFollowingCardUnfollowMutation$variables;
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
    "name": "FrenFollowingCardUnfollowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Follower",
        "kind": "LinkedField",
        "name": "unfollow",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FrenFollowingCard_following"
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
    "name": "FrenFollowingCardUnfollowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Follower",
        "kind": "LinkedField",
        "name": "unfollow",
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
    "cacheID": "4cb34a259e656ce79e1e76c4aa47a1b2",
    "id": null,
    "metadata": {},
    "name": "FrenFollowingCardUnfollowMutation",
    "operationKind": "mutation",
    "text": "mutation FrenFollowingCardUnfollowMutation(\n  $input: FollowInput!\n) {\n  unfollow(input: $input) {\n    ...FrenFollowingCard_following\n    id\n  }\n}\n\nfragment FrenFollowingCard_following on Follower {\n  id\n  frenId\n  name\n  email\n  image\n}\n"
  }
};
})();

(node as any).hash = "f165b42c2796c70541d3ebc79feb3757";

export default node;
