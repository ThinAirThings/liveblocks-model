"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.browser.ts
var index_browser_exports = {};
__export(index_browser_exports, {
  configureLiveTreeStorage: () => configureLiveTreeStorage,
  createNodeEntry: () => createNodeEntry,
  createNodeTemplate: () => createNodeTemplate,
  createRootNodeTemplate: () => createRootNodeTemplate,
  liveblocksBrowserConfig: () => liveblocksBrowserConfig
});
module.exports = __toCommonJS(index_browser_exports);

// src/model/data-model.ts
var createNodeEntry = ({
  parentType,
  nodeMeta,
  state,
  stateDisplayKey
}) => ({
  parentType,
  nodeMeta,
  state,
  stateDisplayKey
});

// src/environments/browser/liveblocksBrowserConfig.tsx
var import_client2 = require("@liveblocks/client");
var import_react2 = require("@liveblocks/react");

// src/environments/browser/LiveblocksBrowserProviderFactory.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var LiveblocksBrowserProviderFactory = (RoomProvider, initialLiveblocksPresence, initialLiveblocksStorage) => ({
  roomId,
  Loading,
  children
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    RoomProvider,
    {
      id: roomId,
      initialPresence: initialLiveblocksPresence,
      initialStorage: initialLiveblocksStorage,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loading, {}), children })
    }
  );
};

