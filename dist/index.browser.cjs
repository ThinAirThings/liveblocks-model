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
  ClassOfLiveTreeNodeFactory: () => ClassOfLiveTreeNodeFactory,
  LiveTreeBrowserConfig: () => LiveTreeBrowserConfig,
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

// src/environments/shared/oop/LiveTreeBrowserConfig.tsx
var import_react4 = require("react");

// src/environments/shared/oop/initializeLiveTree.ts
var import_client4 = require("@liveblocks/client");

// src/environments/shared/oop/ClassOfLiveTreeNodeFactory.ts
var import_client3 = require("@liveblocks/client");
var import_uuid2 = require("uuid");
var ClassOfLiveTreeNodeFactory = (NodeIndex, useStorage, liveNodeMap) => {
  var _a;
  return _a = class {
    //    ___             _               _           
    //   / __|___ _ _  __| |_ _ _ _  _ __| |_ ___ _ _ 
    //  | (__/ _ \ ' \(_-<  _| '_| || / _|  _/ _ \ '_|
    //   \___\___/_||_/__/\__|_|  \_,_\__|\__\___/_|  
    constructor(type, parentNode, liveDataNode) {
      this.childNodes = /* @__PURE__ */ new Set();
      //   __  __     _   _            _    
      //  |  \/  |___| |_| |_  ___  __| |___
      //  | |\/| / -_)  _| ' \/ _ \/ _` (_-<
      //  |_|  |_\___|\__|_||_\___/\__,_/__/
      this.update = (key, value) => {
        this.state.set(key, value);
      };
      this.useState = (key) => useStorage(({ nodeMap }) => nodeMap.get(this.nodeId)?.state[key]);
      if (liveDataNode) {
        this.liveDataNode = liveDataNode;
      } else {
        this.liveDataNode = new import_client3.LiveObject({
          nodeId: type === "root" ? null : (0, import_uuid2.v4)(),
          parentNodeId: parentNode?.nodeId ?? null,
          type,
          ...type !== "root" ? {
            metadata: { ...NodeIndex[type].metadata, createdAt: (/* @__PURE__ */ new Date()).toISOString() },
            state: new import_client3.LiveObject({ ...NodeIndex[type].state }),
            parentType: NodeIndex[type].parentType,
            stateDisplayKey: NodeIndex[type].stateDisplayKey
          } : {}
        });
        type !== "root" && liveNodeMap.set(this.nodeId, this.liveDataNode);
      }
      this.parentNode = parentNode;
      this.parentNode?.childNodes.add(this);
    }
    get nodeId() {
      return this.liveDataNode.get("nodeId");
    }
    get type() {
      return this.liveDataNode.get("type");
    }
    get state() {
      return this.liveDataNode.get("state");
    }
    get stateDisplayKey() {
      return this.liveDataNode.get("stateDisplayKey");
    }
    get metadata() {
      return this.liveDataNode.get("metadata");
    }
    get parentType() {
      return this.liveDataNode.get("parentType");
    }
  }, //   ___ _        _   _    
  //  / __| |_ __ _| |_(_)__ 
  //  \__ \  _/ _` |  _| / _|
  //  |___/\__\__,_|\__|_\__|
  _a.liveNodeMap = liveNodeMap, (() => {
    const buildTree = (node) => {
      liveNodeMap.forEach(
        (nextDataNode) => nextDataNode.get("parentNodeId") === node.nodeId && node.childNodes.add(
          buildTree(new _a(
            nextDataNode.get("type"),
            node,
            nextDataNode
          ))
        )
      );
      return node;
    };
    _a.root = buildTree(new _a("root", null));
  })(), _a;
};

// src/environments/shared/oop/initializeLiveTree.ts
var import_react3 = require("@liveblocks/react");
var initializeLiveTree = async (roomId, NodeIndex, createClientProps, liveblocksPresence) => {
  const liveblocksClient = (0, import_client4.createClient)(createClientProps);
  const room = liveblocksClient.enter(roomId, {
    initialPresence: liveblocksPresence,
    initialStorage: { nodeMap: new import_client4.LiveMap() }
  });
  const { suspense: liveblocks } = (0, import_react3.createRoomContext)(liveblocksClient);
  const { root } = await room.getStorage();
  const liveNodeMap = root.get("nodeMap");
  const LiveTreeNode = ClassOfLiveTreeNodeFactory(
    NodeIndex,
    liveblocks.useStorage,
    liveNodeMap
  );
  return LiveTreeNode;
};

// src/environments/shared/oop/LiveTreeBrowserConfig.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var LiveTreeBrowserConfig = (NodeIndex, liveblocksPresence) => {
  const LiveTreeNodeRootContext = (0, import_react4.createContext)(null);
  const useLiveTreeNodeRoot = () => (0, import_react4.useContext)(LiveTreeNodeRootContext);
  const LiveTreeNodeRootProvider = ({
    roomId,
    createClientProps,
    children
  }) => {
    const [LiveTreeNodeRoot, setLiveTreeNodeRoot] = (0, import_react4.useState)(null);
    (0, import_react4.useEffect)(() => {
      (async () => {
        const LiveTreeNode = await initializeLiveTree(
          roomId,
          NodeIndex,
          createClientProps,
          liveblocksPresence
        );
        LiveTreeNode.root.childNodes.forEach((ChildNode) => {
          ChildNode.type;
        });
        setLiveTreeNodeRoot(LiveTreeNode.root);
      })();
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: LiveTreeNodeRoot && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LiveTreeNodeRootContext.Provider, { value: LiveTreeNodeRoot, children }) });
  };
  return {
    LiveTreeNodeRootProvider,
    useLiveTreeNodeRoot
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClassOfLiveTreeNodeFactory,
  LiveTreeBrowserConfig,
  createNodeEntry,
  liveblocksBrowserConfig
});
