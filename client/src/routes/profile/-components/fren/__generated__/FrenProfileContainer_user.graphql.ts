/**
 * @generated SignedSource<<c99827c699c292423b6936971f139617>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenProfileContainer_user$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FrenBasicDetails_user">;
  readonly " $fragmentType": "FrenProfileContainer_user";
};
export type FrenProfileContainer_user$key = {
  readonly " $data"?: FrenProfileContainer_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenProfileContainer_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FrenProfileContainer_user",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FrenBasicDetails_user"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "bb5edb725fa146bd05a0efc28628aee8";

export default node;
