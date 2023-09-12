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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  liveblocksBrowserConfig: () => liveblocksBrowserConfig,
  liveblocksNodeConfig: () => liveblocksNodeConfig
});
module.exports = __toCommonJS(src_exports);

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
}, []);

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
var useMutationDeleteNodeFactory = (useMutation) => () => useMutation(({ storage }, nodeId) => {
  storage.get("nodeMap").delete(nodeId);
}, []);

// src/environments/shared/mutations/useMutationUpdateNodeFactory.ts
var useMutationUpdateNodeFactory = (useMutation) => (nodeId, key) => useMutation(({ storage }, value) => {
  const node = storage.get("nodeMap").get(nodeId);
  node.get("state").set(key, value);
}, []);

// src/environments/shared/storage/useStorageGetNodeFactory.ts
var useStorageGetNodeFactory = (useStorage) => (nodeId, key) => useStorage((root) => {
  return root.nodeMap.get(nodeId).state[key];
});

// src/environments/shared/storage/useStorageGetNodeMap.ts
var useStorageGetNodeMapFactory = (useStorage) => () => useStorage((root) => {
  return root.nodeMap;
});

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (useStorage, useMutation, createLiveAirNode) => {
  return {
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
  console.log("HERE");
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
    useStorageGetNodeMap,
    useStorageGetNode,
    useMutationCreateNode,
    useMutationUpdateNode,
    useMutationDeleteNode
  };
};

// src/environments/node/liveblocksNodeConfig.tsx
var import_client3 = require("@liveblocks/client");
var import_react2 = require("@liveblocks/react");
var import_ws = __toESM(require("ws"), 1);
var import_node = require("@liveblocks/node");
var import_react3 = require("react");
var import_client_secrets_manager = require("@aws-sdk/client-secrets-manager");
var import_jsx_runtime = require("react/jsx-runtime");
var authorizationCallback;
var liveblocksNodeConfig = () => {
  const {
    useLostConnectionListener,
    useStatus,
    useErrorListener,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useOthersMapped,
    useOthers,
    useStorage,
    RoomProvider,
    useMutation,
    useSelf,
    RoomContext
  } = (0, import_react2.createRoomContext)(
    (0, import_client3.createClient)({
      polyfills: {
        WebSocket: import_ws.default
      },
      authEndpoint: async () => authorizationCallback?.()
    })
  );
  const createLiveAirNode = createLiveAirNodeFactory();
  const {
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
  const LiveblocksNodeRoomProvider = ({
    userId,
    spaceId,
    serverName,
    children
  }) => {
    authorizationCallback = (0, import_react3.useCallback)(async () => {
      const liveblocksClient = new import_node.Liveblocks({
        secret: (await new import_client_secrets_manager.SecretsManagerClient({ region: "us-east-1" }).send(new import_client_secrets_manager.GetSecretValueCommand({
          SecretId: "LiveblocksToken-dev"
        }))).SecretString
      });
      const { body } = await liveblocksClient.prepareSession(userId).allow(spaceId, ["room:write", "comments:write"]).authorize();
      return JSON.parse(body);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      RoomProvider,
      {
        id: spaceId,
        initialPresence: {
          displayName: `${serverName}`,
          absoluteCursorState: null,
          viewportState: { x: 0, y: 0, scale: 1 },
          mouseSelectionState: {
            selectionActive: false,
            absoluteSelectionBounds: null
          },
          selectedNodeIds: [],
          focusedNodeId: null
        },
        shouldInitiallyConnect: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.ClientSideSuspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {}), children })
      }
    );
  };
  return {
    useLostConnectionListener,
    useStatus,
    useErrorListener,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useOthersMapped,
    useOthers,
    useStorage,
    RoomProvider,
    useMutation,
    useSelf,
    RoomContext,
    createLiveAirNode,
    useStorageGetNodeMap,
    useStorageGetNode,
    useMutationCreateNode,
    useMutationUpdateNode,
    useMutationDeleteNode,
    LiveblocksNodeRoomProvider
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  liveblocksBrowserConfig,
  liveblocksNodeConfig
});
