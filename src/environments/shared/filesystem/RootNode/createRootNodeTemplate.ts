import { RootNode } from "./RootNode.js"
import { UixNodeTemplate, createUixNodeTemplate } from "../UixNode/createUixNodeTemplate.js"




export const createRootNodeTemplate = <
    ChildTemplates extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
>(
    childTemplates: ChildTemplates
) => createUixNodeTemplate('root', RootNode, {
    metadata: {},
    stateDisplayKey: 'root'
}, childTemplates)