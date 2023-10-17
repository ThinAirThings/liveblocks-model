import { JsonObject } from "@liveblocks/client"

export type NodeTemplate<T extends string> = {
    type: T
    metadata: JsonObject
    stateDisplayKey: string
    state: Record<string, any>
    childNodes: Record<string, NodeTemplate<any>> | null
}

