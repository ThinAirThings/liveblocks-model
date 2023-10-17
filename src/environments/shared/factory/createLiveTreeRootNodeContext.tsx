import { FC, ReactNode, createContext, useContext } from "react";
import { createRootNodeFactory } from "./createRootNodeFactory.js";
import { NodeTemplate } from "./types/NodeTemplate.js";
import { RuntimeNodeTree } from "./types/RuntimeNodeTree.js";
import { createClient } from "@liveblocks/client";



export const createLiveTreeRootNodeContext = <
    TemplateTree extends NodeTemplate<any>,
    RuntimeTree extends RuntimeNodeTree<TemplateTree>,
>(
    NodeTemplateTree: TemplateTree,
    liveblocksClient: ReturnType<typeof createClient>,
) => {

}
