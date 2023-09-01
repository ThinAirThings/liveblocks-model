// src/model/data-model.ts
import { LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
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
  return new LiveObject({
    nodeId: uuidv4(),
    key: NodeDataTypeIndex[key].key,
    renderer: NodeDataTypeIndex[key].renderer,
    state: new LiveObject({
      ...state,
      containerState: new LiveObject(state.containerState)
    })
  });
}

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
import _isEqual from "lodash.isequal";
var useStorageContainerStateMap = (useStorage2, nodeIds) => {
  return useStorage2(
    (root) => {
      return new Map(
        [...root.nodeMap].filter(([nodeId]) => nodeIds ? nodeIds.includes(nodeId) : true).map(([nodeId, node]) => {
          return [nodeId, node.state.containerState];
        })
      );
    },
    (a, b) => _isEqual(a, b)
  );
};

// src/hooks/useStorageNodeMap.ts
var useStorageNodeMap = (useStorage2) => {
  return useStorage2((root) => root.nodeMap);
};

// src/components/LiveblocksNodeRoomProvider.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext, ClientSideSuspense } from "@liveblocks/react";
import nodeWebsocket from "ws";
import { Liveblocks } from "@liveblocks/node";
import { useCallback } from "react";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { Fragment, jsx } from "react/jsx-runtime";
var {
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
} = createRoomContext(
  createClient({
    polyfills: {
      WebSocket: nodeWebsocket
    },
    authEndpoint: async () => authorizationCallback?.()
  })
);
var authorizationCallback;
var LiveblocksNodeRoomProvider = ({
  userId,
  spaceId,
  serverName,
  children
}) => {
  authorizationCallback = useCallback(async () => {
    const liveblocksClient = new Liveblocks({
      secret: (await new SecretsManagerClient({ region: "us-east-1" }).send(new GetSecretValueCommand({
        SecretId: "LiveblocksToken-dev"
      }))).SecretString
    });
    const { body } = await liveblocksClient.prepareSession(userId).allow(spaceId, ["room:write", "comments:write"]).authorize();
    return JSON.parse(body);
  }, []);
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsx(ClientSideSuspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children })
    }
  );
};
export {
  LiveblocksNodeRoomProvider,
  NodeDataTypeIndex,
  RoomContext,
  RoomProvider,
  createAirNode,
  useErrorListener,
  useLostConnectionListener,
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
  useStatus,
  useStorage,
  useStorageContainerState,
  useStorageContainerStateMap,
  useStorageNodeMap,
  useStorageNodeState,
  useUpdateMyPresence
};
