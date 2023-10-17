import {
  createNodeEntry,
  customLiveHooksFactory
} from "./chunk-MKIBA2KT.js";

// src/environments/browser/liveblocksBrowserConfig.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// src/environments/browser/LiveblocksBrowserProviderFactory.tsx
import { Suspense } from "react";
import { jsx } from "react/jsx-runtime";
var LiveblocksBrowserProviderFactory = (RoomProvider, initialLiveblocksPresence, initialLiveblocksStorage) => ({
  roomId,
  Loading,
  children
}) => {
  return /* @__PURE__ */ jsx(
    RoomProvider,
    {
      id: roomId,
      initialPresence: initialLiveblocksPresence,
      initialStorage: initialLiveblocksStorage,
      children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children })
    }
  );
};

// src/environments/browser/liveblocksBrowserConfig.tsx
var liveblocksBrowserConfig = (NodeIndex, createClientProps, initialLiveblocksPresence, initialLiveblocksStorage) => {
  const {
    suspense: liveblocks
  } = createRoomContext(createClient(createClientProps));
  return {
    ...customLiveHooksFactory(
      NodeIndex,
      liveblocks.useStorage,
      liveblocks.useMutation
    ),
    LiveblocksProvider: LiveblocksBrowserProviderFactory(
      liveblocks.RoomProvider,
      initialLiveblocksPresence,
      initialLiveblocksStorage
    ),
    ...liveblocks,
    NodeIndex
  };
};

// src/environments/shared/factory/configureLiveTreeStorage.tsx
import { createClient as createClient2 } from "@liveblocks/client";
import { createRoomContext as createRoomContext2 } from "@liveblocks/react";
import { createContext, useContext, useEffect, useState } from "react";

// src/environments/shared/factory/createRootNodeFactory.ts
import { LiveMap as LiveMap2, LiveObject as LiveObject2 } from "@liveblocks/client";

// src/environments/shared/factory/types/LiveTreeNode.ts
import { LiveObject } from "@liveblocks/client";
var LiveTreeNode = class extends LiveObject {
  constructor(data) {
    super(data);
  }
};

// src/environments/shared/factory/createRootNodeFactory.ts
import { v4 as uuidv4 } from "uuid";

// src/environments/shared/factory/createNodeTemplateIndex.ts
var createNodeTemplateIndex = (indexObject, templateTreeNode) => {
  indexObject[templateTreeNode.type] = {
    ...templateTreeNode,
    childNodeTypes: templateTreeNode.childNodes ? Object.keys(templateTreeNode.childNodes) : null
  };
  delete indexObject[templateTreeNode.type].childNodes;
  templateTreeNode.childNodes && Object.values(templateTreeNode.childNodes).forEach((node) => {
    createNodeTemplateIndex(indexObject, node);
  });
  return indexObject;
};

// src/environments/shared/factory/createRootNodeFactory.ts
var createRootNodeFactory = (NodeTemplateTree, liveTreeRoot, liveTreeMap, useStorage) => {
  const nodeTemplateIndex = createNodeTemplateIndex({}, NodeTemplateTree);
  const createRuntimeNode = (parentRuntimeNode, liveTreeNode) => {
    const runtimeNode = {
      ...Object.fromEntries(Object.entries(liveTreeNode.toImmutable()).filter(([key]) => key !== "state")),
      parentNode: parentRuntimeNode,
      childNodes: /* @__PURE__ */ new Set(),
      create: (type) => {
        const newLiveTreeNode = new LiveTreeNode({
          metadata: nodeTemplateIndex[type].metadata,
          nodeId: uuidv4(),
          type,
          parentNodeId: liveTreeNode.get("nodeId") ?? null,
          parentType: liveTreeNode.get("type") ?? null,
          stateDisplayKey: nodeTemplateIndex[type].stateDisplayKey,
          state: new LiveObject2(nodeTemplateIndex[type].state),
          parentNode: liveTreeNode ?? null,
          childNodes: new LiveMap2([])
        });
        liveTreeMap.set(newLiveTreeNode.get("nodeId"), newLiveTreeNode);
        liveTreeNode.get("childNodes").set(newLiveTreeNode.get("nodeId"), newLiveTreeNode);
        const newNode = createRuntimeNode(runtimeNode, newLiveTreeNode);
        runtimeNode.childNodes.add(newNode);
        return newNode;
      },
      useChildNodes: () => useStorage(() => liveTreeNode.get("childNodes").values()),
      useRead: (key) => useStorage(() => liveTreeNode.get("state").get(key)),
      read: (key) => liveTreeNode?.get("state").get(key),
      update: (key, value) => liveTreeNode?.get("state").set(key, value),
      delete: () => {
        const deleteChildren = (liveTreeNode2) => {
          liveTreeMap.delete(liveTreeNode2.get("nodeId"));
          liveTreeNode2.get("childNodes").forEach((liveTreeNode3) => {
            deleteChildren(liveTreeNode3);
          });
        };
        deleteChildren(liveTreeNode);
        liveTreeNode.get("parentNode")?.get("childNodes").delete(liveTreeNode.get("nodeId"));
      }
    };
    return runtimeNode;
  };
  const buildTree = (runtimeNode, liveTreeNode) => {
    liveTreeNode.get("childNodes").forEach((liveTreeNode2) => {
      runtimeNode.childNodes.add(buildTree(
        createRuntimeNode(runtimeNode, liveTreeNode2),
        liveTreeNode2
      ));
    });
    return runtimeNode;
  };
  return buildTree(
    {
      type: "Root",
      childNodes: /* @__PURE__ */ new Set()
    },
    liveTreeRoot
  );
};

