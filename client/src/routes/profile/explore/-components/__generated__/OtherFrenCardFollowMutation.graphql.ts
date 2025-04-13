/**
 * @generated SignedSource<<bb9ca5f40002d688cf6798a0adbdf0b1>>
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
export type OtherFrenCardFollowMutation$variables = {
  input: FollowInput;
};
export type OtherFrenCardFollowMutation$data = {
  readonly toggleFollowFren: {
    readonly " $fragmentSpreads": FragmentRefs<"OtherFrenCard_fren">;
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
    "name": "OtherFrenCardFollowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fren",
        "kind": "LinkedField",
        "name": "toggleFollowFren",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OtherFrenCard_fren"
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
    "name": "OtherFrenCardFollowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fren",
        "kind": "LinkedField",
        "name": "toggleFollowFren",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1753d0a356f035560a33038e65049bf5",
    "id": null,
    "metadata": {},
    "name": "OtherFrenCardFollowMutation",
    "operationKind": "mutation",
    "text": "mutation OtherFrenCardFollowMutation(\n  $input: FollowInput!\n) {\n  toggleFollowFren(input: $input) {\n    ...OtherFrenCard_fren\n    id\n  }\n}\n\nfragment OtherFrenCard_fren on Fren {\n  frenId\n  name\n  email\n  image\n  isMe\n  amFollowing\n  isFollowingMe\n  followerCount\n  followingCount\n}\n"
  }
};
})();

(node as any).hash = "cfe9d181899d775a3bf7b31676ab623f";

export default node;
