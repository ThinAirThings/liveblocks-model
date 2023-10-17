import { JsonObject } from "@liveblocks/client"
import { NodeTemplate } from "./configureLiveTreeStorage.js"
import { createElement } from "react"
import { createRootNode } from "./createRootNode.js"

type NodeTemplateProps = {
    metadata: JsonObject
    state: Record<string, any>
    stateDisplayKey: string
}

export const createNodeTemplate = <
    T extends string,
    P extends NodeTemplateProps,
    ChildNodes extends Record<string, NodeTemplate<any>>|null=null
>(type: T, props: P, childNodes?: ChildNodes) => {
    return {
        type,
        metadata: props.metadata,
        stateDisplayKey: props.stateDisplayKey,
        state: props.state,
        childNodes: childNodes??null
    } as {
        type: T
        metadata: P['metadata']
        stateDisplayKey: P['stateDisplayKey']
        state: {
            [K in keyof P['state']]: P['state'][K]
        }
        childNodes: ChildNodes extends undefined ? null : {
            [K in keyof ChildNodes]: ChildNodes[K]
        }
    }
}

export const createTemplateRoot = <
    ChildNodes extends Record<string, NodeTemplate<any>>
>(childNodes: ChildNodes) => {
    return {
        type: "Root",
        nodeId: 'root',
        childNodes
    } as {
        type: "Root"
        nodeId: 'root'
        childNodes: {
            [K in keyof ChildNodes]: ChildNodes[K]
        }
    }
}



export const RootNode = () => {
    return createNodeTemplate("Root", {
        metadata: {},
        stateDisplayKey: 'root',
        state: {
            root: true
        },
    }, )
}

export const BusinessNode = () => {
    return createNodeTemplate("BusinessNode", {
        metadata: {},
        stateDisplayKey: 'businessName',
        state: {
            businessName: "New Business"
        }
    }, {
        "EmployeeNode": EmployeeNode(),
        "ItemNode": ItemNode()
    })
}
const templateRoot = createTemplateRoot({
    "BusinessNode": BusinessNode()
} as const)

const rootNode = createRootNode(createTemplateRoot({
    "BusinessNode": BusinessNode()
}))



export const ItemNode = () => {
    return createNodeTemplate("ItemNode", {
        metadata: {},
        stateDisplayKey: 'itemName',
        state: {
            itemName: "New Item"
        },
        childNodes: null
    })
}

export const EmployeeNode = () => {
    return createNodeTemplate("EmployeeNode", {
        metadata: {},
        stateDisplayKey: 'employeeName',
        state: {
            employeeName: "New Employee"
        },
        childNodes: null
    })
}