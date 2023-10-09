import { AirNodeIndex, AirNodeUnion } from "../../../index.browser.js"
import { MutationHook, StorageHook } from "../hook-types.js"




export const useNodeNameStateFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    NodeIndex: Index,
    useStorage: StorageHook<Index, U>,
    useMutation: MutationHook<Index, U>,
) => <
    T extends U['type'],
    S extends (U & {type: T})['state'],
>(
    nodeId: string,
    nodeType: T,
) => {
    const nodeState = useStorage((storage) => {
        return ((storage.nodeMap.get(nodeId)!).state as any)[NodeIndex[nodeType].stateDisplayKey as any]
    }) as S[(U & {type: T})['stateDisplayKey']]
    const mutation = useMutation(({storage}, 
        value: S[(U & {type: T})['stateDisplayKey']],
    ) => {
        (storage.get('nodeMap').get(nodeId)!).get('state').set(NodeIndex[nodeType].stateDisplayKey as any, value)
    }, [])
    return [nodeState, mutation] as const
}