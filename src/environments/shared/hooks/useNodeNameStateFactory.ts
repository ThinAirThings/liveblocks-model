import { AirNodeIndex, AirNodeUnion } from "../../../index.browser.js"
import { MutationHook, StorageHook } from "../hook-types.js"




export const useNodeNameStateFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    useStorage: StorageHook<Index, U>,
    useMutation: MutationHook<Index, U>,
) => (
    nodeId: string,
) => {
    const nodeState = useStorage((storage) => {
        const node = storage.nodeMap.get(nodeId)!
        return (node.state as any)[node.stateDisplayKey as any]
    }) as string
    const mutation = useMutation(({storage}, 
        value: string,
    ) => {
        const node = storage.get('nodeMap').get(nodeId)!;
        node.get('state').set(node.get('stateDisplayKey'), value as any)
    }, [])
    return [nodeState, mutation] as const
}