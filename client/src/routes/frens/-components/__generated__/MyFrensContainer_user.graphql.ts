/**
 * @generated SignedSource<<3ee55176e55fd0f8d09e71dd1bc9bea1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyFrensContainer_user$data = {
  readonly email: string;
  readonly followerCount: number | null | undefined;
  readonly followingCount: number | null | undefined;
  readonly frenId: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "MyFrensContainer_user";
};
export type MyFrensContainer_user$key = {
  readonly " $data"?: MyFrensContainer_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyFrensContainer_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyFrensContainer_user",
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
  "type": "Fren",
  "abstractKey": null
};

(node as any).hash = "611c821e2b558ca23bb175f737431245";

export default node;
