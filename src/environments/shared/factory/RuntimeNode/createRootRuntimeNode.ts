import { createRoomContext } from "@liveblocks/react";
import { createRootNodeTemplate } from "../NodeTemplate/createRootNodeTemplate.js";
import { createRuntimeNode } from "./createRuntimeNode.js";
import { LiveTreeStorageModel } from "../types/StorageModel.js";
import { LiveTreeRootNode } from "../LiveObjects/LiveTreeRootNode.js";



export const createRootRuntimeNode = <
    RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>
>(
    rootNodeTemplate: RootNodeTemplate,
    rootLiveTreeNode: LiveTreeRootNode,
    useStorage: ReturnType<typeof createRoomContext<{}, LiveTreeStorageModel>>['suspense']['useStorage'],
) => createRuntimeNode(
    null,
    rootLiveTreeNode,
    rootNodeTemplate,
    new Map(),
    useStorage,
)

 

export type RootRuntimeNode<
    RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>
> = ReturnType<typeof createRootRuntimeNode<RootNodeTemplate>>
