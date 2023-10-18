import { createNodeTemplate } from "../NodeTemplate/createNodeTemplate.js"



export const EmployeeNodeTemplate = () => createNodeTemplate("EmployeeNode", {
    metadata: {},
    state: {
        employeeName: "New Employee"
    },
    stateDisplayKey: 'employeeName',
})
