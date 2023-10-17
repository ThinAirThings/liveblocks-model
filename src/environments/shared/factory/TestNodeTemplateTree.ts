

export const TestNodeTemplateTree = {
    type: "Root" as const,
    metadata: {},
    stateDisplayKey: '' as const,
    state: {},
    childNodes: {
        "BusinessNode": {
            type: "BusinessNode" as const,
            metadata: {},
            stateDisplayKey: 'businessName' as const,
            state: {
                businessName: "New Business"
            },
            childNodes: {
                "EmployeeNode": {
                    type: "EmployeeNode" as const,
                    metadata: {},
                    stateDisplayKey: 'employeeName' as const,
                    state: {
                        employeeName: "New Employee"
                    },
                    childNodes: null
                },
                "ItemNode": {
                    type: "ItemNode" as const,
                    metadata: {},
                    stateDisplayKey: 'itemName' as const,
                    state: {
                        itemName: "New Item"
                    },
                    childNodes: null
                } 
            } as const
        }
    }    
}