// import { SimpleStateNode } from "./SimpleStateNode.js"
import { createUixNodeTemplate } from "./UixNodeTemplate.js"
import { SimpleStateNode } from "./UixNodeTypeIndex.js"


export const BusinessNodeTemplate = () => createUixNodeTemplate(
    'SimpleStateNode', 'BusinessNode', {
        businessName: <string> 'New Business'
    }, [
        JobNodeTemplate(),
    ]
)
export const JobNodeTemplate = () =>  createUixNodeTemplate(
    "SimpleStateNode", "JobNode", {

    },[
        ContactNodeTemplate()
    ]
)

export const ContactNodeTemplate = () => createUixNodeTemplate(
    "SimpleStateNode", "ContactNode", {}
)

const businessTemplate = BusinessNodeTemplate()
const testChain = new SimpleStateNode(null, businessTemplate)
testChain.childNodeTypeSets['JobNode']
const testNode = testChain.create('JobNode').create('ContactNode')
testNode.parentNode.create('ContactNode').childNodeTypeSets['']
testNode.parentNode.create('ContactNode').create('')