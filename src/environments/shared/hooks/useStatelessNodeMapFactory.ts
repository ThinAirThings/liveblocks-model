import isEqual from "lodash.isequal"
import { AirNodeIndex, AirNodeUnion, StatelessAirNode, StatelessAirNodeUnion } from "../../../index.browser.js"
import { StorageHook } from "../hook-types.js"



export const useStatelessNodeMapFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    useStorage: StorageHook<Index, U>,
) => (
    nodeFilter?: Parameters<Array<[string, U]>['filter']>[0]
): Map<string, StatelessAirNodeUnion<Index>> => {
    return useStorage(root => {
        return nodeFilter
            ? new Map([...root.nodeMap]
                .filter(nodeFilter as any)
                .map( ([nodeId, node]) => [nodeId, {
                    nodeId: node.nodeId,
                    type: node.type,
                    parentNodeId: node.parentNodeId,
                    parentType: node.parentType, 
                    nodeMeta: node.nodeMeta,
                    stateDisplayKey: node.stateDisplayKey,
                }])
            )
            : new Map([...root.nodeMap]
                .map( ([nodeId, node]) => [nodeId, {
                    nodeId: node.nodeId,
                    type: node.type,
                    parentNodeId: node.parentNodeId,
                    parentType: node.parentType, 
                    nodeMeta: node.nodeMeta,
                    stateDisplayKey: node.stateDisplayKey,
                }])
            )
    }, (a,b)=>isEqual(a,b))!
}