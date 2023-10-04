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
  liveblocksBrowserConfig: () => liveblocksBrowserConfig
});
module.exports = __toCommonJS(index_browser_exports);

// src/environments/browser/liveblocksBrowserConfig.tsx
var import_client2 = require("@liveblocks/client");
var import_react5 = require("@liveblocks/react");

// src/environments/shared/mutations/useMutationCreateNodeFactory.ts
var import_client = require("@liveblocks/client");
var import_uuid = require("uuid");
var import_react = require("react");
var useMutationCreateNodeFactory = (NodeIndex, NodeContext, useMutation) => () => {
  const [nodeCtx, updateNodeCtx] = (0, import_react.useContext)(NodeContext);
  return useMutation(({ storage }, type, state) => {
    const node = new import_client.LiveObject({
      nodeId: (0, import_uuid.v4)(),
      parentNodeId: NodeIndex[type].parentType ? nodeCtx[NodeIndex[type].parentType] : null,
      type,
      parentType: NodeIndex[type].parentType,
      meta: {
        ...NodeIndex[type].meta,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      links: new import_client.LiveMap([]),
      state: new import_client.LiveObject({
        ...NodeIndex[type].state,
        ...state
      })
    });
    const nodeId = node.get("nodeId");
    storage.get("nodeMap").set(nodeId, node);
    if (!!NodeIndex[type].parentType)
      return nodeId;
    const parentNode = storage.get("nodeMap").get(node.get("parentNodeId"));
    parentNode.get("links").set(type, [
      .../* @__PURE__ */ new Set([...parentNode.get("links").get(type), nodeId])
    ]);
    updateNodeCtx((nodeCtx2) => {
      nodeCtx2[type] = nodeId;
    });
    return nodeId;
  }, []);
};

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
var import_react2 = require("react");
var useMutationDeleteNodeFactory = (NodeContext, useMutation) => () => {
  const [nodeCtx, updateNodeCtx] = (0, import_react2.useContext)(NodeContext);
  return useMutation(({ storage }, nodeType) => {
    const nodeToDelete = storage.get("nodeMap").get(nodeCtx[nodeType]);
    const typesToClear = [...nodeToDelete.get("links").entries()].filter(([_, nodeIds]) => nodeIds.length > 0).map(([type, _]) => type);
    const deletionVisitor = (node) => {
      const links = node.get("links").toImmutable();
      [...links].forEach(([_, nodeIds]) => {
        nodeIds.forEach((nodeId) => {
          const linkNode = storage.get("nodeMap").get(nodeId);
          if (!linkNode)
            return;
          if (linkNode.get("links").toImmutable().size === 0) {
            storage.get("nodeMap").delete(nodeId);
            return;
          }
          deletionVisitor(linkNode);
          storage.get("nodeMap").delete(nodeId);
        });
      });
    };
    deletionVisitor(nodeToDelete);
    updateNodeCtx((nodeCtx2) => {
      nodeCtx2[nodeType] = null;
      typesToClear.forEach((type) => {
        nodeCtx2[type] = null;
      });
    });
  }, []);
};

// src/environments/shared/mutations/useMutationUpdateNodeFactory.ts
var useMutationUpdateNodeFactory = (useMutation) => () => useMutation(({ storage }, nodeId, updater) => {
  const nodeState = storage.get("nodeMap").get(nodeId).get("state");
  updater(nodeState);
}, []);

// src/environments/shared/storage/useStorageGetNodeFactory.ts
var import_lodash = __toESM(require("lodash.isequal"), 1);
var useStorageGetNodeFactory = (useStorage) => (nodeId, selector) => {
  return useStorage(
    (root) => {
      const nodeState = root.nodeMap.get(nodeId)?.state;
      return nodeState ? selector(nodeState) : null;
    },
    (a, b) => (0, import_lodash.default)(a, b)
  );
};

// src/environments/shared/storage/useStorageGetNodeMapFactory.ts
var import_react3 = require("react");
var useStorageGetNodeMapFactory = (NodeContext, useStorage) => (nodeFilter) => {
  const nodeContext = (0, import_react3.useContext)(NodeContext);
  return useStorage((root) => {
    return nodeFilter ? new Map([...root.nodeMap].filter((p1, p2, p3) => nodeFilter(
      nodeContext[0],
      p1,
      p2,
      p3
    ))) : root.nodeMap;
  });
};

// src/environments/shared/storage/useStorageGetMetaFactory.ts
var useStorageGetMetaFactory = (useStorage) => () => useStorage((root) => root.meta);

// src/environments/shared/mutations/useMutationUpdateMetaFactory.ts
var useMutationUpdateMetaFactory = (useMutation) => () => useMutation(({ storage }, updater) => {
  updater(storage.get("meta"));
}, []);

// src/environments/shared/combined/useNodeStateFactory.ts
var useNodeStateFactory = (useStorageGetNode, useMutationUpdateNode) => (nodeId, key) => {
  const nodeValue = useStorageGetNode(nodeId, (nodeState) => nodeState[key]);
  const updateNode = useMutationUpdateNode();
  return [
    nodeValue,
    (newValue) => updateNode(nodeId, (liveNodeState) => {
      liveNodeState.set(key, newValue);
    })
  ];
};

// src/environments/shared/context/NodeContextFactory.tsx
var import_react4 = require("react");
var import_use_immer = require("use-immer");
var import_jsx_runtime = require("react/jsx-runtime");
var NodeContextFactory = (useNodeState) => {
  const NodeContext = (0, import_react4.createContext)([{}, () => console.log("No initial context set!. This is the default context function running")]);
  return {
    NodeContext,
    NodeContextProvider: ({
      contextValue,
      children
    }) => {
      const nodeContext = (0, import_use_immer.useImmer)(contextValue);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeContext.Provider, { value: nodeContext, children });
    },
    useNodeContext: (nodeType) => {
      const [nodeCtx, updateNodeCtx] = (0, import_react4.useContext)(NodeContext);
      return [
        nodeCtx[nodeType],
        (newNodeId) => {
          updateNodeCtx((draft) => {
            draft[nodeType] = newNodeId;
          });
        }
      ];
    },
    useNodeStateContext: (nodeType, stateKey) => {
      const nodeId = (0, import_react4.useContext)(NodeContext)[0][nodeType];
      return useNodeState(nodeId, stateKey);
    }
  };
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (NodeIndex, useStorage, useMutation) => {
  const useMutationUpdateNode = useMutationUpdateNodeFactory(useMutation);
  const useStorageGetNode = useStorageGetNodeFactory(useStorage);
  const useNodeState = useNodeStateFactory(useStorageGetNode, useMutationUpdateNode);
  const {
    NodeContext,
    NodeContextProvider,
    useNodeContext,
    useNodeStateContext
  } = NodeContextFactory(useNodeState);
  return {
    // Meta
    useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    useMutationUpdateMeta: useMutationUpdateMetaFactory(useMutation),
    // Nodes -- Storage
    useStorageGetNodeMap: useStorageGetNodeMapFactory(
      NodeContext,
      useStorage
    ),
    useStorageGetNode,
    // Nodes -- Mutation
    useMutationCreateNode: useMutationCreateNodeFactory(
      NodeIndex,
      NodeContext,
      useMutation
    ),
    useMutationUpdateNode,
    useMutationDeleteNode: useMutationDeleteNodeFactory(
      NodeContext,
      useMutation
    ),
    // Nodes -- Combined
    useNodeState,
    // Context
    NodeContext,
    NodeContextProvider,
    useNodeContext,
    useNodeStateContext
  };
};

// src/environments/browser/liveblocksBrowserConfig.tsx
var liveblocksBrowserConfig = (NodeIndex, createClientProps) => {
  const {
    suspense: {
      useRoom,
      useMyPresence,
      useUpdateMyPresence,
      useOthersMapped,
      useStorage,
      RoomProvider,
      useMutation,
      useSelf,
      RoomContext,
      useHistory,
      useCanUndo,
      useUndo,
      useCanRedo,
      useRedo
    }
  } = (0, import_react5.createRoomContext)((0, import_client2.createClient)(createClientProps));
  return {
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useOthersMapped,
    useStorage,
    RoomProvider,
    useMutation,
    useSelf,
    RoomContext,
    useHistory,
    useCanUndo,
    useUndo,
    useCanRedo,
    useRedo,
    ...customLiveHooksFactory(
      NodeIndex,
      useStorage,
      useMutation
    )
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  liveblocksBrowserConfig
});
