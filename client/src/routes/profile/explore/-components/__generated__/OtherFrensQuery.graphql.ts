/**
 * @generated SignedSource<<208e1d053d295d8da6f0d1d526d4ea9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OtherFrensQuery$variables = {
  frensFirst?: number | null | undefined;
  searchText?: string | null | undefined;
};
export type OtherFrensQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"OtherFrens_frens">;
};
export type OtherFrensQuery = {
  response: OtherFrensQuery$data;
  variables: OtherFrensQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 30,
    "kind": "LocalArgument",
    "name": "frensFirst"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchText"
  }
],
v1 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "frensFirst"
},
v2 = {
  "kind": "Variable",
  "name": "search",
  "variableName": "searchText"
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
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
    "name": "OtherFrensQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/)
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
    "name": "OtherFrensQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
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
                "name": "endCursor",
                "storageKey": null
              },
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
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
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
        "args": (v3/*: any*/),
        "filters": [
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
    "cacheID": "e138f3b2782642f4622542a129793434",
    "id": null,
    "metadata": {},
    "name": "OtherFrensQuery",
    "operationKind": "query",
    "text": "query OtherFrensQuery(\n  $frensFirst: Int = 30\n  $searchText: String\n) {\n  ...OtherFrens_frens_ze2zB\n}\n\nfragment OtherFrenCard_fren on Fren {\n  frenId\n  name\n  email\n  image\n  isMe\n  amFollowing\n  isFollowingMe\n  followerCount\n  followingCount\n}\n\nfragment OtherFrens_frens_ze2zB on Query {\n  frens(first: $frensFirst, sort: {field: \"name\", order: asc}, search: $searchText) {\n    edges {\n      cursor\n      node {\n        id\n        ...OtherFrenCard_fren\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c953ee002f7aa332d665ffd05c31affb";

export default node;
