import {
  createLiveAirNodeFactory,
  customLiveHooksFactory
} from "./chunk-NSIXVNIZ.js";

// src/environments/browser/liveblocksBrowserConfig.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
var liveblocksBrowserConfig = (createClientProps) => {
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
  } = createRoomContext(createClient(createClientProps));
  const createLiveAirNode = createLiveAirNodeFactory();
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
    ...customLiveHooksFactory(
      useStorage,
      useMutation,
      createLiveAirNode
    )
  };
};
export {
  liveblocksBrowserConfig
};
