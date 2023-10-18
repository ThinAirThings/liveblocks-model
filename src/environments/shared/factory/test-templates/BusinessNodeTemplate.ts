import { createNodeTemplate } from "../NodeTemplate/createNodeTemplate.js";
import { createRootNodeTemplate } from "../NodeTemplate/createRootNodeTemplate.js";
import { createRootRuntimeNode } from "../RuntimeNode/createRootRuntimeNode.js";
import { createRuntimeNode } from "../RuntimeNode/createRuntimeNode.js";
import { EmployeeNodeTemplate } from "./EmployeeNodeTemplate.js";
import { ItemNodeTemplate } from "./ItemNodeTemplate.js";


// Note: This is effectively the same thing as a Pure React component.
export const BusinessNodeTemplate = () => createNodeTemplate("BusinessNode", {
    metadata: {
        icon: "Briefcase"
    },
    state: {
        businessName: "New Business",
        employees: {},
    },
    stateDisplayKey: 'businessName',
}, {
    "EmployeeNode": EmployeeNodeTemplate(),
    "ItemNode": ItemNodeTemplate()
})

const template = BusinessNodeTemplate()
template.childNodes?.EmployeeNode.childNodes

const rootNodeTemplate = createRootNodeTemplate({    
    "BusinessNode": BusinessNodeTemplate()
})

// const rootRuntimeNode = createRuntimeNode(
//     null as any, 
//     null,
//     null as any,
//     rootNodeTemplate,
// )

const rootRuntimeNode = createRootRuntimeNode(rootNodeTemplate)
rootRuntimeNode.type
const businessNode = rootRuntimeNode.create('BusinessNode')
const employeeNode = businessNode.create('EmployeeNode')
employeeNode.type
