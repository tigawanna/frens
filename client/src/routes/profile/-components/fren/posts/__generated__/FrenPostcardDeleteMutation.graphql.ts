/**
 * @generated SignedSource<<9f148ce09660390fc87966b0b3be5c66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FrenPostcardDeleteMutation$variables = {
  id: string;
};
export type FrenPostcardDeleteMutation$data = {
  readonly deletePost: boolean | null | undefined;
};
export type FrenPostcardDeleteMutation = {
  response: FrenPostcardDeleteMutation$data;
  variables: FrenPostcardDeleteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "deletePost",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FrenPostcardDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FrenPostcardDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "37ff0f64cf69cd313573b74e8921eaf2",
    "id": null,
    "metadata": {},
    "name": "FrenPostcardDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation FrenPostcardDeleteMutation(\n  $id: String!\n) {\n  deletePost(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "664c76a20be885e5b07309df9eb9aea8";

export default node;
