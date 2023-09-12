import { MutationHook } from "../hook-types.js"
import { LiveAirNode, LiveAirNodeShape } from "../../../model/data-model.js";

export const useMutationUpdateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useMutation: MutationHook<LiveAirNodeUnion>
) => <K extends keyof LiveAirNodeShape<LiveAirNodeUnion>['state']>(
    nodeId: string,
    key: K
) => useMutation((
    {storage}, 
    value: LiveAirNodeShape<LiveAirNodeUnion>['state'][K]
) => {
    const node = storage.get('nodeMap').get(nodeId)!
    node.get('state').set(key, value)
}, [])