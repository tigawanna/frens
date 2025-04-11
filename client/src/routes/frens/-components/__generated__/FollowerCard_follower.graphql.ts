/**
 * @generated SignedSource<<94e3d199f1fac09cb3c9976d2007b6b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowerCard_follower$data = {
  readonly createdAt: string | null | undefined;
  readonly email: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly name: string;
  readonly role: string | null | undefined;
  readonly " $fragmentType": "FollowerCard_follower";
};
export type FollowerCard_follower$key = {
  readonly " $data"?: FollowerCard_follower$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowerCard_follower">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowerCard_follower",
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
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "role",
      "storageKey": null
    }
  ],
  "type": "Follower",
  "abstractKey": null
};

(node as any).hash = "74bf3c000e024ec228ab60291904782f";

export default node;
