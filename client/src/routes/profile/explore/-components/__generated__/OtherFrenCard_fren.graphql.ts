/**
 * @generated SignedSource<<29d853dcade04c49545e867c311a85d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OtherFrenCard_fren$data = {
  readonly amFollowing: boolean | null | undefined;
  readonly email: string;
  readonly followerCount: number | null | undefined;
  readonly followingCount: number | null | undefined;
  readonly frenId: string;
  readonly image: string | null | undefined;
  readonly isFollowingMe: boolean | null | undefined;
  readonly isMe: boolean | null | undefined;
  readonly name: string;
  readonly " $fragmentType": "OtherFrenCard_fren";
};
export type OtherFrenCard_fren$key = {
  readonly " $data"?: OtherFrenCard_fren$data;
  readonly " $fragmentSpreads": FragmentRefs<"OtherFrenCard_fren">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OtherFrenCard_fren",
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
  "type": "Fren",
  "abstractKey": null
};

(node as any).hash = "fd3c5e233f62e00ef6fd04d541bcc5a7";

export default node;
