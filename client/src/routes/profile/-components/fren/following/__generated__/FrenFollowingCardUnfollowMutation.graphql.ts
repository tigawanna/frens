/**
 * @generated SignedSource<<3611e970129d7d61aa5cea55a97d617b>>
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
  readonly toggleFollow: {
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
        "name": "toggleFollow",
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
    "cacheID": "ec83ad058f2d7111c37d0668efb0c88e",
    "id": null,
    "metadata": {},
    "name": "FrenFollowingCardUnfollowMutation",
    "operationKind": "mutation",
    "text": "mutation FrenFollowingCardUnfollowMutation(\n  $input: FollowInput!\n) {\n  toggleFollow(input: $input) {\n    ...FrenFollowingCard_following\n    id\n  }\n}\n\nfragment FrenFollowingCard_following on Follower {\n  id\n  frenId\n  name\n  email\n  image\n}\n"
  }
};
})();

(node as any).hash = "4bb9def95c1ed98f37fa3159dbe64496";

export default node;
