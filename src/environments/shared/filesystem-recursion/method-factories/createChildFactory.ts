import { UixNode } from "../../filesystem/UixNode.js";
import { UixNodeTemplate } from "../UixNodeTemplate.js";



export const createChildFactory = <
    ParentUixNode extends UixNode<any> | null,
    CTR extends Record<string, UixNodeTemplate>=Record<string, UixNodeTemplate<any, any, any>>,
>(
    parentNode: ParentUixNode,
    childTemplateRecord: CTR,
) => <ChildType extends keyof CTR>(childType: ChildType): UixNode<
    ParentUixNode,
    CTR[ChildType]['state'],
    CTR[ChildType]['childTemplates']
> => {
    
}