/**
 * @generated SignedSource<<a088741590589f1400db5882b50122f5>>
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
  readonly " $fragmentSpreads": FragmentRefs<"FrenProfileContainer_user">;
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
        "name": "FrenProfileContainer_user"
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
    "cacheID": "a1178627d4113b54ad8c144517a63ec9",
    "id": null,
    "metadata": {},
    "name": "FrenProfileContainerQuery",
    "operationKind": "query",
    "text": "query FrenProfileContainerQuery {\n  ...FrenProfileContainer_user\n}\n\nfragment FrenBasicDetails_user on Query {\n  me {\n    id\n    name\n    email\n    image\n    frenId\n    followerCount\n    followingCount\n  }\n}\n\nfragment FrenProfileContainer_user on Query {\n  me {\n    id\n  }\n  ...FrenBasicDetails_user\n}\n"
  }
};

(node as any).hash = "e38be65fe00b574bdaebebb58691321d";

export default node;
