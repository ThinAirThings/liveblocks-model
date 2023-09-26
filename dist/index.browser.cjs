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

// src/environments/shared/createLiveAirNodeFactory.ts
var import_client = require("@liveblocks/client");
var import_uuid = require("uuid");
var createLiveAirNodeFactory = () => (type, {
  state,
  meta
}) => {
  return new import_client.LiveObject({
    nodeId: (0, import_uuid.v4)(),
    type,
    meta,
    state: new import_client.LiveObject({
      ...state
    })
  });
};

// src/environments/shared/mutations/useMutationCreateNodeFactory.ts
var useMutationCreateNodeFactory = (useMutation, createLiveAirNode) => () => useMutation(({ storage }, type, { meta, state }) => {
  const node = createLiveAirNode(type, { meta, state });
  const nodeId = node.get("nodeId");
  storage.get("nodeMap").set(nodeId, node);
  return nodeId;
}, []);

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
var useMutationDeleteNodeFactory = (useMutation) => () => useMutation(({ storage }, nodeId) => {
  storage.get("nodeMap").delete(nodeId);
}, []);

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
      return selector(root.nodeMap.get(nodeId).state);
    },
    (a, b) => (0, import_lodash.default)(a, b)
  );
};

// src/environments/shared/storage/useStorageGetNodeMapFactory.ts
var useStorageGetNodeMapFactory = (useStorage) => (nodeFilter) => useStorage((root) => {
  return nodeFilter ? new Map([...root.nodeMap].filter(nodeFilter)) : root.nodeMap;
});

// src/environments/shared/storage/useStorageGetMetaFactory.ts
var useStorageGetMetaFactory = (useStorage) => () => useStorage((root) => root.meta);

// src/environments/shared/mutations/useMutationUpdateMetaFactory.ts
var useMutationUpdateMetaFactory = (useMutation) => () => useMutation(({ storage }, updater) => {
  updater(storage.get("meta"));
}, []);

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (useStorage, useMutation, createLiveAirNode) => {
  return {
    // Meta
    useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    useMutationUpdateMeta: useMutationUpdateMetaFactory(useMutation),
    // Nodes -- Storage
    useStorageGetNodeMap: useStorageGetNodeMapFactory(useStorage),
    useStorageGetNode: useStorageGetNodeFactory(useStorage),
    // Nodes -- Mutation
    useMutationCreateNode: useMutationCreateNodeFactory(
      useMutation,
      createLiveAirNode
    ),
    useMutationUpdateNode: useMutationUpdateNodeFactory(useMutation),
    useMutationDeleteNode: useMutationDeleteNodeFactory(useMutation)
  };
};

// src/environments/browser/liveblocksBrowserConfig.tsx
var liveblocksBrowserConfig = (createClientProps) => {
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
  const createLiveAirNode = createLiveAirNodeFactory();
  const {
    // Meta
    useStorageGetMeta,
    useMutationUpdateMeta,
    // Nodes
    useStorageGetNodeMap,
    useStorageGetNode,
    useMutationCreateNode,
    useMutationUpdateNode,
    useMutationDeleteNode
  } = customLiveHooksFactory(
    useStorage,
    useMutation,
    createLiveAirNode
  );
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
    createLiveAirNode,
    // Meta
    useStorageGetMeta,
    useMutationUpdateMeta,
    // Nodes
    useStorageGetNodeMap,
    useStorageGetNode,
    useMutationCreateNode,
    useMutationUpdateNode,
    useMutationDeleteNode
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  liveblocksBrowserConfig
});
