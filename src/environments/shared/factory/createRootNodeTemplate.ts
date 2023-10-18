


type RootNodeTemplate<ChildNodes> = {
    type: "Root"
    nodeId: 'root'
    childNodes: {
        [K in keyof ChildNodes]: ChildNodes[K]
    }
}
export const createTemplateRoot = <
    ChildNodes
>(childNodes: ChildNodes): RootNodeTemplate<ChildNodes> => {
    return {
        type: "Root",
        nodeId: 'root',
        childNodes
    }
}