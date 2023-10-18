import { createNodeTemplate } from "../createNodeTemplate.js"



export const EmployeeNodeTemplate = () => createNodeTemplate("EmployeeNode", {
    metadata: {},
    state: {
        employeeName: "New Employee"
    },
    stateDisplayKey: 'employeeName',
})
