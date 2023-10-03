
import { StorageHook } from "../hook-types.js";
import { LiveAirNode, AirNodeShape, AirNodeType} from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";
import { NodeContextFactory } from "../context/NodeContextFactory.js";
import { useContext } from "react";

export const useStorageGetNodeMapFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    NodeContext: ReturnType<typeof NodeContextFactory<LiveAirNodeUnion, Meta>>['NodeContext'],
    useStorage: StorageHook<LiveAirNodeUnion, Meta>
) => (
    nodeFilter?: (...params: [
        nodeCtx: {[K in AirNodeType<LiveAirNodeUnion>]: string}, 
        ...Parameters<Parameters<Array<[string, AirNodeShape<LiveAirNodeUnion>]>['filter']>[0]>]
    ) => boolean
) => {
    const nodeContext = useContext(NodeContext)
    return useStorage(root => {
        return nodeFilter
            ? new Map([...root.nodeMap].filter((p1, p2, p3) => nodeFilter(
                nodeContext[0], 
                p1 as [string, AirNodeShape<LiveAirNodeUnion>], 
                p2, 
                p3 as Array<[string, AirNodeShape<LiveAirNodeUnion>]>
            )))
            : root.nodeMap
    })!
}