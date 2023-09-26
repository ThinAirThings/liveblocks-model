import {
  createLiveAirNodeFactory,
  customLiveHooksFactory
} from "./chunk-6223X2T2.js";

// src/environments/node/liveblocksNodeConfig.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext, ClientSideSuspense } from "@liveblocks/react";
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
  } = createRoomContext(
    createClient({
      polyfills: {
        WebSocket: nodeWebsocket
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
export {
  liveblocksNodeConfig
};
