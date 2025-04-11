/**
 * @generated SignedSource<<ac644975c00e9eaec824f98d498611a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenFollowingCard_following$data = {
  readonly email: string;
  readonly frenId: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "FrenFollowingCard_following";
};
export type FrenFollowingCard_following$key = {
  readonly " $data"?: FrenFollowingCard_following$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenFollowingCard_following">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenFollowingCard_following",
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
    }
  ],
  "type": "Follower",
  "abstractKey": null
};

(node as any).hash = "f078b0cb12b591b02fbf99393b27aa63";

export default node;
