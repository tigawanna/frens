/**
 * @generated SignedSource<<3c71626f445222fb5df85abe608b40a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FrenPosts_user$data = {
  readonly me: {
    readonly id: string;
    readonly posts: {
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"FrenPostcard_post">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly pageInfo: {
        readonly endCursor: string | null | undefined;
        readonly hasNextPage: boolean;
      };
    } | null | undefined;
    readonly postsCount: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "FrenPosts_user";
};
export type FrenPosts_user$key = {
  readonly " $data"?: FrenPosts_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"FrenPosts_user">;
};

import FrenPostsPaginationQuery_graphql from './FrenPostsPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "me",
  "posts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": FrenPostsPaginationQuery_graphql
    }
  },
  "name": "FrenPosts_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Fren",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "postsCount",
          "storageKey": null
        },
        {
          "alias": "posts",
          "args": null,
          "concreteType": "FrenPostsConnection",
          "kind": "LinkedField",
          "name": "__FrenPosts_posts_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FrenPostsConnectionEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "cursor",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "FrenPost",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "FrenPostcard_post"
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__typename",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PageInfo",
              "kind": "LinkedField",
              "name": "pageInfo",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hasNextPage",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endCursor",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "91822545ca18b13c1ed737f257600909";

export default node;
