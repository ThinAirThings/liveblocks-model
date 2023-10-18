import { LiveMap } from "@liveblocks/client"
import { ILiveTreeNode } from "./LiveTreeNode.js"


export class LiveTreeMap extends LiveMap<string, ILiveTreeNode> {
    constructor(data: [string, ILiveTreeNode][]) {
        super(data)
    }
}