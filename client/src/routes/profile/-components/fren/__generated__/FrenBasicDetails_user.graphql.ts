/**
 * @generated SignedSource<<2452293c4cd0b3e3cb97bdd1242f51b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenBasicDetails_user$data = {
  readonly me: {
    readonly email: string;
    readonly followerCount: number | null | undefined;
    readonly followingCount: number | null | undefined;
    readonly frenId: string;
    readonly id: string;
    readonly image: string | null | undefined;
    readonly name: string;
  } | null | undefined;
  readonly " $fragmentType": "FrenBasicDetails_user";
};
export type FrenBasicDetails_user$key = {
  readonly " $data"?: FrenBasicDetails_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenBasicDetails_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenBasicDetails_user",
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

(node as any).hash = "cb87ddc1a6298b879be4accb61b60ff6";

export default node;
