import { createSimpleStateNode } from "./UixNode.js"
import { createUixNodeTemplate } from "./UixNodeTemplate.js"


export const BusinessNodeTemplate = () => createUixNodeTemplate(
    'SimpleStateNode', 'BusinessNode', [
        JobNodeTemplate(),
    ]
)
export const JobNodeTemplate = () =>  createUixNodeTemplate(
    "SimpleStateNode", "JobNode", [
        ContactNodeTemplate()
    ]
)

export const ContactNodeTemplate = () => createUixNodeTemplate(
    "SimpleStateNode", "ContactNode"
)

const businessTemplate = BusinessNodeTemplate()
const testChain = createSimpleStateNode(null, businessTemplate)
const testNode = testChain.create('JobNode')
const contactNode = testNode.create('ContactNode')
