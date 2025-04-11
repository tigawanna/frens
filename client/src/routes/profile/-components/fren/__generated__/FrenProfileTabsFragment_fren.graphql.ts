/**
 * @generated SignedSource<<73c841391a5a3a58e104f49e13c4b6c1>>
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
  readonly " $fragmentType": "FrenProfileTabsFragment_fren";
};
export type FrenProfileTabsFragment_fren$key = {
  readonly " $data"?: FrenProfileTabsFragment_fren$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenProfileTabsFragment_fren">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
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
    }
  ],
  "type": "Fren",
  "abstractKey": null
};

(node as any).hash = "1a5086f2f4de42fc0e4956c8438c5ee6";

export default node;
