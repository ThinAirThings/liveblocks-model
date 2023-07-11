import { MutationHook, NodeTypeIndex } from "..";
export declare const useMutationNodeState: <T extends keyof NodeTypeIndex, K extends keyof NodeTypeIndex[T]["defaultProps"]>(useMutation: MutationHook, nodeId: string, key: K) => (value: NodeTypeIndex[T]["defaultProps"][K]) => void;
