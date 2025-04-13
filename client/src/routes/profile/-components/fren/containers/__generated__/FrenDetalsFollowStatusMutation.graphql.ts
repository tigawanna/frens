/**
 * @generated SignedSource<<13aa8a753cdeaa417ad410a971c4cd8c>>
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
export type FrenDetalsFollowStatusMutation$variables = {
  input: FollowInput;
};
export type FrenDetalsFollowStatusMutation$data = {
  readonly toggleFollowFren: {
    readonly " $fragmentSpreads": FragmentRefs<"FrenBasicDetails_fren">;
  } | null | undefined;
};
export type FrenDetalsFollowStatusMutation = {
  response: FrenDetalsFollowStatusMutation$data;
  variables: FrenDetalsFollowStatusMutation$variables;
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
    "name": "FrenDetalsFollowStatusMutation",
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
            "name": "FrenBasicDetails_fren"
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
    "name": "FrenDetalsFollowStatusMutation",
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
            "name": "id",
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
            "name": "frenId",
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
            "name": "isFollowingMe",
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
            "name": "isMe",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "af2c6213b568edc86620acb004d3e226",
    "id": null,
    "metadata": {},
    "name": "FrenDetalsFollowStatusMutation",
    "operationKind": "mutation",
    "text": "mutation FrenDetalsFollowStatusMutation(\n  $input: FollowInput!\n) {\n  toggleFollowFren(input: $input) {\n    ...FrenBasicDetails_fren\n    id\n  }\n}\n\nfragment FrenBasicDetails_fren on Fren {\n  id\n  name\n  email\n  image\n  frenId\n  followerCount\n  followingCount\n  isFollowingMe\n  amFollowing\n  isMe\n}\n"
  }
};
})();

(node as any).hash = "268c57ef6a4b3ab658cbc420e50c24ba";

export default node;
