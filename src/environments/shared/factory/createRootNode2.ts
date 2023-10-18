import { createNodeTemplateIndex } from "./NodeTemplate/createNodeTemplateIndex.js";
import { RootNodeTemplate } from "./NodeTemplate/createRootNodeTemplate.js";



export const createRootNode2 = <
    ChildNodes
>(
    rootNodeTemplate: RootNodeTemplate<ChildNodes>,
) => {
    const nodeTemplateIndex = createNodeTemplateIndex(rootNodeTemplate)
}