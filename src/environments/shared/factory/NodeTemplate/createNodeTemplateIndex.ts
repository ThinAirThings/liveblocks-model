import { NodeTemplate } from "./createNodeTemplate.js"
import { RootNodeTemplate } from "./createRootNodeTemplate.js"



export interface NodeTemplateIndexEntry extends NodeTemplate<any, any, any, any> {
    childNodeTypes: string[] | null
    childNodes: undefined
}

export const createNodeTemplateIndex = <
    ChildNodes
>(rootNodeTemplate: RootNodeTemplate<ChildNodes>) => {
    const indexObject: Record<string, any> = {}
    const buildIndex = (nodeTemplate: NodeTemplate<any, any, any, any>) => {
        indexObject[nodeTemplate.type] = {
            ...nodeTemplate,
            childNodeTypes: nodeTemplate.childNodes ? Object.keys(nodeTemplate.childNodes) : null
        }
        delete indexObject[nodeTemplate.type].childNodes
        nodeTemplate.childNodes && Object.values(nodeTemplate.childNodes).forEach((node) => {
            buildIndex(node as any)
        })
    }
    Object.values(rootNodeTemplate.childNodes).forEach((node) => {
        buildIndex(node as any)
    })
    return indexObject as Record<string, NodeTemplateIndexEntry>
}