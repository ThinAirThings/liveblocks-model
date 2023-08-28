"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAirNode = exports.NodeDataTypeIndex = void 0;
const client_1 = require("@liveblocks/client");
const uuid_1 = require("uuid");
exports.NodeDataTypeIndex = {
    "rootThought": {
        renderer: 'dom',
        key: 'rootThought',
        defaultProps: {
            rawPrompt: ''
        },
        defaultBoxSize: {
            width: 400,
            height: 400
        }
    },
};
function createAirNode({ key, state }) {
    return new client_1.LiveObject({
        nodeId: (0, uuid_1.v4)(),
        key: exports.NodeDataTypeIndex[key].key,
        renderer: exports.NodeDataTypeIndex[key].renderer,
        state: new client_1.LiveObject({
            ...state,
            containerState: new client_1.LiveObject(state.containerState)
        }),
    });
}
exports.createAirNode = createAirNode;
__exportStar(require("./hooks/useMutationNodeState"), exports);
__exportStar(require("./hooks/useStorageNodeState"), exports);
__exportStar(require("./hooks/useMutationCreateNode"), exports);
__exportStar(require("./hooks/useMutationDeleteNode"), exports);
__exportStar(require("./hooks/useMutationContainerState"), exports);
__exportStar(require("./hooks/useStorageContainerState"), exports);
__exportStar(require("./hooks/useStorageContainerStateMap"), exports);
__exportStar(require("./hooks/useStorageNodeMap"), exports);
