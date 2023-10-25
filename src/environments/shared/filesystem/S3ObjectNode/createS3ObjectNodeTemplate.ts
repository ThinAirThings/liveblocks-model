import { JsonObject } from "@liveblocks/client";
import { S3ObjectNode } from "./S3ObjectNode.js";
import { UixNodeTemplate, UixNodeTemplateProps, createUixNodeTemplate } from "../UixNode/createUixNodeTemplate.js";


type S3ObjectNodeConfig = {
    metadata: JsonObject
    bucketProxyUrl: string,
    fileType: string
}

export const createS3ObjectNodeTemplate = <
    CustomType extends string,
    Metadata extends JsonObject,
    ChildTemplates extends Record<string, UixNodeTemplate>|{}={},
>(
    customType: CustomType,
    config: S3ObjectNodeConfig,
    childTemplates?: ChildTemplates
) => createUixNodeTemplate(customType, S3ObjectNode, {
    metadata: config.metadata,
    initialState: {
        bucketProxyUrl: config.bucketProxyUrl,
        fileType: config.fileType,
    }
}, childTemplates??{}) as UixNodeTemplate<
    CustomType,
    typeof S3ObjectNode,
    Metadata,
    ChildTemplates
>