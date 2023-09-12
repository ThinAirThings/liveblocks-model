// src/environments/browser/liveblocksBrowserConfig.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// src/environments/shared/createLiveAirNodeFactory.ts
import { LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
var createLiveAirNodeFactory = () => ({
  type,
  state,
  meta
}) => {
  return new LiveObject({
    nodeId: uuidv4(),
    type,
    meta,
    state: new LiveObject({
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
  } = createRoomContext(createClient({
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
import { createClient as createClient2 } from "@liveblocks/client";
import { createRoomContext as createRoomContext2, ClientSideSuspense } from "@liveblocks/react";
import nodeWebsocket from "ws";
import { Liveblocks } from "@liveblocks/node";
import { useCallback } from "react";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { Fragment, jsx } from "react/jsx-runtime";
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
  } = createRoomContext2(
    createClient2({
      polyfills: {
        WebSocket: nodeWebsocket
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
export {
  liveblocksBrowserConfig,
  liveblocksNodeConfig
};
