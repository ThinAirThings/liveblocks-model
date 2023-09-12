import { ContainerState } from "@thinairthings/zoom-utils"
import { MutationHook } from "../index.node.js"

export const useMutationContainerState = (useMutation: MutationHook) => {
    return useMutation(({storage}, nodeId: string, containerState: Partial<ContainerState>) => {
        storage.get("nodeMap")!.get(nodeId)?.get("state").get("containerState").update(
            Object.fromEntries(
                Object.entries(containerState).map(
                    ([key, value]) => [key, key!=="scale"?Math.round(value as number):value]
                )
            )
        )
    }, [])
}