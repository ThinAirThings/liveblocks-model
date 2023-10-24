// import { SimpleStateNode } from "./SimpleStateNode.js"
import { UixNodeTemplate, createS3ObjectNodeTemplate, createUixNodeTemplate } from "./UixNodeTemplate.js"
import { SimpleStateNode } from "./UixNodeTypeIndex.js"
import { createUixNode } from "./createUixNode.js"


export const BusinessNodeTemplate = () => createUixNodeTemplate(
    'SimpleStateNode', 'BusinessNode', {
        businessName: <string> 'New Business'
    }, {
        "JobNode": JobNodeTemplate(),
        "ContactNode": ContactNodeTemplate(),
    }
    
)
export const JobNodeTemplate = () =>  createUixNodeTemplate(
    "SimpleStateNode", "JobNode", {
        jobName: <string> 'New Job'
    }, {        
        "ContactNode": ContactNodeTemplate(),
        "LogoNode": LogoNodeTemplate(),
        "ProfilePictureNode": ProfilePictureTemplate()
    }
    
)
export const LogoNodeTemplate = () => createS3ObjectNodeTemplate('LogoNode', {
    "ProfilePictureNode": ProfilePictureTemplate(),
})
export const ProfilePictureTemplate = () => createS3ObjectNodeTemplate('ProfilePictureNode')

export const ContactNodeTemplate = () => createUixNodeTemplate(
    "SimpleStateNode", "ContactNode", {
        contactName: <string> 'New Contact'
    }, {        
        "ProfilePictureNode": ProfilePictureTemplate()
    }
)


const businessTemplate = BusinessNodeTemplate()

const rootNode = createUixNode(
    null,
    businessTemplate
)

const jobNode = rootNode.createChild('JobNode')
const contactNode = jobNode.createChild('ContactNode')
contactNode.parentNode['state']['jobName']
contactNode.state['contactName']
contactNode.createChild('ProfilePictureNode')
jobNode.state['jobName']
