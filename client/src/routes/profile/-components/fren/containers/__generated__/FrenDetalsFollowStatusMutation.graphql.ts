/**
 * @generated SignedSource<<501a97b8335507dd56f31e4c706fea16>>
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
  readonly toggleFollow: {
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
        "name": "toggleFollow",
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
    "cacheID": "7791caf517523211e91618addd3a70a6",
    "id": null,
    "metadata": {},
    "name": "FrenDetalsFollowStatusMutation",
    "operationKind": "mutation",
    "text": "mutation FrenDetalsFollowStatusMutation(\n  $input: FollowInput!\n) {\n  toggleFollow(input: $input) {\n    ...FrenBasicDetails_fren\n    id\n  }\n}\n\nfragment FrenBasicDetails_fren on Fren {\n  id\n  name\n  email\n  image\n  frenId\n  followerCount\n  followingCount\n  isFollowingMe\n  amFollowing\n  isMe\n}\n"
  }
};
})();

(node as any).hash = "09f0afd7ed690cac8bf6fc7aa15ef4c2";

export default node;
