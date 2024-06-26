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
  createNodeEntry: () => createNodeEntry,
  liveblocksNodeConfig: () => liveblocksNodeConfig
});
module.exports = __toCommonJS(index_node_exports);

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

// src/environments/node/liveblocksNodeConfig.tsx
var import_client2 = require("@liveblocks/client");
var import_react = require("@liveblocks/react");
var import_ws = __toESM(require("ws"), 1);
var import_react2 = require("react");
var import_node = require("@liveblocks/node");
var import_client_secrets_manager = require("@aws-sdk/client-secrets-manager");

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

// src/environments/node/liveblocksNodeConfig.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var authorizationCallback;
var liveblocksNodeConfig = (NodeIndex, createClientProps, initialLiveblocksPresence, initialLiveblocksStorage) => {
  const liveblocks = (0, import_react.createRoomContext)(
    (0, import_client2.createClient)({
      polyfills: {
        WebSocket: import_ws.default
      },
      authEndpoint: async () => authorizationCallback?.()
    })
  );
  const LiveblocksNodeRoomProvider = ({
    userId,
    spaceId,
    serverName,
    children
  }) => {
    authorizationCallback = (0, import_react2.useCallback)(async () => {
      const liveblocksClient = new import_node.Liveblocks({
        secret: (await new import_client_secrets_manager.SecretsManagerClient({ region: "us-east-1" }).send(new import_client_secrets_manager.GetSecretValueCommand({
          SecretId: "LiveblocksToken-dev"
        }))).SecretString
      });
      const { body } = await liveblocksClient.prepareSession(userId).allow(spaceId, ["room:write", "comments:write"]).authorize();
      return JSON.parse(body);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      liveblocks.RoomProvider,
      {
        id: spaceId,
        initialPresence: initialLiveblocksPresence,
        shouldInitiallyConnect: true,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.ClientSideSuspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {}), children })
      }
    );
  };
  return {
    ...liveblocks,
    ...customLiveHooksFactory(
      NodeIndex,
      liveblocks.useStorage,
      liveblocks.useMutation
    ),
    LiveblocksNodeRoomProvider
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNodeEntry,
  liveblocksNodeConfig
});
