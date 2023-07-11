"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorageContainerStateMap = void 0;
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
const useStorageContainerStateMap = (useStorage, nodeIds) => {
    return useStorage(root => {
        return new Map([...root.nodeMap].filter(([nodeId]) => nodeIds ? nodeIds.includes(nodeId) : true)
            .map(([nodeId, node]) => {
            return [nodeId, node.state.containerState];
        }));
    }, (a, b) => (0, lodash_isequal_1.default)(a, b));
};
exports.useStorageContainerStateMap = useStorageContainerStateMap;
