"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorageContainerState = void 0;
const useStorageContainerState = (useStorage, nodeId) => useStorage(root => root.nodeMap.get(nodeId)?.state.containerState);
exports.useStorageContainerState = useStorageContainerState;
