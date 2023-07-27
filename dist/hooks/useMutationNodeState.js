"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutationNodeState = void 0;
const useMutationNodeState = (useMutation, nodeId, propKey) => {
    return useMutation(({ storage }, value) => {
        storage.get("nodeMap").get(nodeId).get("state").set(propKey, value);
    }, []);
};
exports.useMutationNodeState = useMutationNodeState;
