import { RootLiveTreeNode } from "./RootLiveTreeNode.js";
import { ILiveTreeNode } from "../LiveObjects/LiveTreeNode.js";
import { LiveMap } from "@liveblocks/client";


export type LiveTreeStorageModel = {
    liveTreeRoot: RootLiveTreeNode
    liveTreeMap: LiveMap<string, ILiveTreeNode>
}