// src/environments/shared/hooks/useCreateNodeFactory.ts
var import_client = require("@liveblocks/client");
var import_uuid = require("uuid");
var useCreateNodeFactory = (NodeIndex, useMutation) => () => {
  return useMutation(({ storage }, parentNodeId, type, state) => {
    const nodeId = (0, import_uuid.v4)();
    const node = new import_client.LiveObject({
      nodeId,
      type,
      parentNodeId,
      parentType: NodeIndex[type].parentType,
      nodeMeta: {
        ...NodeIndex[type].nodeMeta,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      children: new import_client.LiveList([]),
      stateDisplayKey: NodeIndex[type].stateDisplayKey,
      state: new import_client.LiveObject({
        ...NodeIndex[type].state,
        ...state
      })
    });
    storage.get("nodeMap").set(nodeId, node);
    return {
      ...node.toImmutable(),
      state: void 0
    };
  }, []);
};

// src/environments/shared/hooks/useNodeStateFactory.ts
var useNodeStateFactory = (useStorage, useMutation) => (node, stateKey) => {
  const nodeState = useStorage((storage) => {
    return storage.nodeMap.get(node?.nodeId ?? "")?.state?.[stateKey] ?? null;
  });
  const mutation = useMutation(({ storage }, value) => {
    storage.get("nodeMap").get(node?.nodeId ?? "")?.get("state").set(stateKey, value);
  }, [node, stateKey]);
  return [nodeState, mutation, node ? true : false];
};

// src/environments/shared/hooks/useDeleteNodeFactory.ts
var useDeleteNodeFactory = (useMutation) => () => {
  return useMutation(({ storage }, nodeId) => {
    const liveNodeMap = storage.get("nodeMap");
    const nodeMap = liveNodeMap.toImmutable();
    const chainDelete = (targetNodeId) => {
      liveNodeMap.delete(targetNodeId);
      const next = [...nodeMap].filter(([_, node]) => node.parentNodeId === targetNodeId);
      next.forEach(([nodeId2]) => chainDelete(nodeId2));
    };
    chainDelete(nodeId);
  }, []);
};

// src/environments/shared/hooks/useNodeMapFactory.ts
var import_lodash = __toESM(require("lodash.isequal"), 1);
var useNodeMapFactory = (useStorage) => (nodeFilter) => {
  return useStorage((root) => {
    return nodeFilter ? new Map([...root.nodeMap].filter(nodeFilter)) : root.nodeMap;
  }, (a, b) => (0, import_lodash.default)(a, b));
};

// src/environments/shared/hooks/useNodeNameStateFactory.ts
var useNodeNameStateFactory = (useStorage, useMutation) => (nodeId) => {
  const nodeState = useStorage((storage) => {
    const node = storage.nodeMap.get(nodeId);
    return node.state[node.stateDisplayKey];
  });
  const mutation = useMutation(({ storage }, value) => {
    const node = storage.get("nodeMap").get(nodeId);
    node.get("state").set(node.get("stateDisplayKey"), value);
  }, []);
  return [nodeState, mutation];
};

// src/environments/shared/hooks/useNodeIdFromTreeClimbFactory.ts
var useNodeIdFromTreeClimbFactory = (useStorage) => (nodeId, nodeType) => {
  const targetNodeId = useStorage(({ nodeMap }) => {
    const climbForTargetNode = (nodeId2) => {
      const node = nodeMap.get(nodeId2);
      if (!node)
        return null;
      if (node.type === nodeType) {
        return nodeId2;
      }
      if (node.parentNodeId === null) {
        return null;
      }
      return climbForTargetNode(node.parentNodeId);
    };
    return climbForTargetNode(nodeId);
  });
  if (!targetNodeId) {
    throw new Error(`Node of type ${nodeType} not found in tree climb`);
  }
  return targetNodeId;
};

// src/environments/shared/hooks/useStatelessNodeMapFactory.ts
var import_lodash2 = __toESM(require("lodash.isequal"), 1);
var useStatelessNodeMapFactory = (useStorage) => (nodeFilter) => {
  return useStorage((root) => {
    return nodeFilter ? new Map(
      [...root.nodeMap].filter(nodeFilter).map(([nodeId, node]) => [nodeId, {
        nodeId: node.nodeId,
        type: node.type,
        parentNodeId: node.parentNodeId,
        parentType: node.parentType,
        nodeMeta: node.nodeMeta,
        stateDisplayKey: node.stateDisplayKey
      }])
    ) : new Map(
      [...root.nodeMap].map(([nodeId, node]) => [nodeId, {
        nodeId: node.nodeId,
        type: node.type,
        parentNodeId: node.parentNodeId,
        parentType: node.parentType,
        nodeMeta: node.nodeMeta,
        stateDisplayKey: node.stateDisplayKey
      }])
    );
  }, (a, b) => (0, import_lodash2.default)(a, b));
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (NodeIndex, useStorage, useMutation) => {
  const useNodeIdFromTreeClimb = useNodeIdFromTreeClimbFactory(useStorage);
  return {
    // Meta
    // useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    // Nodes -- Mutation
    useNodeMap: useNodeMapFactory(
      useStorage
    ),
    useStatelessNodeMap: useStatelessNodeMapFactory(
      useStorage
    ),
    useNodeIdFromTreeClimb,
    useCreateNode: useCreateNodeFactory(
      NodeIndex,
      useMutation
    ),
    useNodeState: useNodeStateFactory(
      useStorage,
      useMutation
    ),
    useNodeNameState: useNodeNameStateFactory(
      useStorage,
      useMutation
    ),
    useDeleteNode: useDeleteNodeFactory(
      useMutation
    )
  };
};

// src/environments/browser/liveblocksBrowserConfig.tsx
var liveblocksBrowserConfig = (NodeIndex, createClientProps, initialLiveblocksPresence, initialLiveblocksStorage) => {
  const {
    suspense: liveblocks
  } = (0, import_react2.createRoomContext)((0, import_client2.createClient)(createClientProps));
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
var import_client6 = require("@liveblocks/client");
var import_react3 = require("@liveblocks/react");
var import_react4 = require("react");

// src/environments/shared/factory/RuntimeNode/createRuntimeNode.ts
var import_client4 = require("@liveblocks/client");

// src/environments/shared/factory/LiveObjects/LiveTreeNode.ts
var import_client3 = require("@liveblocks/client");
var LiveTreeNode = class extends import_client3.LiveObject {
  constructor(data) {
    super(data);
  }
};

// src/environments/shared/factory/RuntimeNode/createRuntimeNode.ts
var import_uuid2 = require("uuid");
var import_lodash3 = __toESM(require("lodash.isequal"), 1);
var createRuntimeNode = (parentRuntimeNode, liveTreeNode, templateNode, runtimeNodeMap, useStorage) => {
  const runtimeNode = {
    runtimeNodeMap,
    liveTreeNode,
    parentNode: parentRuntimeNode,
    nodeId: liveTreeNode.get("nodeId"),
    type: liveTreeNode.get("type"),
    metadata: liveTreeNode.get("metadata"),
    create: (type) => {
      const newLiveTreeNode = new LiveTreeNode({
        metadata: {
          ...templateNode.childNodes[type].metadata,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        nodeId: (0, import_uuid2.v4)(),
        type,
        parentNodeId: liveTreeNode.get("nodeId") ?? null,
        parentType: liveTreeNode.get("type") ?? null,
        stateDisplayKey: templateNode.childNodes[type].stateDisplayKey,
        state: new import_client4.LiveObject(templateNode.childNodes[type].state),
        childNodes: new import_client4.LiveMap([])
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
    }, (a, b) => (0, import_lodash3.default)(a, b)),
    childNodes: null
    // Deferred until object is initialized,
  };
  runtimeNode["childNodes"] = new Map(
    [...liveTreeNode.get("childNodes").entries()].map(([nodeId, nextLiveTreeNode]) => [nodeId, createRuntimeNode(
      runtimeNode,
      nextLiveTreeNode,
      templateNode.childNodes[nextLiveTreeNode.get("type")],
      runtimeNodeMap,
      useStorage
    )])
  );
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
var import_client5 = require("@liveblocks/client");
var LiveTreeRootNode = class extends LiveTreeNode {
  constructor() {
    super({
      nodeId: "root",
      type: "Root",
      metadata: {},
      parentNodeId: null,
      parentType: null,
      state: new import_client5.LiveObject({}),
      stateDisplayKey: "root",
      childNodes: new import_client5.LiveMap([])
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
var import_jsx_runtime2 = require("react/jsx-runtime");
var configureLiveTreeStorage = (rootNodeTemplate, liveblocksPresence, createClientProps) => {
  const liveblocksClient = (0, import_client6.createClient)(createClientProps);
  const { suspense: liveblocks } = (0, import_react3.createRoomContext)(liveblocksClient);
  const LiveTreeRootNodeContext = (0, import_react4.createContext)(null);
  const useLiveTreeRootNode = () => (0, import_react4.useContext)(LiveTreeRootNodeContext);
  const LiveTreeRootNodeProvider = ({
    roomId,
    children
  }) => {
    const [liveTreeRootNode, setLiveTreeRootNode] = (0, import_react4.useState)(null);
    (0, import_react4.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      liveblocks.RoomProvider,
      {
        id: roomId,
        initialPresence: liveblocksPresence,
        initialStorage: { liveTreeRootNode: new LiveTreeRootNode() },
        children: liveTreeRootNode && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LiveTreeRootNodeContext.Provider, { value: liveTreeRootNode, children })
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configureLiveTreeStorage,
  createNodeEntry,
  createNodeTemplate,
  createRootNodeTemplate,
  liveblocksBrowserConfig
});
