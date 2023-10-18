import { NodeTemplate } from "./createNodeTemplate.js"



export type RootNodeTemplate<ChildNodes> = {
    type: "Root"
    nodeId: 'root'
    childNodes: {
        [K in keyof ChildNodes]: ChildNodes[K]
    }
}
export const createRootNodeTemplate= <
    ChildNodes extends Record<string, NodeTemplate<any, any, any, any>>
>(childNodes: ChildNodes): RootNodeTemplate<ChildNodes> => {
    return {
        type: "Root",
        nodeId: 'root',
        childNodes
    }
}