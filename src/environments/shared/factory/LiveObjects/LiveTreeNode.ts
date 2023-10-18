import { JsonObject, LiveMap, LiveObject, LsonObject } from "@liveblocks/client"


export type ILiveTreeNode = LiveObject<{
    liveTreeMap: LiveMap<string, ILiveTreeNode>
    metadata: JsonObject
    nodeId: string
    type: string
    parentNodeId: string | null
    parentType: string | null
    stateDisplayKey: string
    state: LiveObject<LsonObject>
    parentNode: ILiveTreeNode | null
    childNodes: LiveMap<string, ILiveTreeNode>
}>

export class LiveTreeNode extends LiveObject<
    // This is required due LiveTreeNode not being able to reference itself when defining 
    // child/parent nodes
    ILiveTreeNode extends LiveObject<infer T>? T : never
> {
    constructor(data: {
        liveTreeMap: LiveMap<string, LiveTreeNode>
        metadata: JsonObject
        nodeId: string
        type: string
        parentNodeId: string | null
        parentType: string | null
        stateDisplayKey: string
        state: LiveObject<LsonObject>
        parentNode: LiveTreeNode | null
        childNodes: LiveMap<string, LiveTreeNode>
    }) {
        super(data)
    }
}



