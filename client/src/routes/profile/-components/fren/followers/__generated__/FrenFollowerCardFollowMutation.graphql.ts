/**
 * @generated SignedSource<<43dac8bbeeea9302bc577c6d3f6cb299>>
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
export type FrenFollowerCardFollowMutation$variables = {
  input: FollowInput;
};
export type FrenFollowerCardFollowMutation$data = {
  readonly follow: {
    readonly amFollowing: boolean | null | undefined;
    readonly id: string;
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
    "name": "FrenFollowerCardFollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FrenFollowerCardFollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "62f5c398c3230bd818d2d19da6af0f7e",
    "id": null,
    "metadata": {},
    "name": "FrenFollowerCardFollowMutation",
    "operationKind": "mutation",
    "text": "mutation FrenFollowerCardFollowMutation(\n  $input: FollowInput!\n) {\n  follow(input: $input) {\n    id\n    amFollowing\n  }\n}\n"
  }
};
})();

(node as any).hash = "26abde7e8ea8af79b4cec8accddd2291";

export default node;
