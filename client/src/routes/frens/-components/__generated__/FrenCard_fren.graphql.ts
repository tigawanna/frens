/**
 * @generated SignedSource<<c5cd616115993a9a30fefe2bca741ac1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenCard_fren$data = {
  readonly amFollowing: boolean | null | undefined;
  readonly createdAt: string | null | undefined;
  readonly email: string;
  readonly followerCount: number | null | undefined;
  readonly followingCount: number | null | undefined;
  readonly frenId: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly isFollowingMe: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "FrenCard_fren";
};
export type FrenCard_fren$key = {
  readonly " $data"?: FrenCard_fren$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenCard_fren">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenCard_fren",
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
      "name": "createdAt",
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
      "name": "amFollowing",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowingMe",
      "storageKey": null
    }
  ],
  "type": "Fren",
  "abstractKey": null
};

(node as any).hash = "335921af71e7f7ca23b6f187d93a1f8a";

export default node;
