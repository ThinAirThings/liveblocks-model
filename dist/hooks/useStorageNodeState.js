"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorageNodeState = void 0;
const useStorageNodeState = (useStorage, nodeId, propKey) => {
    return useStorage(root => {
        return root.nodeMap.get(nodeId)?.state[propKey];
    });
};
exports.useStorageNodeState = useStorageNodeState;
