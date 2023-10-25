import { JsonObject } from "@liveblocks/client";
import { UixNode } from "./UixNode.js";
import { S3ObjectNode } from "../S3ObjectNode/S3ObjectNode.js";
import { SimpleStateNode } from "../SimpleStateNode/SimpleStateNode.js";
import { RootNode } from "../RootNode/RootNode.js";

export type UixNodeTemplateProps<
    Metadata extends JsonObject=JsonObject,
> = {
    metadata: Metadata,
    initialState?: JsonObject
}
export type UixNodeType = RootNode | S3ObjectNode | SimpleStateNode

export type UixNodeConstructor = {
    new (...args: any[]): UixNodeType
}
export type UixNodeTemplate<
    CustomType extends string=string,
    NodeConstructor extends UixNodeConstructor=UixNodeConstructor,
    Metadata extends JsonObject=JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}=Record<string, UixNodeTemplate<any, any, any, any>>,
> = {
    customType: CustomType
    metadata: Metadata
    initialState?: InstanceType<NodeConstructor>['initialState']
    Constructor: NodeConstructor
    childTemplates: ChildTemplates extends Record<string, UixNodeTemplate> ?{
        [ChildType in keyof ChildTemplates]: UixNodeTemplate<
            ChildTemplates[ChildType]['customType'],
            ChildTemplates[ChildType]['Constructor'],
            ChildTemplates[ChildType]['metadata'],
            ChildTemplates[ChildType]['childTemplates']
        >
    }: {}
}

export const createUixNodeTemplate = <
    CustomType extends string,
    Metadata extends JsonObject,
    NodeConstructor extends UixNodeConstructor,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}={},
>(
    customType: CustomType,
    UixNodeConstructor: NodeConstructor,
    props: UixNodeTemplateProps<Metadata>,
    childTemplates?: ChildTemplates
) => {
    return {
        customType,
        Constructor: UixNodeConstructor,
        metadata: props.metadata,
        initialState: props.initialState,
        childTemplates: childTemplates??{}
    } as UixNodeTemplate<
        CustomType,
        NodeConstructor,
        Metadata,
        ChildTemplates
    >
}


