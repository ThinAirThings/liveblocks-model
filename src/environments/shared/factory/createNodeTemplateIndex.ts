import { NodeTemplate } from "./types/NodeTemplate.js"



export const createNodeTemplateIndex = <T extends NodeTemplate<any>>(indexObject: Record<string, any>, templateTreeNode: T) => {
    indexObject[templateTreeNode.type] = {
        ...templateTreeNode,
        childNodeTypes: templateTreeNode.childNodes ? Object.keys(templateTreeNode.childNodes) : null
    }
    delete indexObject[templateTreeNode.type].childNodes
    templateTreeNode.childNodes && Object.values(templateTreeNode.childNodes).forEach((node) => {
        createNodeTemplateIndex(indexObject, node)
    })
    return indexObject
}