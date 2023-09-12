import { Lson } from "@liveblocks/client";
import { LiveAirNode } from "../../../index.node.js";
import { MutationHook } from "../hook-types.js";



export const useMutationUpdateMetaFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => () => useMutation((
    {storage},
    updater: (meta: Meta) => void
)=> {
    updater(storage.get('meta'))
}, []) 