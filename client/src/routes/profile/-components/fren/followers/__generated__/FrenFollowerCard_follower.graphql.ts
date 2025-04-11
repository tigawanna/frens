/**
 * @generated SignedSource<<9a6347d0cb687c7eb465fb5d724d21ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenFollowerCard_follower$data = {
  readonly email: string;
  readonly frenId: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "FrenFollowerCard_follower";
};
export type FrenFollowerCard_follower$key = {
  readonly " $data"?: FrenFollowerCard_follower$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenFollowerCard_follower">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenFollowerCard_follower",
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

(node as any).hash = "e4a452459ffe0fb5c434a8d56bc7e082";

export default node;
