import {
  customLiveHooksFactory
} from "./chunk-X2MU2EHT.js";

// src/environments/node/liveblocksNodeConfig.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext, ClientSideSuspense } from "@liveblocks/react";
import nodeWebsocket from "ws";
import { Liveblocks } from "@liveblocks/node";
import { useCallback } from "react";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { Fragment, jsx } from "react/jsx-runtime";
var authorizationCallback;
var liveblocksNodeConfig = (NodeIndex) => {
  const {
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useOthersMapped,
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
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useOthersMapped,
    useStorage,
    RoomProvider,
    useMutation,
    useSelf,
    RoomContext,
    ...customLiveHooksFactory(
      NodeIndex,
      useStorage,
      useMutation
    ),
    LiveblocksNodeRoomProvider
  };
};
export {
  liveblocksNodeConfig
};
