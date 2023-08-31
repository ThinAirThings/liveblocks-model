import { ContainerState } from "@thinairthings/zoom-utils";
import { MutationHook } from "../index.js";
export declare const useMutationContainerState: (useMutation: MutationHook) => (nodeId: string, containerState: Partial<ContainerState>) => void;
