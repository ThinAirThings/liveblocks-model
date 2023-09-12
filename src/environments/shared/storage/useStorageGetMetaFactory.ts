import { Lson } from "@liveblocks/client"
import { LiveAirNode } from "../../../index.node.js"
import { StorageHook } from "../hook-types.js"


export const useStorageGetMetaFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(useStorage: StorageHook<LiveAirNodeUnion, Meta> ) => () => useStorage(root => root.meta)
