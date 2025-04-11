/**
 * @generated SignedSource<<6552e33704a3df6619bbefea91bff560>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenProfileContainerQuery$variables = Record<PropertyKey, never>;
export type FrenProfileContainerQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FrenBasicDetails_user">;
};
export type FrenProfileContainerQuery = {
  response: FrenProfileContainerQuery$data;
  variables: FrenProfileContainerQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FrenProfileContainerQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FrenBasicDetails_user"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FrenProfileContainerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Fren",
        "kind": "LinkedField",
        "name": "me",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "35448b32147c5ada9dc87cac8c52e036",
    "id": null,
    "metadata": {},
    "name": "FrenProfileContainerQuery",
    "operationKind": "query",
    "text": "query FrenProfileContainerQuery {\n  ...FrenBasicDetails_user\n}\n\nfragment FrenBasicDetails_user on Query {\n  me {\n    id\n    name\n    email\n    image\n    frenId\n    followerCount\n    followingCount\n  }\n}\n"
  }
};

(node as any).hash = "29422a58459bf14e833b7bcfed172c2c";

export default node;
