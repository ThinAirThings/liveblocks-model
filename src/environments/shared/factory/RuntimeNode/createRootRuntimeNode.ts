import { RootNodeTemplate } from "../NodeTemplate/createRootNodeTemplate.js";
import { RuntimeNode } from "./createRuntimeNode.js";



export type RootRuntimeNode<
    T extends RootNodeTemplate<any>,
    R extends RuntimeNode<{
        type: T['type']
        metadata: any
        state: any
        stateDisplayKey: any
        childNodes: T['childNodes']
    }> = RuntimeNode<{
        type: T['type']
        metadata: any
        state: any
        stateDisplayKey: any
        childNodes: T['childNodes']
    }>
> = {
    [Property in keyof R as Exclude<Property, 
        | 'metadata' 
        | 'state' 
        | 'stateDisplayKey'
        | 'useData'
        | 'mutate'
        | 'delete'
    >]: R[Property]
}


export const createRootRuntimeNode = <
    RootTemplate extends RootNodeTemplate<any>
>(rootLiveNode: rootNodeTemplate: RootTemplate) => {

}

