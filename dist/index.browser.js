import {
  createLiveAirNodeFactory,
  customLiveHooksFactory
} from "./chunk-ID5VAPOC.js";

// src/environments/browser/liveblocksBrowserConfig.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
var liveblocksBrowserConfig = (authEndpoint) => {
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
    useStorageGetMeta,
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
    useStorageGetMeta,
    useStorageGetNodeMap,
    useStorageGetNode,
    useMutationCreateNode,
    useMutationUpdateNode,
    useMutationDeleteNode
  };
};
export {
  liveblocksBrowserConfig
};
