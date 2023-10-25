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
  UixNode: () => UixNode,
  configureLiveFilesystemStorage: () => configureLiveFilesystemStorage,
  createNodeEntry: () => createNodeEntry,
  createRootNodeTemplate: () => createRootNodeTemplate,
  createSimpleStateNodeTemplate: () => createSimpleStateNodeTemplate,
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

// src/environments/shared/filesystem/configureLiveFilesystemStorage.tsx
var import_client6 = require("@liveblocks/client");
var import_react4 = require("@liveblocks/react");
var import_react5 = require("react");

// src/environments/shared/filesystem/UixNode/UixNode.ts
var import_client4 = require("@liveblocks/client");
var import_uuid2 = require("uuid");

// src/environments/shared/filesystem/LiveObjects/LiveIndexNode.ts
var import_client3 = require("@liveblocks/client");
var LiveIndexNode = class extends import_client3.LiveObject {
  constructor(data) {
    super(data);
  }
};

// src/environments/shared/filesystem/UixNode/UixNode.ts
var import_react3 = require("react");
var import_immer = require("immer");
var UixNode = class {
  constructor(liveIndexRoom, liveNodeMap, parentNode, nodeId, nodeTemplate) {
    this.liveIndexRoom = liveIndexRoom;
    this.liveNodeMap = liveNodeMap;
    this.parentNode = parentNode;
    this.nodeTemplate = nodeTemplate;
    this.childTypeIsKey = (childType) => this.childTemplatesMap.has(childType);
    this.useChildNodeTypeMap = (childType) => (0, import_react3.useSyncExternalStore)((callback) => {
      const unsubscribe = this.liveIndexRoom.subscribe(this.liveNodeMap.get(this.liveIndexNode.get("nodeId")), callback);
      return () => unsubscribe();
    }, () => {
      if (!this.childTypeIsKey(childType))
        throw new Error(`Child type ${childType} does not exist on node type ${this.nodeTemplate.customType}`);
      return (0, import_immer.produce)(this.baseStateChildNodeTypeMaps.get(childType), (draft) => {
        const liveNodeIds = /* @__PURE__ */ new Set([...this.liveIndexNode.get("childNodeIds").keys()]);
        const draftNodeIds = new Set([...draft].map(([nodeId]) => nodeId));
        draftNodeIds.forEach((nodeId) => !liveNodeIds.has(nodeId) && draft.delete(nodeId));
        liveNodeIds.forEach(
          (liveNodeId) => !draftNodeIds.has(liveNodeId) && draft.set(liveNodeId, this.childNodeTypeMaps.get(childType).get(liveNodeId))
        );
      });
    });
    this.liveIndexNode = this.liveNodeMap.get(nodeId);
    this.childTemplatesMap = new Map(Object.entries(nodeTemplate.childTemplates));
    this.childNodeTypeMaps = new Map(
      [...this.childTemplatesMap].map(
        ([childType, childTemplate]) => [childType, new Map([...this.liveIndexNode.get("childNodeIds")].map(
          ([nodeId2]) => [nodeId2, new childTemplate.Constructor(
            liveIndexRoom,
            liveNodeMap,
            this,
            nodeId2,
            childTemplate
          )]
        ))]
      )
    );
    this.baseStateChildNodeTypeMaps = new Map(
      [...this.childNodeTypeMaps].map(
        ([childType, childNodeTypeMap]) => [childType, new Map([...childNodeTypeMap])]
      )
    );
  }
  get nodeId() {
    return this.liveIndexNode.get("nodeId");
  }
  get uixNodeType() {
    return this.liveIndexNode.get("uixNodeType");
  }
  // These should be type declared in the Subtype
  get state() {
    return this.liveIndexNode.get("state");
  }
  get customType() {
    return this.liveIndexNode.get("customType");
  }
  get metadata() {
    return this.liveIndexNode.get("metadata");
  }
  createChild(childType) {
    if (!this.childTypeIsKey(childType))
      throw new Error(`Child type ${childType} does not exist on node type ${this.nodeTemplate.customType}`);
    const childTemplate = this.childTemplatesMap.get(childType);
    console.log(childTemplate);
    const newLiveIndexNode = new LiveIndexNode({
      nodeId: (0, import_uuid2.v4)(),
      metadata: {
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      uixNodeType: childTemplate.Constructor.nodeType,
      customType: childType,
      parentNodeId: this.nodeId,
      parentType: this.customType,
      childNodeIds: new import_client4.LiveMap(),
      stateDisplayKey: "",
      // Deal with this later,
      state: new import_client4.LiveObject({
        ...childTemplate.initialState
      })
    });
    this.liveNodeMap.set(newLiveIndexNode.get("nodeId"), newLiveIndexNode);
    this.liveIndexNode.get("childNodeIds").set(newLiveIndexNode.get("nodeId"), null);
    const newUixNode = new childTemplate.Constructor(
      this.liveIndexRoom,
      this.liveNodeMap,
      this,
      newLiveIndexNode.get("nodeId"),
      childTemplate
    );
    this.childNodeTypeMaps.get(childType).set(newUixNode.nodeId, newUixNode);
    return newUixNode;
  }
  delete() {
    const deleteUixNode = (uixNode) => {
      this.liveNodeMap.delete(uixNode.nodeId);
      uixNode.childNodeTypeMaps.forEach((typeMap) => {
        typeMap.forEach((uixNode2) => {
          deleteUixNode(uixNode2);
        });
      });
      this.childTemplatesMap.forEach((template) => {
        uixNode.childNodeTypeMaps.get(template.customType).forEach((uixNode2) => {
          deleteUixNode(uixNode2);
        });
      });
    };
    deleteUixNode(this);
    this.parentNode && this.parentNode.childNodeTypeMaps.get(this.customType).delete(this.nodeId) && this.parentNode.liveIndexNode.get("childNodeIds").delete(this.nodeId);
  }
};

// src/environments/shared/filesystem/RootNode/RootNode.ts
var RootNode = class extends UixNode {
  constructor(liveIndexRoom, liveNodeMap, rootNodeTemplate) {
    super(
      liveIndexRoom,
      liveNodeMap,
      null,
      "root",
      rootNodeTemplate
    );
  }
  useStorage(key) {
    throw new Error("Method not implemented.");
  }
  mutateStorage(key, value) {
    throw new Error("Method not implemented.");
  }
};
RootNode.nodeType = "RootNode";

// src/environments/shared/filesystem/LiveObjects/LiveIndexRootNode.ts
var import_client5 = require("@liveblocks/client");
var LiveIndexRootNode = class extends LiveIndexNode {
  constructor() {
    super({
      nodeId: "root",
      metadata: {},
      uixNodeType: "Root",
      customType: "Root",
      parentNodeId: null,
      parentType: null,
      stateDisplayKey: "root",
      state: new import_client5.LiveObject({}),
      childNodeIds: new import_client5.LiveMap([])
    });
  }
};

// src/environments/shared/filesystem/configureLiveFilesystemStorage.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var configureLiveFilesystemStorage = (liveblocksPresence, createClientProps, rootNodeTemplate) => {
  const liveblocksClient = (0, import_client6.createClient)(createClientProps);
  const { suspense: liveblocks } = (0, import_react4.createRoomContext)(liveblocksClient);
  const FilesystemRootNodeContext = (0, import_react5.createContext)(null);
  const useLiveFilesystemRootNode = () => (0, import_react5.useContext)(FilesystemRootNodeContext);
  const LiveFilesystemRootNodeProvider = ({
    roomId,
    children
  }) => {
    const [filesystemRootNode, setFilesystemRootNode] = (0, import_react5.useState)(null);
    (0, import_react5.useEffect)(() => {
      (async () => {
        const room = liveblocksClient.enter(roomId, {
          initialPresence: liveblocksPresence,
          initialStorage: {
            liveNodeMap: new import_client6.LiveMap([[
              "root",
              new LiveIndexRootNode()
            ]])
          }
        });
        const nodeMap = (await room.getStorage()).root.get("liveNodeMap");
        setFilesystemRootNode(new RootNode(
          room,
          nodeMap,
          rootNodeTemplate
        ));
      })();
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      liveblocks.RoomProvider,
      {
        id: roomId,
        initialPresence: liveblocksPresence,
        initialStorage: { liveNodeMap: new import_client6.LiveMap([[
          "root",
          new LiveIndexRootNode()
        ]]) },
        children: filesystemRootNode && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FilesystemRootNodeContext.Provider, { value: filesystemRootNode, children })
      }
    );
  };
  return {
    LiveFilesystemRootNodeProvider,
    useLiveFilesystemRootNode
  };
};

