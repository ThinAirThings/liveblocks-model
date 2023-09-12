import { createRoomContext } from "@liveblocks/react"
import { LiveAirNode, LiveblocksPresence, LiveblocksStorageModel } from "../../model/data-model.js";

export type StorageHook<
    LiveNodeUnion extends LiveAirNode<any, any>
> = ReturnType<
    typeof createRoomContext<
        LiveblocksPresence, 
        LiveblocksStorageModel<LiveNodeUnion>
    >
>['suspense']['useStorage'] 
| ReturnType<
    typeof createRoomContext<
        LiveblocksPresence,
        LiveblocksStorageModel<LiveNodeUnion>
    >
>['useStorage']

export type MutationHook<
    LiveNodeUnion extends LiveAirNode<any, any>
> = ReturnType<
    typeof createRoomContext<
        LiveblocksPresence, 
        LiveblocksStorageModel<LiveNodeUnion>
    >
>['suspense']['useMutation']
| ReturnType<
    typeof createRoomContext<
        LiveblocksPresence,
        LiveblocksStorageModel<LiveNodeUnion>
    >
>['useMutation']