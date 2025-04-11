/**
 * @generated SignedSource<<64f1c50b0367b9528ed12facb84da4e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenBasicDetails_fren$data = {
  readonly email: string;
  readonly followerCount: number | null | undefined;
  readonly followingCount: number | null | undefined;
  readonly frenId: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly isMe: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "FrenBasicDetails_fren";
};
export type FrenBasicDetails_fren$key = {
  readonly " $data"?: FrenBasicDetails_fren$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenBasicDetails_fren">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenBasicDetails_fren",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isMe",
      "storageKey": null
    }
  ],
  "type": "Fren",
  "abstractKey": null
};

(node as any).hash = "de6b490369344ece3533ac200bde76f6";

export default node;
