import {
  customLiveHooksFactory
} from "./chunk-CZOCQCV4.js";

// src/environments/node/liveblocksNodeConfig.tsx
import { createClient } from "@liveblocks/client";
import { ClientSideSuspense, createRoomContext } from "@liveblocks/react";
import nodeWebsocket from "ws";
import { useCallback } from "react";
import { Liveblocks } from "@liveblocks/node";
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Fragment, jsx } from "react/jsx-runtime";
var authorizationCallback;
var liveblocksNodeConfig = (NodeIndex, createClientProps, initialLiveblocksPresence, initialLiveblocksStorage) => {
  const liveblocks = createRoomContext(
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
      liveblocks.RoomProvider,
      {
        id: spaceId,
        initialPresence: initialLiveblocksPresence,
        shouldInitiallyConnect: true,
        children: /* @__PURE__ */ jsx(ClientSideSuspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children })
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
export {
  liveblocksNodeConfig
};
