/**
 * @generated SignedSource<<e5198a1b384817e7110f81648c2e7eed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FollowInput = {
  userId: string;
};
export type FrenFollowingCardUnfollowMutation$variables = {
  input: FollowInput;
};
export type FrenFollowingCardUnfollowMutation$data = {
  readonly unfollow: {
    readonly amFollowing: boolean | null | undefined;
    readonly id: string;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Fren",
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
        "name": "amFollowing",
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
    "name": "FrenFollowingCardUnfollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FrenFollowingCardUnfollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bdb5ab48b746ad5f2448e60533daf325",
    "id": null,
    "metadata": {},
    "name": "FrenFollowingCardUnfollowMutation",
    "operationKind": "mutation",
    "text": "mutation FrenFollowingCardUnfollowMutation(\n  $input: FollowInput!\n) {\n  unfollow(input: $input) {\n    id\n    amFollowing\n  }\n}\n"
  }
};
})();

(node as any).hash = "7a219040d1522112718a858dcfc9a645";

export default node;
