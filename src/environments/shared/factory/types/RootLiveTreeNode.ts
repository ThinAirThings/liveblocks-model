import { LiveMap, LiveObject } from "@liveblocks/client"
import { ILiveTreeNode } from "../LiveObjects/LiveTreeNode.js"


export class RootLiveTreeNode extends LiveObject<{    
    nodeId: 'root'
    type: 'Root'
    childNodes: LiveMap<string, ILiveTreeNode>
}> {
    constructor() {
        super({
            nodeId: 'root',
            type: 'Root',
            childNodes: new LiveMap([])
        })
    }
}