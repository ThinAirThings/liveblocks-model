import { createRoomContext } from "@liveblocks/react"
import { LiveAirNode, LiveblocksPresence, LiveblocksStorageModel } from "../../model/data-model.js";
import { Lson } from "@liveblocks/client";

export type StorageHook<
    LiveNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
> = ReturnType<
    typeof createRoomContext<
        LiveblocksPresence, 
        LiveblocksStorageModel<LiveNodeUnion, Meta>
    >
>['suspense']['useStorage'] 
| ReturnType<
    typeof createRoomContext<
        LiveblocksPresence,
        LiveblocksStorageModel<LiveNodeUnion, Meta>
    >
>['useStorage']

export type MutationHook<
    LiveNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
> = ReturnType<
    typeof createRoomContext<
        LiveblocksPresence, 
        LiveblocksStorageModel<LiveNodeUnion, Meta>
    >
>['suspense']['useMutation']
| ReturnType<
    typeof createRoomContext<
        LiveblocksPresence,
        LiveblocksStorageModel<LiveNodeUnion, Meta>
    >
>['useMutation']