/**
 * @generated SignedSource<<a90f34e05e3ac0ac087cc112e9974a71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenProfileContainer_user$data = {
  readonly me: {
    readonly email: string;
    readonly followerCount: number | null | undefined;
    readonly followingCount: number | null | undefined;
    readonly frenId: string;
    readonly id: string;
    readonly image: string | null | undefined;
    readonly name: string;
  } | null | undefined;
  readonly " $fragmentType": "FrenProfileContainer_user";
};
export type FrenProfileContainer_user$key = {
  readonly " $data"?: FrenProfileContainer_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenProfileContainer_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenProfileContainer_user",
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
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "5bc89693c5d79428349e0a4fc76547ae";

export default node;
