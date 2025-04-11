/**
 * @generated SignedSource<<8fde363741c8f7fd9f9023e37c600666>>
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
export type OtherFrenCardFollowMutation$variables = {
  input: FollowInput;
};
export type OtherFrenCardFollowMutation$data = {
  readonly toggleFollow: {
    readonly amFollowing: boolean | null | undefined;
    readonly followerCount: number | null | undefined;
    readonly followingCount: number | null | undefined;
    readonly id: string;
    readonly isFollowingMe: boolean | null | undefined;
  } | null | undefined;
};
export type OtherFrenCardFollowMutation = {
  response: OtherFrenCardFollowMutation$data;
  variables: OtherFrenCardFollowMutation$variables;
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
        "name": "amFollowing",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isFollowingMe",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "followerCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "followingCount",
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
    "name": "OtherFrenCardFollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OtherFrenCardFollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8b19c4f41859f0697c6114ac5467132b",
    "id": null,
    "metadata": {},
    "name": "OtherFrenCardFollowMutation",
    "operationKind": "mutation",
    "text": "mutation OtherFrenCardFollowMutation(\n  $input: FollowInput!\n) {\n  toggleFollow(input: $input) {\n    id\n    amFollowing\n    isFollowingMe\n    followerCount\n    followingCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "2a9dec9a341c5c6057f7dde676e5c5c2";

export default node;
