import { LiveMap, LiveObject } from "@liveblocks/client"
import { LiveAirNode, AirNodeShape, AirNodeIndex, NodeContextType, AirNodeType, LiveblocksStorageModel } from "../../model/data-model.js";
import {v4 as uuidv4} from 'uuid'


export const createLiveAirNodeFactory = <
    LiveNodeUnion extends LiveAirNode<any, any, any>
>(
    AirNodeIndex: AirNodeIndex<LiveNodeUnion>,
) => <T extends AirNodeShape<LiveNodeUnion>["type"],>(
    liveNodeMap: LiveblocksStorageModel<LiveNodeUnion>['nodeMap'],
    airNodeCtx: AirNodeContext<LiveNodeUnion>,
    type: T, {
    state,
}:{
    state?: Partial<(AirNodeShape<LiveNodeUnion>&{type: T})['state']>,
}): LiveAirNode<
    T, 
    (AirNodeShape<LiveNodeUnion>&{type: T})['parentType'],
    (AirNodeShape<LiveNodeUnion>&{type: T})['state'],
    (AirNodeShape<LiveNodeUnion>&{type: T})['meta']
> => {
    const nodeId = uuidv4()
    const parentLinks = liveNodeMap.get(airNodeCtx[AirNodeIndex[type].parentType])!.get('links')
    parentLinks.set(type, [
        ...new Set([...parentLinks.get(type), nodeId])
    ])
    return new LiveObject({
        nodeId: uuidv4(),
        type,
        parentType: AirNodeIndex[type].parentType,
        meta: {
            ...AirNodeIndex[type].meta,
            createdAt: new Date().toISOString()
        },
        links: new LiveObject({
            parent: [airNodeCtx[AirNodeIndex[type].parentType]]
        }),
        state: new LiveObject({
            ...AirNodeIndex[type].state,
            ...state,
        }),
    })
}