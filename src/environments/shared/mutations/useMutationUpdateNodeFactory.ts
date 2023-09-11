import { LiveAirNode, LiveAirNodeShapeUnion } from "../../../index.js"
import { MutationHook } from "../hook-types.js"


export const useMutationUpdateNodeFactory = <
    LiveAirNodeUnion extends LiveAirNode<any, any>
>(
    useMutation: MutationHook<LiveAirNodeUnion>
) => <K extends keyof LiveAirNodeShapeUnion<LiveAirNodeUnion>['state']>(
    nodeId: string,
    key: K
) => useMutation((
    {storage}, 
    value: LiveAirNodeShapeUnion<LiveAirNodeUnion>['state'][K]
) => {
    const node = storage.get('nodeMap').get(nodeId)!
    node.get('state').set(key, value)
}, [])