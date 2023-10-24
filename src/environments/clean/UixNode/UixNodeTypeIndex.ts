import { JsonObject } from "@liveblocks/client";
import { S3ObjectNode } from "./S3ObjectNode.js";
import { SimpleStateNode } from "./SimpleStateNode.js";
import { UixNode } from "./UixNode.js";
import { UixNodeTemplate } from "./UixNodeTemplate.js";



export const UixNodeTypeIndex = {
    S3ObjectNode: S3ObjectNode,
    SimpleStateNode: SimpleStateNode
} as const