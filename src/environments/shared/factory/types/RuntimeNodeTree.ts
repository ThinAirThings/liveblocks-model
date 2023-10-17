import { NodeTemplate } from "./NodeTemplate.js"
import { RuntimeNode } from "./RuntimeNode.js"


export type RuntimeNodeTree<
    Node extends NodeTemplate<any>
> = Node extends {childNodes: Record<string, any>} 
    ? RuntimeNode<Node> & {
        childNodes: Set<{
            [K in keyof Node['childNodes']]: RuntimeNodeTree<Node['childNodes'][K]> & {parentNode: Node}
        }[keyof Node['childNodes']]>
        useChildNodes: () => Set<{
            [K in keyof Node['childNodes']]: RuntimeNodeTree<Node['childNodes'][K]> & {parentNode: Node}
        }[keyof Node['childNodes']]>
    } : RuntimeNode<Node> & {
        childNodes: null
    }