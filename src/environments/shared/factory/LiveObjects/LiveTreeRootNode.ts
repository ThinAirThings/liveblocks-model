import { LiveMap, LiveObject } from "@liveblocks/client"
import { LiveTreeNode } from "./LiveTreeNode.js"

export class LiveTreeRootNode extends LiveTreeNode {
    constructor() {
        super({
            nodeId: 'root',
            type: 'Root',
            metadata: {},
            parentNodeId: null,
            parentType: null,
            state: new LiveObject({}),
            stateDisplayKey: 'root',
            childNodes: new LiveMap([]),
        })
    }
}