// src/environments/shared/filesystem/UixNode/createUixNodeTemplate.ts
var createUixNodeTemplate = (customType, UixNodeConstructor, props, childTemplates) => {
  return {
    customType,
    Constructor: UixNodeConstructor,
    metadata: props.metadata,
    childTemplates: childTemplates ?? {}
  };
};

// src/environments/shared/filesystem/RootNode/createRootNodeTemplate.ts
var createRootNodeTemplate = (childTemplates) => createUixNodeTemplate("root", RootNode, {
  metadata: {}
}, childTemplates);

// src/environments/shared/filesystem/SimpleStateNode/SimpleStateNode.ts
var import_react6 = require("react");
var import_lodash3 = __toESM(require("lodash.isequal"), 1);
var SimpleStateNode = class extends UixNode {
  constructor(...args) {
    super(...args);
    this.initialState = this.state.toImmutable();
    this.lastStorageValues = this.state.toImmutable();
  }
  mutateStorage(key, value) {
    this.liveIndexNode.get("state").set(key, value);
  }
  useStorage(key) {
    return (0, import_react6.useSyncExternalStore)((callback) => {
      const unsubscribe = this.liveIndexRoom.subscribe(this.liveIndexNode.get("state"), callback);
      return () => unsubscribe();
    }, () => {
      const newValue = this.liveIndexNode.get("state").toImmutable()[key];
      return (0, import_lodash3.default)(this.lastStorageValues[key], newValue) ? this.lastStorageValues[key] : this.lastStorageValues[key] = newValue;
    });
  }
};
SimpleStateNode.nodeType = "SimpleStateNode";

// src/environments/shared/filesystem/SimpleStateNode/createSimpleStateNodeTemplate.ts
var createSimpleStateNodeTemplate = (customType, config, childTemplates) => createUixNodeTemplate(customType, SimpleStateNode, {
  metadata: config.metadata,
  initialState: config.state
}, childTemplates ?? {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UixNode,
  configureLiveFilesystemStorage,
  createNodeEntry,
  createRootNodeTemplate,
  createSimpleStateNodeTemplate,
  liveblocksBrowserConfig
});
