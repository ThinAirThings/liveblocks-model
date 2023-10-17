import { LiveTreeMap } from "./LiveTreeMap.js";
import { RootLiveTreeNode } from "./RootLiveTreeNode.js";


export type LiveTreeStorageModel = {
    liveTreeRoot: RootLiveTreeNode
    liveTreeMap: LiveTreeMap
}