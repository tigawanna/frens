/**
 * @generated SignedSource<<dd76e34c827497dd485ca6b4cf0f3d13>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyFrensContainer_user$data = {
  readonly me: {
    readonly email: string;
    readonly followerCount: number | null | undefined;
    readonly followingCount: number | null | undefined;
    readonly frenId: string;
    readonly id: string;
    readonly image: string | null | undefined;
    readonly name: string;
  } | null | undefined;
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

(node as any).hash = "2ff14693c7cf60f9d8e24d252d2a6d45";

export default node;
