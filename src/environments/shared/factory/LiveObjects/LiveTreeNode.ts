import { JsonObject, LiveMap, LiveObject, LsonObject } from "@liveblocks/client"


export type ILiveTreeNode = LiveObject<{
    metadata: JsonObject
    nodeId: string
    type: string
    parentNodeId: string | null
    parentType: string | null
    stateDisplayKey: string
    state: LiveObject<LsonObject>
    childNodes: LiveMap<string, ILiveTreeNode>
}>

export class LiveTreeNode extends LiveObject<
    // This is required due LiveTreeNode not being able to reference itself when defining 
    // child/parent nodes
    ILiveTreeNode extends LiveObject<infer T>? T : never
> {
    constructor(data: {
        metadata: JsonObject
        nodeId: string
        type: string
        parentNodeId: string | null
        parentType: string | null
        stateDisplayKey: string
        state: LiveObject<LsonObject>
        childNodes: LiveMap<string, ILiveTreeNode>
    }) {
        super(data)
    }
}



