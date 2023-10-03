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

// src/index.node.ts
var index_node_exports = {};
__export(index_node_exports, {
  liveblocksNodeConfig: () => liveblocksNodeConfig
});
module.exports = __toCommonJS(index_node_exports);

// src/environments/node/liveblocksNodeConfig.tsx
var import_client2 = require("@liveblocks/client");
var import_react3 = require("@liveblocks/react");
var import_ws = __toESM(require("ws"), 1);
var import_node = require("@liveblocks/node");
var import_react4 = require("react");
var import_client_secrets_manager = require("@aws-sdk/client-secrets-manager");

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
    meta: {
      ...meta,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    },
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
      const nodeState = root.nodeMap.get(nodeId)?.state;
      return nodeState ? selector(nodeState) : null;
    },
    (a, b) => (0, import_lodash.default)(a, b)
  );
};

// src/environments/shared/storage/useStorageGetNodeMapFactory.ts
var import_react = require("react");
var useStorageGetNodeMapFactory = (NodeContext, useStorage) => (nodeFilter) => {
  const nodeContext = (0, import_react.useContext)(NodeContext);
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
var import_react2 = require("react");
var import_use_immer = require("use-immer");
var import_jsx_runtime = require("react/jsx-runtime");
var NodeContextFactory = (useNodeState) => {
  const NodeContext = (0, import_react2.createContext)([{}, () => {
  }]);
  return {
    NodeContext,
    NodeContextProvider: ({
      children
    }) => {
      const nodeContext = (0, import_use_immer.useImmer)({ ...(0, import_react2.useContext)(NodeContext)[0] });
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeContext.Provider, { value: nodeContext, children });
    },
    useNodeStateContext: (nodeType, stateKey) => {
      const nodeId = (0, import_react2.useContext)(NodeContext)[0][nodeType];
      return useNodeState(nodeId, stateKey);
    }
  };
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (useStorage, useMutation, createLiveAirNode) => {
  const useMutationUpdateNode = useMutationUpdateNodeFactory(useMutation);
  const useStorageGetNode = useStorageGetNodeFactory(useStorage);
  const useNodeState = useNodeStateFactory(useStorageGetNode, useMutationUpdateNode);
  const {
    NodeContext,
    useNodeStateContext,
    NodeContextProvider
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
      useMutation,
      createLiveAirNode
    ),
    useMutationUpdateNode,
    useMutationDeleteNode: useMutationDeleteNodeFactory(useMutation),
    // Nodes -- Combined
    useNodeState,
    // Context
    NodeContext,
    useNodeStateContext,
    NodeContextProvider
  };
};

// src/environments/node/liveblocksNodeConfig.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  } = (0, import_react3.createRoomContext)(
    (0, import_client2.createClient)({
      polyfills: {
        WebSocket: import_ws.default
      },
      authEndpoint: async () => authorizationCallback?.()
    })
  );
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
  const LiveblocksNodeRoomProvider = ({
    userId,
    spaceId,
    serverName,
    children
  }) => {
    authorizationCallback = (0, import_react4.useCallback)(async () => {
      const liveblocksClient = new import_node.Liveblocks({
        secret: (await new import_client_secrets_manager.SecretsManagerClient({ region: "us-east-1" }).send(new import_client_secrets_manager.GetSecretValueCommand({
          SecretId: "LiveblocksToken-dev"
        }))).SecretString
      });
      const { body } = await liveblocksClient.prepareSession(userId).allow(spaceId, ["room:write", "comments:write"]).authorize();
      return JSON.parse(body);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.ClientSideSuspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, {}), children })
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
    // Meta
    useStorageGetMeta,
    useMutationUpdateMeta,
    // Nodes
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
  liveblocksNodeConfig
});
