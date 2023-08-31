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
  LiveblocksRoomProvider: () => LiveblocksRoomProvider,
  NodeDataTypeIndex: () => NodeDataTypeIndex,
  RoomContext: () => RoomContext,
  RoomProvider: () => RoomProvider,
  createAirNode: () => createAirNode,
  useMutation: () => useMutation,
  useMutationContainerState: () => useMutationContainerState,
  useMutationCreateNode: () => useMutationCreateNode,
  useMutationDeleteNode: () => useMutationDeleteNode,
  useMutationNodeState: () => useMutationNodeState,
  useMyPresence: () => useMyPresence,
  useOthers: () => useOthers,
  useOthersMapped: () => useOthersMapped,
  useRoom: () => useRoom,
  useSelf: () => useSelf,
  useStorage: () => useStorage,
  useStorageContainerState: () => useStorageContainerState,
  useStorageContainerStateMap: () => useStorageContainerStateMap,
  useStorageNodeMap: () => useStorageNodeMap,
  useStorageNodeState: () => useStorageNodeState,
  useUpdateMyPresence: () => useUpdateMyPresence
});
module.exports = __toCommonJS(src_exports);
var import_client2 = require("@liveblocks/client");
var import_uuid = require("uuid");

// src/hooks/useMutationNodeState.ts
var useMutationNodeState = (useMutation2, nodeId, propKey) => {
  return useMutation2(({ storage }, value) => {
    storage.get("nodeMap").get(nodeId).get("state").set(propKey, value);
  }, []);
};

// src/hooks/useStorageNodeState.ts
var useStorageNodeState = (useStorage2, nodeId, propKey) => {
  return useStorage2((root) => {
    return root.nodeMap.get(nodeId)?.state[propKey];
  });
};

// src/hooks/useMutationCreateNode.ts
var useMutationCreateNode = (useMutation2) => {
  return useMutation2(({ storage }, { key, state }) => {
    const node = createAirNode({ key, state });
    const nodeId = node.get("nodeId");
    storage.get("nodeMap").set(nodeId, node);
    return nodeId;
  }, []);
};

// src/hooks/useMutationDeleteNode.ts
var useMutationDeleteNode = (useMutation2) => {
  return useMutation2(({ storage }, nodeId) => {
    storage.get("nodeMap").delete(nodeId);
  }, []);
};

// src/hooks/useMutationContainerState.ts
var useMutationContainerState = (useMutation2) => {
  return useMutation2(({ storage }, nodeId, containerState) => {
    storage.get("nodeMap").get(nodeId)?.get("state").get("containerState").update(
      Object.fromEntries(
        Object.entries(containerState).map(
          ([key, value]) => [key, key !== "scale" ? Math.round(value) : value]
        )
      )
    );
  }, []);
};

// src/hooks/useStorageContainerState.ts
var useStorageContainerState = (useStorage2, nodeId) => useStorage2((root) => root.nodeMap.get(nodeId)?.state.containerState);

// src/hooks/useStorageContainerStateMap.ts
var import_lodash = __toESM(require("lodash.isequal"), 1);
var useStorageContainerStateMap = (useStorage2, nodeIds) => {
  return useStorage2(
    (root) => {
      return new Map(
        [...root.nodeMap].filter(([nodeId]) => nodeIds ? nodeIds.includes(nodeId) : true).map(([nodeId, node]) => {
          return [nodeId, node.state.containerState];
        })
      );
    },
    (a, b) => (0, import_lodash.default)(a, b)
  );
};

// src/hooks/useStorageNodeMap.ts
var useStorageNodeMap = (useStorage2) => {
  return useStorage2((root) => root.nodeMap);
};

// src/components/LiveblocksNodeProvider.tsx
var import_client = require("@liveblocks/client");
var import_react = require("@liveblocks/react");
var import_ws = __toESM(require("ws"), 1);
var import_node = require("@liveblocks/node");
var import_react2 = require("react");
var import_client_secrets_manager = require("@aws-sdk/client-secrets-manager");
var import_jsx_runtime = require("react/jsx-runtime");
var secretsClient = new import_client_secrets_manager.SecretsManagerClient({ region: "us-east-1" });
var {
  suspense: {
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
  }
} = (0, import_react.createRoomContext)((0, import_client.createClient)({
  polyfills: {
    WebSocket: import_ws.default
  },
  authEndpoint: async () => authorizationCallback?.()
}));
var authorizationCallback;
var LiveblocksRoomProvider = ({
  userId,
  spaceId,
  serverName,
  children
}) => {
  authorizationCallback = (0, import_react2.useCallback)(async () => {
    const response = JSON.parse((await (0, import_node.authorize)({
      room: spaceId,
      userId,
      // secret: process.env.LIVEBLOCKS_API_KEY!
      secret: (await secretsClient.send(new import_client_secrets_manager.GetSecretValueCommand({
        SecretId: "LiveblocksToken-dev"
      }))).SecretString
    })).body);
    return response;
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
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Suspense, { children })
    }
  );
};

// src/index.ts
var NodeDataTypeIndex = {
  "rootThought": {
    renderer: "dom",
    key: "rootThought",
    defaultProps: {
      rawPrompt: ""
    },
    defaultBoxSize: {
      width: 400,
      height: 400
    }
  },
  "thought": {
    renderer: "dom",
    key: "thought",
    defaultProps: {
      timestamp: "",
      rawThought: "",
      mainIdea: "",
      keyPoints: [],
      abstract: "",
      trainOfThought: []
    },
    defaultBoxSize: {
      width: 400,
      height: 400
    }
  },
  "basicStockChart": {
    renderer: "dom",
    key: "basicStockChart",
    defaultProps: {
      data: []
    },
    defaultBoxSize: {
      width: 600,
      height: 400
    }
  }
};
function createAirNode({
  key,
  state
}) {
  return new import_client2.LiveObject({
    nodeId: (0, import_uuid.v4)(),
    key: NodeDataTypeIndex[key].key,
    renderer: NodeDataTypeIndex[key].renderer,
    state: new import_client2.LiveObject({
      ...state,
      containerState: new import_client2.LiveObject(state.containerState)
    })
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LiveblocksRoomProvider,
  NodeDataTypeIndex,
  RoomContext,
  RoomProvider,
  createAirNode,
  useMutation,
  useMutationContainerState,
  useMutationCreateNode,
  useMutationDeleteNode,
  useMutationNodeState,
  useMyPresence,
  useOthers,
  useOthersMapped,
  useRoom,
  useSelf,
  useStorage,
  useStorageContainerState,
  useStorageContainerStateMap,
  useStorageNodeMap,
  useStorageNodeState,
  useUpdateMyPresence
});
