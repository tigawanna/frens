/**
 * @generated SignedSource<<ef119e8b74042d11cd6f0e3bbbbb08a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenProfileTabsFragment_fren$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"FrenBasicDetails_fren" | "FrenFollowers_fren" | "FrenFollowing_fren" | "FrenPosts_fren">;
  readonly " $fragmentType": "FrenProfileTabsFragment_fren";
};
export type FrenProfileTabsFragment_fren$key = {
  readonly " $data"?: FrenProfileTabsFragment_fren$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenProfileTabsFragment_fren">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "followersAfter"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "followersFirst"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "followingAfter"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "followingFirst"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "postsAfter"
    },
    {
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "postsFirst"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenProfileTabsFragment_fren",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FrenBasicDetails_fren"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "postsAfter"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "postsFirst"
        }
      ],
      "kind": "FragmentSpread",
      "name": "FrenPosts_fren"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "followersAfter"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "followersFirst"
        }
      ],
      "kind": "FragmentSpread",
      "name": "FrenFollowers_fren"
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "followingAfter"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "followingFirst"
        }
      ],
      "kind": "FragmentSpread",
      "name": "FrenFollowing_fren"
    }
  ],
  "type": "Fren",
  "abstractKey": null
};

(node as any).hash = "0a7288e484341e4f2ce79c2201a4bfd6";

export default node;
