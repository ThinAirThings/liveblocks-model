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
var import_react = require("@liveblocks/react");

// src/environments/shared/mutations/useMutationCreateNodeFactory.ts
var import_client = require("@liveblocks/client");
var import_uuid = require("uuid");
var useMutationCreateNodeFactory = (NodeIndex, useMutation) => () => {
  return useMutation(({ storage }, parentNodeId, type, stateDisplayKey, state) => {
    const node = new import_client.LiveObject({
      nodeId: (0, import_uuid.v4)(),
      parentNodeId,
      type,
      meta: {
        ...NodeIndex[type].meta,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      children: new import_client.LiveList([]),
      stateDisplayKey,
      state: new import_client.LiveObject({
        ...NodeIndex[type].state,
        ...state
      })
    });
    const nodeId = node.get("nodeId");
    storage.get("nodeMap").set(nodeId, node);
    if (!!parentNodeId)
      return nodeId;
    const parentNode = storage.get("nodeMap").get(node.get("parentNodeId"));
    parentNode.get("children").push(nodeId);
    return nodeId;
  }, []);
};

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
var useMutationDeleteNodeFactory = (useMutation) => () => {
  return useMutation(({ storage }, nodeId) => {
    const liveNodeMap = storage.get("nodeMap");
    const nodeToDelete = liveNodeMap.get(nodeId);
    const deletionVisitor = (node) => {
      const children = node.get("children").toImmutable();
      children.forEach((childId) => {
        const child = liveNodeMap.get(childId);
        deletionVisitor(child);
        liveNodeMap.delete(childId);
      });
    };
    deletionVisitor(nodeToDelete);
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
var useStorageGetNodeMapFactory = (useStorage) => (nodeFilter) => {
  return useStorage((root) => {
    return nodeFilter ? new Map([...root.nodeMap].filter(nodeFilter)) : root.nodeMap;
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

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (NodeIndex, useStorage, useMutation) => {
  const useMutationUpdateNode = useMutationUpdateNodeFactory(useMutation);
  const useStorageGetNode = useStorageGetNodeFactory(useStorage);
  const useNodeState = useNodeStateFactory(useStorageGetNode, useMutationUpdateNode);
  return {
    // Meta
    useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    useMutationUpdateMeta: useMutationUpdateMetaFactory(useMutation),
    // Nodes -- Storage
    useStorageGetNodeMap: useStorageGetNodeMapFactory(
      useStorage
    ),
    useStorageGetNode,
    // Nodes -- Mutation
    useMutationCreateNode: useMutationCreateNodeFactory(
      NodeIndex,
      useMutation
    ),
    useMutationUpdateNode,
    useMutationDeleteNode: useMutationDeleteNodeFactory(
      useMutation
    ),
    // Nodes -- Combined
    useNodeState
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
  } = (0, import_react.createRoomContext)((0, import_client2.createClient)(createClientProps));
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
