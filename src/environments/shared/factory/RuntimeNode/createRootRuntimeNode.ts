import { createRoomContext } from "@liveblocks/react";
import { createRootNodeTemplate } from "../NodeTemplate/createRootNodeTemplate.js";
import { createRuntimeNode } from "./createRuntimeNode.js";
import { LiveTreeStorageModel } from "../types/StorageModel.js";
import { LiveTreeRootNode } from "../LiveObjects/LiveTreeRootNode.js";
import { Room } from "@liveblocks/client";



export const createRootRuntimeNode = async <
    RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>
>(
    liveTreeRoom: Room<{}, LiveTreeStorageModel, any, any>,
    rootNodeTemplate: RootNodeTemplate,
    useStorage: ReturnType<typeof createRoomContext<{}, LiveTreeStorageModel>>['suspense']['useStorage'],
) => createRuntimeNode(
    liveTreeRoom,
    null,
    (await liveTreeRoom.getStorage()).root.get('liveTreeRootNode'),
    rootNodeTemplate,
    new Map(),
    useStorage,
) 

export type RootRuntimeNode<
    RootNodeTemplate extends ReturnType<typeof createRootNodeTemplate>
> = Awaited<ReturnType<typeof createRootRuntimeNode<RootNodeTemplate>>>
