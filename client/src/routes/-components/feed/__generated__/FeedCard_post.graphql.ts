/**
 * @generated SignedSource<<8564a3cea545600badccffb2618c36b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeedCard_post$data = {
  readonly content: string | null | undefined;
  readonly createdAt: string | null | undefined;
  readonly id: string;
  readonly imageUrl: string | null | undefined;
  readonly likeCount: number | null | undefined;
  readonly likedByMe: boolean | null | undefined;
  readonly postId: string;
  readonly postedBy: {
    readonly amFollowing: boolean | null | undefined;
    readonly email: string;
    readonly frenId: string;
    readonly image: string | null | undefined;
    readonly name: string;
  } | null | undefined;
  readonly updatedAt: string | null | undefined;
  readonly " $fragmentType": "FeedCard_post";
};
export type FeedCard_post$key = {
  readonly " $data"?: FeedCard_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeedCard_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeedCard_post",
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
      "name": "imageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "postId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
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
      "name": "likeCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "likedByMe",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Fren",
      "kind": "LinkedField",
      "name": "postedBy",
      "plural": false,
      "selections": [
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
          "name": "amFollowing",
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
      "storageKey": null
    }
  ],
  "type": "FeedPost",
  "abstractKey": null
};

(node as any).hash = "5d4b6325c1faecd619800ef336fdc160";

export default node;
