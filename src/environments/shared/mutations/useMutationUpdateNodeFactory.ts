import { MutationHook } from "../hook-types.js"
import { LiveAirNode, LiveAirNodeShape } from "../../../model/data-model.js";
import { Lson } from "@liveblocks/client";

export const useMutationUpdateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>,
    Meta extends Lson
>(
    useMutation: MutationHook<LiveAirNodeUnion, Meta>
) => <K extends keyof LiveAirNodeShape<LiveAirNodeUnion>['state']>(
    key: K
) => useMutation((
    {storage},
    nodeId: string,
    value: LiveAirNodeShape<LiveAirNodeUnion>['state'][K],
) => {
    const node = storage.get('nodeMap').get(nodeId)!
    const state = node.get('state')
    const oldValue = state.get(key)
    node.get('state').set(key, {
        ...oldValue,
        ...value
    })
}, [])