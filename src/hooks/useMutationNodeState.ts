import { ImmutableAirNode, LiveblocksPresence, LiveblocksStorageModel } from ".."
import {createRoomContext} from "@liveblocks/react"
export const useMutationNodeState = <
    T extends Record<string, any>, 
    Key extends keyof ImmutableAirNode<T>['state']
,>(
    useMutation: ReturnType<typeof createRoomContext<LiveblocksPresence, LiveblocksStorageModel>>['suspense']['useMutation'],
    nodeId: string,
    key: Key
) => {
    return useMutation(({storage}, value: ImmutableAirNode<T>['state'][Key]) => {
        storage.get("nodeMap")!.get(nodeId)!.get("state")!.set(key as any, value)
    }, [])
}