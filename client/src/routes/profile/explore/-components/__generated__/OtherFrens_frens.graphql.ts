/**
 * @generated SignedSource<<368849a286335b9cf598453edbf546b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OtherFrens_frens$data = {
  readonly frens: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"OtherFrenCard_fren">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  } | null | undefined;
  readonly " $fragmentType": "OtherFrens_frens";
};
export type OtherFrens_frens$key = {
  readonly " $data"?: OtherFrens_frens$data;
  readonly " $fragmentSpreads": FragmentRefs<"OtherFrens_frens">;
};

import OtherFrensPaginationQuery_graphql from './OtherFrensPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "frens"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "search"
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
      "operation": OtherFrensPaginationQuery_graphql
    }
  },
  "name": "OtherFrens_frens",
  "selections": [
    {
      "alias": "frens",
      "args": [
        {
          "kind": "Variable",
          "name": "search",
          "variableName": "search"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": {
            "field": "name",
            "order": "asc"
          }
        }
      ],
      "concreteType": "QueryFrensConnection",
      "kind": "LinkedField",
      "name": "__OtherFrens_frens_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "QueryFrensConnectionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Fren",
              "kind": "LinkedField",
              "name": "node",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "OtherFrenCard_fren"
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
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
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "71d4cb844a9610335aa8c07163e16f54";

export default node;
