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

// src/environments/shared/factory/RuntimeNode/createRuntimeNode.ts
import { LiveMap as LiveMap2, LiveObject as LiveObject2 } from "@liveblocks/client";

// src/environments/shared/factory/LiveObjects/LiveTreeNode.ts
import { LiveObject } from "@liveblocks/client";
var LiveTreeNode = class extends LiveObject {
  constructor(data) {
    super(data);
  }
};

// src/environments/shared/factory/RuntimeNode/createRuntimeNode.ts
import { v4 as uuidv4 } from "uuid";
import isEqual from "lodash.isequal";
var createRuntimeNode = (parentRuntimeNode, liveTreeNode, templateNode, runtimeNodeMap, useStorage) => {
  const runtimeNode = {
    runtimeNodeMap,
    liveTreeNode,
    parentNode: parentRuntimeNode,
    nodeId: liveTreeNode.get("nodeId"),
    type: liveTreeNode.get("type"),
    metadata: liveTreeNode.get("metadata"),
    childNodes: new Map(
      [...liveTreeNode.get("childNodes").entries()].map(([nodeId, nextLiveTreeNode]) => [nodeId, createRuntimeNode(
        runtimeNode,
        nextLiveTreeNode,
        templateNode.childNodes[nextLiveTreeNode.get("type")],
        runtimeNodeMap,
        useStorage
      )])
    ),
    create: (type) => {
      const newLiveTreeNode = new LiveTreeNode({
        metadata: {
          ...templateNode.childNodes[type].metadata,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        nodeId: uuidv4(),
        type,
        parentNodeId: liveTreeNode.get("nodeId") ?? null,
        parentType: liveTreeNode.get("type") ?? null,
        stateDisplayKey: templateNode.childNodes[type].stateDisplayKey,
        state: new LiveObject2(templateNode.childNodes[type].state),
        childNodes: new LiveMap2([])
      });
      runtimeNodeMap.set(runtimeNode.nodeId, runtimeNode);
      liveTreeNode.get("childNodes").set(newLiveTreeNode.get("nodeId"), newLiveTreeNode);
      const newNode = createRuntimeNode(runtimeNode, newLiveTreeNode, templateNode.childNodes[type], runtimeNodeMap, useStorage);
      return newNode;
    },
    useData: (key) => useStorage(() => liveTreeNode.toImmutable().state[key]),
    mutate: (key, value) => liveTreeNode.get("state").set(key, value),
    delete: () => {
      const deleteFromRuntimeMap = (runtimeNode2) => {
        runtimeNodeMap.delete(runtimeNode2.nodeId);
        runtimeNode2.childNodes.forEach((childRuntimeNode) => {
          deleteFromRuntimeMap(childRuntimeNode);
        });
      };
      deleteFromRuntimeMap(runtimeNode);
      runtimeNodeMap.get(parentRuntimeNode.nodeId).liveTreeNode.get("childNodes").delete(liveTreeNode.get("nodeId"));
    },
    useChildNodes: () => useStorage(() => {
      return new Set([...liveTreeNode.toImmutable().childNodes].map(([nodeId, immutableChildNode]) => {
        return {
          nodeId: immutableChildNode.nodeId,
          type: immutableChildNode.type,
          metadata: immutableChildNode.metadata,
          create: runtimeNode.childNodes.get(nodeId).create,
          useChildNodes: runtimeNode.childNodes.get(nodeId).useChildNodes,
          useData: runtimeNode.childNodes.get(nodeId).useData,
          mutate: runtimeNode.childNodes.get(nodeId).mutate,
          delete: runtimeNode.childNodes.get(nodeId).delete
        };
      }));
    }, (a, b) => isEqual(a, b))
  };
  return runtimeNode;
};

// src/environments/shared/factory/RuntimeNode/createRootRuntimeNode.ts
var createRootRuntimeNode = (rootNodeTemplate, rootLiveTreeNode, useStorage) => createRuntimeNode(
  null,
  rootLiveTreeNode,
  rootNodeTemplate,
  /* @__PURE__ */ new Map(),
  useStorage
);

// src/environments/shared/factory/LiveObjects/LiveTreeRootNode.ts
import { LiveMap as LiveMap3, LiveObject as LiveObject3 } from "@liveblocks/client";
var LiveTreeRootNode = class extends LiveTreeNode {
  constructor() {
    super({
      nodeId: "root",
      type: "Root",
      metadata: {},
      parentNodeId: null,
      parentType: null,
      state: new LiveObject3({}),
      stateDisplayKey: "root",
      childNodes: new LiveMap3([])
    });
  }
};

// src/environments/shared/factory/initializeLiveTreeRootNode.ts
var initializeLiveTreeRootNode = async (liveblocksClient, roomId, liveblocksPresence) => {
  const room = liveblocksClient.enter(roomId, {
    initialPresence: liveblocksPresence,
    initialStorage: {
      liveTreeRootNode: new LiveTreeRootNode()
    }
  });
  const { root } = await room.getStorage();
  return root.get("liveTreeRootNode");
};

// src/environments/shared/factory/configureLiveTreeStorage.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var configureLiveTreeStorage = (rootNodeTemplate, liveblocksPresence, createClientProps) => {
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
        const liveTreeRootNode2 = await initializeLiveTreeRootNode(
          liveblocksClient,
          roomId,
          liveblocksPresence
        );
        setLiveTreeRootNode(createRootRuntimeNode(
          rootNodeTemplate,
          liveTreeRootNode2,
          liveblocks.useStorage
        ));
      })();
    }, []);
    return /* @__PURE__ */ jsx2(
      liveblocks.RoomProvider,
      {
        id: roomId,
        initialPresence: liveblocksPresence,
        initialStorage: { liveTreeRootNode: new LiveTreeRootNode() },
        children: liveTreeRootNode && /* @__PURE__ */ jsx2(LiveTreeRootNodeContext.Provider, { value: liveTreeRootNode, children })
      }
    );
  };
  return {
    LiveTreeRootNodeProvider,
    useLiveTreeRootNode
  };
};

// src/environments/shared/factory/NodeTemplate/createNodeTemplate.ts
var createNodeTemplate = (type, props, childNodes) => {
  return {
    type,
    metadata: props.metadata,
    stateDisplayKey: props.stateDisplayKey,
    state: props.state,
    childNodes: childNodes ?? null
    // This is perfectly legal to get typescript to handle the optional undefined case.
    // This happens because you can't mix type parameters and runtime parameters.
  };
};

// src/environments/shared/factory/NodeTemplate/createRootNodeTemplate.ts
var createRootNodeTemplate = (childNodes) => createNodeTemplate("RootNode", {
  metadata: {},
  state: { root: "root" },
  stateDisplayKey: "root"
}, childNodes);
export {
  configureLiveTreeStorage,
  createNodeEntry,
  createNodeTemplate,
  createRootNodeTemplate,
  liveblocksBrowserConfig
};