// src/environments/shared/factory/types/RootLiveTreeNode.ts
import { LiveMap as LiveMap3, LiveObject as LiveObject3 } from "@liveblocks/client";
var RootLiveTreeNode = class extends LiveObject3 {
  constructor() {
    super({
      nodeId: "root",
      type: "Root",
      childNodes: new LiveMap3([])
    });
  }
};

// src/environments/shared/factory/types/LiveTreeMap.ts
import { LiveMap as LiveMap4 } from "@liveblocks/client";
var LiveTreeMap = class extends LiveMap4 {
  constructor(data) {
    super(data);
  }
};

// src/environments/shared/factory/initializeStorageObjects.ts
var getLiveTreeStorageObjects = async (liveblocksClient, roomId, liveblocksPresence) => {
  const room = liveblocksClient.enter(roomId, {
    initialPresence: liveblocksPresence,
    initialStorage: (() => {
      const rootLiveTreeNode = new RootLiveTreeNode();
      return {
        liveTreeRoot: rootLiveTreeNode,
        liveTreeMap: new LiveTreeMap([
          [rootLiveTreeNode.get("nodeId"), rootLiveTreeNode]
        ])
      };
    })()
  });
  const { root } = await room.getStorage();
  const liveTreeRoot = root.get("liveTreeRoot");
  const liveTreeMap = root.get("liveTreeMap");
  return { liveTreeRoot, liveTreeMap };
};

// src/environments/shared/factory/configureLiveTreeStorage.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var configureLiveTreeStorage = (NodeTemplateTree, liveblocksPresence, createClientProps) => {
  const liveblocksClient = createClient2(createClientProps);
  const { suspense: liveblocks } = createRoomContext2(liveblocksClient);
  const LiveTreeRootNodeContext = createContext(null);
  const useLiveTreeRootNode = () => useContext(LiveTreeRootNodeContext);
  const LiveTreeRootNodeProvider = ({
    roomId,
    children
  }) => {
    const [liveTreeRootNode, setLiveTreeRootNode] = useState(null);
    useEffect(() => {
      (async () => {
        const { liveTreeRoot, liveTreeMap } = await getLiveTreeStorageObjects(
          liveblocksClient,
          roomId,
          liveblocksPresence
        );
        setLiveTreeRootNode(createRootNodeFactory(
          NodeTemplateTree,
          liveTreeRoot,
          liveTreeMap,
          liveblocks.useStorage
        ));
      })();
    }, []);
    return /* @__PURE__ */ jsx2(
      liveblocks.RoomProvider,
      {
        id: roomId,
        initialPresence: liveblocksPresence,
        children: liveTreeRootNode && /* @__PURE__ */ jsx2(LiveTreeRootNodeContext.Provider, { value: liveTreeRootNode, children })
      }
    );
  };
  return {
    LiveTreeRootNodeProvider,
    useLiveTreeRootNode
  };
};
export {
  configureLiveTreeStorage,
  createNodeEntry,
  liveblocksBrowserConfig
};
