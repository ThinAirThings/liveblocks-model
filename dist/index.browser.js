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
var createRuntimeNode = (parentRuntimeNode, liveTreeNode, templateNode, useStorage) => {
  const runtimeNode = {
    parentNode: parentRuntimeNode,
    nodeId: liveTreeNode.get("nodeId"),
    type: liveTreeNode.get("type"),
    metadata: liveTreeNode.get("metadata"),
    childNodes: new Map(
      [...liveTreeNode.get("childNodes").entries()].map(([nodeId, nextLiveTreeNode]) => [nodeId, createRuntimeNode(
        runtimeNode,
        nextLiveTreeNode,
        templateNode.childNodes[nextLiveTreeNode.get("type")],
        useStorage
      )])
    ),
    create: (type) => {
      const newLiveTreeNode = new LiveTreeNode({
        liveTreeMap: liveTreeNode.get("liveTreeMap"),
        metadata: templateNode.childNodes[type].metadata,
        nodeId: uuidv4(),
        type,
        parentNodeId: liveTreeNode.get("nodeId") ?? null,
        parentType: liveTreeNode.get("type") ?? null,
        stateDisplayKey: templateNode.childNodes[type].stateDisplayKey,
        state: new LiveObject2(templateNode.childNodes[type].state),
        parentNode: liveTreeNode ?? null,
        childNodes: new LiveMap2([])
      });
      liveTreeNode.get("liveTreeMap").set(newLiveTreeNode.get("nodeId"), newLiveTreeNode);
      liveTreeNode.get("childNodes").set(newLiveTreeNode.get("nodeId"), newLiveTreeNode);
      const newNode = createRuntimeNode(runtimeNode, newLiveTreeNode, templateNode.childNodes[type], useStorage);
      templateNode.childNodes[type].childNodes.push(newNode);
      return newNode;
    },
    useData: (key) => useStorage((root) => root.liveTreeMap.get(liveTreeNode.get("nodeId")).state[key]),
    mutate: (key, value) => liveTreeNode.get("state").set(key, value),
    delete: () => {
      const deleteChildren = (liveTreeNode2) => {
        liveTreeNode2.get("liveTreeMap").delete(liveTreeNode2.get("nodeId"));
        liveTreeNode2.get("childNodes").forEach((liveTreeNode3) => {
          deleteChildren(liveTreeNode3);
        });
      };
      deleteChildren(liveTreeNode);
      liveTreeNode.get("parentNode")?.get("childNodes").delete(liveTreeNode.get("nodeId"));
    },
    useChildNodes: () => useStorage((root) => {
      return new Set([...root.liveTreeMap.get(liveTreeNode.get("nodeId")).childNodes].map(([nodeId, immutableChildNode]) => {
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
  useStorage
);

// src/environments/shared/factory/types/RootLiveTreeNode.ts
import { LiveMap as LiveMap3, LiveObject as LiveObject3 } from "@liveblocks/client";
var RootLiveTreeNode = class extends LiveTreeNode {
  constructor(liveTreeMap) {
    super({
      liveTreeMap,
      nodeId: "root",
      type: "Root",
      metadata: {},
      parentNode: null,
      parentNodeId: null,
      parentType: null,
      state: new LiveObject3({}),
      stateDisplayKey: "root",
      childNodes: new LiveMap3([])
    });
  }
};

// src/environments/shared/factory/LiveObjects/LiveTreeMap.ts
import { LiveMap as LiveMap4 } from "@liveblocks/client";
var LiveTreeMap = class extends LiveMap4 {
  constructor(data) {
    super(data);
  }
};

// src/environments/shared/factory/initializeLiveTreeStorageObjects.ts
var initializeLiveTreeStorageObjects = async (liveblocksClient, roomId, liveblocksPresence) => {
  const room = liveblocksClient.enter(roomId, {
    initialPresence: liveblocksPresence,
    initialStorage: (() => {
      const liveTreeMap2 = new LiveTreeMap([]);
      const rootLiveTreeNode = new RootLiveTreeNode(liveTreeMap2);
      console.log("Root live tree node", rootLiveTreeNode);
      return {
        liveTreeRoot: rootLiveTreeNode,
        liveTreeMap: new LiveTreeMap([
          [rootLiveTreeNode.get("nodeId"), rootLiveTreeNode]
        ])
      };
    })()
  });
  const { root } = await room.getStorage();
  console.log(root.toImmutable());
  const liveTreeRoot = root.get("liveTreeRoot");
  console.log(liveTreeRoot);
  const liveTreeMap = root.get("liveTreeMap");
  return { liveTreeRoot, liveTreeMap };
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
        const { liveTreeRoot, liveTreeMap } = await initializeLiveTreeStorageObjects(
          liveblocksClient,
          roomId,
          liveblocksPresence
        );
        setLiveTreeRootNode(createRootRuntimeNode(
          rootNodeTemplate,
          liveTreeRoot,
          liveblocks.useStorage
        ));
      })();
    }, []);
    return /* @__PURE__ */ jsx2(
      liveblocks.RoomProvider,
      {
        id: roomId,
        initialPresence: liveblocksPresence,
        initialStorage: (() => {
          const liveTreeMap = new LiveTreeMap([]);
          const rootLiveTreeNode = new RootLiveTreeNode(liveTreeMap);
          liveTreeMap.set(rootLiveTreeNode.get("nodeId"), rootLiveTreeNode);
          console.log("Root live tree node", rootLiveTreeNode);
          return {
            liveTreeRoot: rootLiveTreeNode,
            liveTreeMap
          };
        })(),
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
