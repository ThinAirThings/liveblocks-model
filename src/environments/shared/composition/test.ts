// import { SimpleStateNode } from "./SimpleStateNode.js"
import { createS3ObjectNodeTemplate, createUixNodeTemplate } from "./UixNodeTemplate.js"
import { SimpleStateNode } from "./UixNodeTypeIndex.js"
import { L } from "ts-toolbelt"

export const BusinessNodeTemplate = () => createUixNodeTemplate(
    'SimpleStateNode', 'BusinessNode', {
        businessName: <string> 'New Business'
    }, [
        JobNodeTemplate(),
        ContactNodeTemplate(),
    ]
)
export const JobNodeTemplate = () =>  createUixNodeTemplate(
    "SimpleStateNode", "JobNode", {
        jobName: <string> 'New Job'
    },[
        ContactNodeTemplate(),
        LogoNodeTemplate(),
        ProfilePictureTemplate()
    ]
)
export const LogoNodeTemplate = () => createS3ObjectNodeTemplate('LogoNode', [
    ProfilePictureTemplate(),
])
export const ProfilePictureTemplate = () => createS3ObjectNodeTemplate('ProfilePictureNode')

export const ContactNodeTemplate = () => createUixNodeTemplate(
    "SimpleStateNode", "ContactNode", {
        contactName: <string> 'New Contact'
    }, [
        ProfilePictureTemplate()
    ]
)


const businessTemplate = BusinessNodeTemplate()
businessTemplate.childTemplates
const businessNode = new SimpleStateNode(
    null as any,
    null as any,
    null, 
    '',
    businessTemplate
)
businessNode.useStorage('businessName')
businessNode.childNodeTypeMaps['JobNode'].forEach(node=>node.createChild('LogoNode'))
const jobNode = businessNode.createChild('JobNode')
const logoNode = jobNode.createChild('LogoNode')
const contactNodeFromJobNode = jobNode.createChild('ContactNode')
contactNodeFromJobNode.useStorage('contactName')   
contactNodeFromJobNode.createChild('')// Fail
logoNode.useStorage('bucketName') // Fail
logoNode.createChild('')
const contactNodeFromBusinessNode = businessNode.createChild('ContactNode')
const jobNodeFromBusinessNode = businessNode.createChild('JobNode')
jobNodeFromBusinessNode.useStorage('jobName') // Success
contactNodeFromBusinessNode.useStorage('contactName') // Success
contactNodeFromBusinessNode.createChild('') // Fail
const profilePicNodeFromJobNode = jobNode.createChild('ProfilePictureNode')
profilePicNodeFromJobNode.useStorage('objectState')
profilePicNodeFromJobNode.createChild('')



// Typescript Play

type TreeNode<Name extends string, Children extends TreeNode<any, any>[]> = {
    name: Name,
    children: Children extends [infer Head, ...infer Tail]
        ? (Head extends TreeNode<any, any>[]
            
            )
}