"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutationDeleteNode = void 0;
const useMutationDeleteNode = (useMutation) => {
    return useMutation(({ storage }, nodeId) => {
        storage.get("nodeMap").delete(nodeId);
    }, []);
};
exports.useMutationDeleteNode = useMutationDeleteNode;
