import { ContainerState } from "@thinairthings/zoom-utils";
import { MutationHook } from "..";
export declare const useMutationContainerState: (useMutation: MutationHook) => (nodeId: string, containerState: Partial<ContainerState>) => void;
