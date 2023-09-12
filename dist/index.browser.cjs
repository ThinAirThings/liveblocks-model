"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var createLiveAirNodeFactory = () => ({
  type,
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
var useMutationCreateNodeFactory = (useMutation, createLiveAirNode) => () => useMutation(({ storage }, { type, meta, state }) => {
  const node = createLiveAirNode({ type, meta, state });
  const nodeId = node.get("nodeId");
  storage.get("nodeMap").set(nodeId, node);
  return nodeId;
}, []);

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
var useMutationDeleteNodeFactory = (useMutation) => () => useMutation(({ storage }, nodeId) => {
  storage.get("nodeMap").delete(nodeId);
}, []);

// src/environments/shared/mutations/useMutationUpdateNodeFactory.ts
var useMutationUpdateNodeFactory = (useMutation) => (key) => useMutation(({ storage }, nodeId, value) => {
  const node = storage.get("nodeMap").get(nodeId);
  const state = node.get("state");
  const oldValue = state.get(key);
  node.get("state").set(key, {
    ...oldValue,
    ...value
  });
}, []);

// src/environments/shared/storage/useStorageGetNodeFactory.ts
var useStorageGetNodeFactory = (useStorage) => (nodeId, key) => useStorage((root) => {
  return root.nodeMap.get(nodeId).state[key];
});

// src/environments/shared/storage/useStorageGetNodeMap.ts
var useStorageGetNodeMapFactory = (useStorage) => () => useStorage((root) => {
  return root.nodeMap;
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
    // Nodes
    useStorageGetNodeMap: useStorageGetNodeMapFactory(useStorage),
    useStorageGetNode: useStorageGetNodeFactory(useStorage),
    useMutationCreateNode: useMutationCreateNodeFactory(
      useMutation,
      createLiveAirNode
    ),
    useMutationUpdateNode: useMutationUpdateNodeFactory(useMutation),
    useMutationDeleteNode: useMutationDeleteNodeFactory(useMutation)
  };
};

// src/environments/browser/liveblocksBrowserConfig.tsx
var liveblocksBrowserConfig = (authEndpoint) => {
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
  } = (0, import_react.createRoomContext)((0, import_client2.createClient)({
    authEndpoint
  }));
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
