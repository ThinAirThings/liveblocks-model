import { UixNodeTemplate } from "./UixNodeTemplate.js";






interface UixNode<
    ParentUixNode extends UixNode | null = UixNode<any> | null,
    Template extends UixNodeTemplate<any, any, any> = UixNodeTemplate<any, any, any>,
> {
    parentNode: ParentUixNode
    template: Template
}

export const createUixNode = <
    ParentUixNode extends UixNode | null = UixNode<any> | null,
    Template extends UixNodeTemplate<any, any, any> = UixNodeTemplate<any, any, any>,
    CustomType extends string=string,
    State extends JsonObject=JsonObject,
    CTS extends UixNodeTemplate[] | []=UixNodeTemplate[] | []
>(
    parentNode: ParentUixNode,
    template: UixNodeTemplate<any, any, any>
) => {
    return <UixNode<ParentUixNode, UixNodeTemplate<any, any, any>>>{
        parentNode,
        template
    }
}
