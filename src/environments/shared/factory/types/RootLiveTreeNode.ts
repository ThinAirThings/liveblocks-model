import { LiveMap, LiveObject } from "@liveblocks/client"
import { ILiveTreeNode, LiveTreeNode } from "../LiveObjects/LiveTreeNode.js"

export class RootLiveTreeNode extends LiveTreeNode {
    constructor(liveTreeMap: LiveMap<string, ILiveTreeNode>) {
        super({
            liveTreeMap,
            nodeId: 'root',
            type: 'Root',
            metadata: {},
            parentNode: null,
            parentNodeId: null,
            parentType: null,
            state: new LiveObject({}),
            stateDisplayKey: 'root',
            childNodes: new LiveMap([]),
        })
    }
}