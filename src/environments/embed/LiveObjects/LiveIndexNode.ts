import { JsonObject, LiveMap, LiveObject, LsonObject } from "@liveblocks/client";


export type LiveIndexStorageModel = {
    liveNodeMap: LiveMap<string, ILiveIndexNode>
}

export type ILiveIndexNode = LiveObject<{
    nodeId: string
    metadata: JsonObject
    uixNodeType: string
    customType: string
    parentNodeId: string | null
    parentType: string | null
    stateDisplayKey: string   // You can probably get rid of this
    state: LiveObject<LsonObject>
    childNodeIds: LiveMap<string, null>
}>

export class LiveIndexNode extends LiveObject<
    ILiveIndexNode extends LiveObject<infer T>? T : never
> {
    constructor(data: {
        nodeId: string
        metadata: JsonObject
        uixNodeType: string
        customType: string
        parentNodeId: string | null
        parentType: string | null
        childNodeIds: LiveMap<string, null>
        stateDisplayKey: string
        state: LiveObject<LsonObject>
    }) {
        super(data)
    }
}