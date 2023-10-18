import { NodeTemplate, createNodeTemplate } from "./createNodeTemplate.js";


export const createRootNodeTemplate = <
    ChildNodes extends Record<string, NodeTemplate<any, any, any, any>> 
>(childNodes: ChildNodes) => createNodeTemplate('RootNode', {
    metadata: {},
    state: {root: 'root'},
    stateDisplayKey: 'root'
}, childNodes)