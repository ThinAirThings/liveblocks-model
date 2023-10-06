import { createRoomContext } from "@liveblocks/react"
import { AirNodeIndex, AirNodeUnion, LiveAirNode, LiveblocksStorageModel } from "../../model/data-model.js";

export type StorageHook<
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
> = ReturnType<
    typeof createRoomContext<
        any, 
        LiveblocksStorageModel<LiveAirNode<U>>
    >
>['suspense']['useStorage'] 
| ReturnType<
    typeof createRoomContext<
        any,
        LiveblocksStorageModel<LiveAirNode<U>>
    >
>['useStorage']

export type MutationHook<
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
> = ReturnType<
    typeof createRoomContext<
        any, 
        LiveblocksStorageModel<LiveAirNode<U>>
    >
>['suspense']['useMutation']
| ReturnType<
    typeof createRoomContext<
        any, 
        LiveblocksStorageModel<LiveAirNode<U>>
    >
>['useMutation']