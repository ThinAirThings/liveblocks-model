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
var import_client7 = require("@liveblocks/client");
var import_react3 = require("@liveblocks/react");
var import_react4 = require("react");

// src/environments/shared/factory/createRootNodeFactory.ts
var import_client4 = require("@liveblocks/client");

// src/environments/shared/factory/types/LiveTreeNode.ts
var import_client3 = require("@liveblocks/client");
var LiveTreeNode = class extends import_client3.LiveObject {
  constructor(data) {
    super(data);
  }
};

// src/environments/shared/factory/createRootNodeFactory.ts
var import_uuid2 = require("uuid");

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
          nodeId: (0, import_uuid2.v4)(),
          type,
          parentNodeId: liveTreeNode.get("nodeId") ?? null,
          parentType: liveTreeNode.get("type") ?? null,
          stateDisplayKey: nodeTemplateIndex[type].stateDisplayKey,
          state: new import_client4.LiveObject(nodeTemplateIndex[type].state),
          parentNode: liveTreeNode ?? null,
          childNodes: new import_client4.LiveMap([])
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
var import_client5 = require("@liveblocks/client");
var RootLiveTreeNode = class extends import_client5.LiveObject {
  constructor() {
    super({
      nodeId: "root",
      type: "Root",
      childNodes: new import_client5.LiveMap([])
    });
  }
};

// src/environments/shared/factory/types/LiveTreeMap.ts
var import_client6 = require("@liveblocks/client");
var LiveTreeMap = class extends import_client6.LiveMap {
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
var import_jsx_runtime2 = require("react/jsx-runtime");
var configureLiveTreeStorage = (NodeTemplateTree, liveblocksPresence, createClientProps) => {
  const liveblocksClient = (0, import_client7.createClient)(createClientProps);
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      liveblocks.RoomProvider,
      {
        id: roomId,
        initialPresence: liveblocksPresence,
        children: liveTreeRootNode && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LiveTreeRootNodeContext.Provider, { value: liveTreeRootNode, children })
      }
    );
  };
  return {
    LiveTreeRootNodeProvider,
    useLiveTreeRootNode
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configureLiveTreeStorage,
  createNodeEntry,
  liveblocksBrowserConfig
});
