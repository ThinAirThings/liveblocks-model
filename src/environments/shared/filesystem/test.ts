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
        ContactNodeTemplate(),
        LogoNodeTemplate()
    ]
)
export const LogoNodeTemplate = () => createUixNodeTemplate(
    "S3ObjectNode", "LogoNode", {}
)
export const ContactNodeTemplate = () => createUixNodeTemplate(
    "SimpleStateNode", "ContactNode", {}
)

const businessTemplate = BusinessNodeTemplate()
const testChain = new SimpleStateNode(
    null as any,
    null as any,
    null, 
    '',
    businessTemplate
)
testChain.childNodeTypeMaps['JobNode'].forEach(node=>node.create(''))
const testNode = testChain.create('JobNode').create('LogoNode')
testNode.parentNode.create('ContactNode').parentNode.parentNode.parentNode
testNode.parentNode.create('ContactNode').create('')
