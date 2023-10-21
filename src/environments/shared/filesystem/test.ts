import { createCustomNodeTemplate } from "./CustomNodeTemplate.js";
import { createSimpleStateNode } from "./createSimpleStateNode.js";



export const BusinessNodeTemplate = () => createCustomNodeTemplate(
    'SimpleStateNode', 'BusinessNode', {
        metadata: {
            displayIcon: "Archive"
        },
        state: {
            "businessName": "New Business"
        },
        stateDisplayKey: 'businessName',
        implementationIndex: {}
    }, {
        JobNode: JobNodeTemplate()
    }
)
export const JobNodeTemplate = () =>  createCustomNodeTemplate(
    "SimpleStateNode", "JobNode", {
    metadata: {
        displayIcon: "Briefcase",
    },
    state: {
        jobName: "New Job",
        contactNodeId: null as string | null,
    },
    stateDisplayKey: 'jobName',
    implementationIndex: {}
}, {
    "ContactNode": ContactNodeTemplate()
})

export const ContactNodeTemplate = () => createCustomNodeTemplate(
    "SimpleStateNode", "ContactNode", {
    metadata: {
        displayIcon: "User",
    },
    state: {
        contactName: "New Contact",
        email: "",
        phoneNumber: "",
    },
    stateDisplayKey: 'contactName',
    implementationIndex: {}
})

const businessTemplate = BusinessNodeTemplate()

const testChain = createSimpleStateNode(null, businessTemplate)
const testNode = testChain.create('JobNode')

