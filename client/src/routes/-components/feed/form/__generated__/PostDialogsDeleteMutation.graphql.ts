/**
 * @generated SignedSource<<7dbf930d1fcaa46d0c4653766ad54fee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PostDialogsDeleteMutation$variables = {
  id: string;
};
export type PostDialogsDeleteMutation$data = {
  readonly deletePost: boolean | null | undefined;
};
export type PostDialogsDeleteMutation = {
  response: PostDialogsDeleteMutation$data;
  variables: PostDialogsDeleteMutation$variables;
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
    "name": "PostDialogsDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostDialogsDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "280046d7967ca60e23ac315f8e58fbe7",
    "id": null,
    "metadata": {},
    "name": "PostDialogsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation PostDialogsDeleteMutation(\n  $id: String!\n) {\n  deletePost(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "799c49cc02f70eb8e44fe8a9aeefa648";

export default node;
