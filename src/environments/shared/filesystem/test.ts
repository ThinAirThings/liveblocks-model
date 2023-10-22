import { createCustomNodeTemplate } from "./CustomNodeTemplate.js";
import { createSimpleStateNode } from "./createSimpleStateNode.js";



export const BusinessNodeTemplate = () => createCustomNodeTemplate(
    'SimpleStateNode', 'BusinessNode', {
        JobNode: JobNodeTemplate(),
        "ContactNode": ContactNodeTemplate()
    }
)
export const JobNodeTemplate = () =>  createCustomNodeTemplate(
    "SimpleStateNode", "JobNode", {
    
})

export const ContactNodeTemplate = () => createCustomNodeTemplate(
    "SimpleStateNode", "ContactNode"
)

const businessTemplate = BusinessNodeTemplate()
const testChain = createSimpleStateNode(null, businessTemplate)
const testNode = testChain.create('JobNode')