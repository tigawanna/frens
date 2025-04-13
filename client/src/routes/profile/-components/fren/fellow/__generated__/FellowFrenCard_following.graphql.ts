/**
 * @generated SignedSource<<2bfb8d8333eaf7b1ff466decd59e06d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FellowFrenCard_following$data = {
  readonly amFollowing: boolean | null | undefined;
  readonly email: string;
  readonly frenId: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly isFollowingMe: boolean | null | undefined;
  readonly isMe: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "FellowFrenCard_following";
};
export type FellowFrenCard_following$key = {
  readonly " $data"?: FellowFrenCard_following$data;
  readonly " $fragmentSpreads": FragmentRefs<"FellowFrenCard_following">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FellowFrenCard_following",
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
      "name": "image",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isMe",
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
      "name": "isFollowingMe",
      "storageKey": null
    }
  ],
  "type": "Follower",
  "abstractKey": null
};

(node as any).hash = "7bee1a02a180a213cb45329f12446220";

export default node;
