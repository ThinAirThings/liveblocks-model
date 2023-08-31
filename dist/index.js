// src/index.ts
import { LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";

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

// src/components/LiveblocksNodeProvider.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import nodeWebsocket from "ws";
import { authorize } from "@liveblocks/node";
import { useCallback } from "react";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { jsx } from "react/jsx-runtime";
var secretsClient = new SecretsManagerClient({ region: "us-east-1" });
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
} = createRoomContext(createClient({
  polyfills: {
    WebSocket: nodeWebsocket
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
  authorizationCallback = useCallback(async () => {
    const response = JSON.parse((await authorize({
      room: spaceId,
      userId,
      // secret: process.env.LIVEBLOCKS_API_KEY!
      secret: (await secretsClient.send(new GetSecretValueCommand({
        SecretId: "LiveblocksToken-dev"
      }))).SecretString
    })).body);
    return response;
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
      children
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
export {
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
};
