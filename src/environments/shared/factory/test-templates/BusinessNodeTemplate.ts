import { createNodeTemplate } from "../createNodeTemplate.js";
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