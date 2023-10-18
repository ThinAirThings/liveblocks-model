import { createNodeTemplate } from "../NodeTemplate/createNodeTemplate.js"



export const ItemNodeTemplate = () => createNodeTemplate("ItemNode", {
    metadata: {},
    state: {
        itemName: "New Item"
    },
    stateDisplayKey: 'itemName',
})
