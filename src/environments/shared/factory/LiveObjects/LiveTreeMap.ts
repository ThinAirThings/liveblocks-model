import { LiveMap } from "@liveblocks/client"
import { LiveTreeNode } from "./LiveTreeNode.js"


export class LiveTreeMap extends LiveMap<string, LiveTreeNode> {
    constructor(data: [string, LiveTreeNode][]) {
        super(data)
    }
}