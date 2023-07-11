"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorageNodeMap = void 0;
const useStorageNodeMap = (useStorage) => {
    return useStorage(root => root.nodeMap);
};
exports.useStorageNodeMap = useStorageNodeMap;
