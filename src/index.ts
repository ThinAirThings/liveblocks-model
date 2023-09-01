import { createRoomContext } from "@liveblocks/react"
import { LiveblocksPresence, LiveblocksStorageModel, NodeDataTypeIndex } from "./model/data-model.js"


export type FilterNodeKeysByProperty<P> = {
    [K in keyof typeof NodeDataTypeIndex]: typeof NodeDataTypeIndex[K] extends P ? K : never;
}[keyof typeof NodeDataTypeIndex];

export type StorageHook = ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useStorage']
export type MutationHook = ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation']

export * from './model/data-model.js'
export * from './hooks/useMutationNodeState.js'
export * from './hooks/useStorageNodeState.js'
export * from './hooks/useMutationCreateNode.js'
export * from './hooks/useMutationDeleteNode.js'
export * from './hooks/useMutationContainerState.js'
export * from './hooks/useStorageContainerState.js'
export * from './hooks/useStorageContainerStateMap.js'
export * from './hooks/useStorageNodeMap.js'
export * from './components/LiveblocksNodeRoomProvider.js'