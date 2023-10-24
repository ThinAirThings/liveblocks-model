import { Json, JsonObject } from "@liveblocks/client";
import { UixNodeTemplate } from "./UixNodeTemplate.js";



interface UixNode<
    ParentUixNode extends UixNode<any> | null,
    State extends JsonObject= JsonObject,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any>>,
>{
    parentNode: ParentUixNode
    state: State
    createChild: <ChildType extends keyof CTR>(
        customType: ChildType
    ) => UixNode<
        UixNode<ParentUixNode, State, CTR>,
        CTR[ChildType]['state'],
        CTR[ChildType]['childTemplates']
    >
}

export const createUixNode = <
    ParentUixNode extends UixNode<any> | null,
    CustomType extends string,
    State extends JsonObject,
    CR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate>,
>(
    parentNode: ParentUixNode,
    template: UixNodeTemplate<CustomType, State, CR>
) => {
    return <UixNode<
        ParentUixNode,
        State,
        CR
    >>{
        parentNode,
        state: template.state,
        createChild: (customType) => {
            const childTemplate = template.childTemplates[customType]
            if(!childTemplate) throw new Error(`Child template with customType ${customType} not found`)
            createUixNode(
                <any>{},
                childTemplate
            )
        }
    }
}
