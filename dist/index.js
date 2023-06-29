"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAirNode = void 0;
const client_1 = require("@liveblocks/client");
const uuid_1 = require("uuid");
const createAirNode = ({ type, state }) => new client_1.LiveObject({
    nodeId: (0, uuid_1.v4)(),
    type,
    state: new client_1.LiveObject({
        ...state,
        containerState: new client_1.LiveObject(state.containerState)
    }),
    // state: new LiveObject(Object.fromEntries(Object.entries(state).map(([key, value]) => {
    //     return [key, new LiveObject(value)]
    // }))),
    children: new client_1.LiveMap()
});
exports.createAirNode = createAirNode;
