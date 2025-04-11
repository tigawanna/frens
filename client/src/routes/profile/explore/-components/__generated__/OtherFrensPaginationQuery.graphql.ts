/**
 * @generated SignedSource<<a5af0a34aab78c7dccd8bf0580d76a0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OtherFrensPaginationQuery$variables = {
  after?: string | null | undefined;
  first?: number | null | undefined;
  search?: string | null | undefined;
};
export type OtherFrensPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"OtherFrens_frens">;
};
export type OtherFrensPaginationQuery = {
  response: OtherFrensPaginationQuery$data;
  variables: OtherFrensPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = {
  "kind": "Variable",
  "name": "search",
  "variableName": "search"
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "sort",
    "value": {
      "field": "name",
      "order": "asc"
    }
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OtherFrensPaginationQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OtherFrens_frens"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OtherFrensPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "QueryFrensConnection",
        "kind": "LinkedField",
        "name": "frens",
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
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "filters": [
          "sort",
          "search"
        ],
        "handle": "connection",
        "key": "OtherFrens_frens",
        "kind": "LinkedHandle",
        "name": "frens"
      }
    ]
  },
  "params": {
    "cacheID": "68fd10cec2c93577c73969b9419501ca",
    "id": null,
    "metadata": {},
    "name": "OtherFrensPaginationQuery",
    "operationKind": "query",
    "text": "query OtherFrensPaginationQuery(\n  $after: String\n  $first: Int = 10\n  $search: String = \"\"\n) {\n  ...OtherFrens_frens_1Ozsmw\n}\n\nfragment OtherFrenCard_fren on Fren {\n  frenId\n  name\n  email\n  image\n  isMe\n  amFollowing\n  isFollowingMe\n  followerCount\n  followingCount\n}\n\nfragment OtherFrens_frens_1Ozsmw on Query {\n  frens(first: $first, after: $after, sort: {field: \"name\", order: asc}, search: $search) {\n    edges {\n      node {\n        id\n        ...OtherFrenCard_fren\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "71d4cb844a9610335aa8c07163e16f54";

export default node;
