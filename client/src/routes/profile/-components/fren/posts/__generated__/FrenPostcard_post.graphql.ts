/**
 * @generated SignedSource<<47405e9a72c2a7bb3bb7b36691344be8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenPostcard_post$data = {
  readonly content: string | null | undefined;
  readonly createdAt: string | null | undefined;
  readonly id: string;
  readonly imageUrl: string | null | undefined;
  readonly likeCount: number | null | undefined;
  readonly likedByMe: boolean | null | undefined;
  readonly postId: string;
  readonly updatedAt: string | null | undefined;
  readonly " $fragmentType": "FrenPostcard_post";
};
export type FrenPostcard_post$key = {
  readonly " $data"?: FrenPostcard_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenPostcard_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenPostcard_post",
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
      "name": "imageUrl",
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
      "name": "updatedAt",
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
    }
  ],
  "type": "FrenPost",
  "abstractKey": null
};

(node as any).hash = "a08ff353ace81cf2354e139784c398e6";

export default node;
