"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutationContainerState = void 0;
const useMutationContainerState = (useMutation) => {
    return useMutation(({ storage }, nodeId, containerState) => {
        storage.get("nodeMap").get(nodeId)?.get("state").get("containerState").update(Object.fromEntries(Object.entries(containerState).map(([key, value]) => [key, key !== "scale" ? Math.round(value) : value])));
    }, []);
};
exports.useMutationContainerState = useMutationContainerState;
