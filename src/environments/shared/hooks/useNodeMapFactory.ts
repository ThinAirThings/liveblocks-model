import isEqual from "lodash.isequal";
import { AirNodeIndex, AirNodeUnion } from "../../../index.browser.js";
import { StorageHook } from "../hook-types.js";


export const useNodeMapFactory = <
    Index extends AirNodeIndex<any>,
    U extends AirNodeUnion<Index>,
>(
    useStorage: StorageHook<Index, U>,
) => (
    nodeFilter?: Parameters<Array<[string, U]>['filter']>[0]
) => {
    return useStorage(root => {
        return nodeFilter
            ? new Map([...root.nodeMap].filter(nodeFilter as any))
            : root.nodeMap
    }, (a,b)=>isEqual(a,b))!
}