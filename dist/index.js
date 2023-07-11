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
exports.createAirNode = void 0;
const client_1 = require("@liveblocks/client");
const react_1 = require("@liveblocks/react");
const uuid_1 = require("uuid");
const createAirNode = ({ 
// type,
state }) => new client_1.LiveObject({
    nodeId: (0, uuid_1.v4)(),
    // type,
    state: new client_1.LiveObject({
        ...state,
        containerState: new client_1.LiveObject(state.containerState)
    }),
    children: new client_1.LiveMap()
});
exports.createAirNode = createAirNode;
(0, react_1.createRoomContext)((0, client_1.createClient)({
    authEndpoint: "http://localhost:3000/api/liveblocks/auth"
}));
__exportStar(require("./hooks/useMutationNodeState"), exports);
__exportStar(require("./hooks/useStorageNodeState"), exports);
