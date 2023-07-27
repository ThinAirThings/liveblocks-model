import { MutationHook } from "..";
export declare const useMutationCreateNode: (useMutation: MutationHook) => (args_0: {
    type: "pixi" | "dom";
    key: "chrome" | "vsCode" | "textBox" | "rectangle";
    state: ({
        [key: string]: any;
    } | ({
        [key: string]: any;
    } & {
        dataId: string;
        lifeCycle: "alive" | "dead";
        cursor: string;
        url: string;
    }) | ({
        [key: string]: any;
    } & {
        cursor: string;
    }) | ({
        [key: string]: any;
    } & {
        content: string;
    })) & {
        containerState: import("@thinairthings/zoom-utils").ContainerState;
    };
}) => string;
