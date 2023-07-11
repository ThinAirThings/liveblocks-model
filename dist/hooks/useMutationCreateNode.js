"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutationCreateNode = void 0;
const __1 = require("..");
const useMutationCreateNode = (useMutation) => {
    return useMutation(({ storage }, { type, state }) => {
        const node = (0, __1.createAirNode)({ type, state });
        const nodeId = node.get("nodeId");
        storage.get("nodeMap").set(nodeId, node);
        return nodeId;
    }, []);
};
exports.useMutationCreateNode = useMutationCreateNode;
