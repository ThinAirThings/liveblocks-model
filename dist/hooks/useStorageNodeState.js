"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorageNodeState = void 0;
const useStorageNodeState = (useStorage, nodeId, key) => {
    return useStorage(root => {
        return root.nodeMap.get(nodeId)?.state[key];
    });
};
exports.useStorageNodeState = useStorageNodeState;
