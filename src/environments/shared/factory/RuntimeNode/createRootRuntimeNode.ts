import { createRoomContext } from "@liveblocks/react";
import { createRootNodeTemplate } from "../NodeTemplate/createRootNodeTemplate.js";
import { RootLiveTreeNode } from "../types/RootLiveTreeNode.js";
import { createRuntimeNode } from "./createRuntimeNode.js";
import { LiveTreeStorageModel } from "../types/StorageModel.js";




export const createRootRuntimeNode = <
    RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>
>(
    rootNodeTemplate: RootNodeTemplate,
    rootLiveTreeNode: RootLiveTreeNode,
    useStorage: ReturnType<typeof createRoomContext<{}, LiveTreeStorageModel>>['suspense']['useStorage'],
) => createRuntimeNode(
    null,
    rootLiveTreeNode,
    rootNodeTemplate,
    useStorage,
)

export type RootRuntimeNode<
    RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>
> = ReturnType<typeof createRootRuntimeNode<RootNodeTemplate>>
