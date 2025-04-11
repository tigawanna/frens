/**
 * @generated SignedSource<<6bd67a00e9334b79f8c4fd2ace2ed05a>>
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
  readonly " $fragmentSpreads": FragmentRefs<"Followers_query" | "Following_query">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Followers_query"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Following_query"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "6e9645c8b9f95426b86b586898311a7c";

export default node;
