import {
  customLiveHooksFactory
} from "./chunk-4ISHDHJ4.js";

// src/environments/browser/liveblocksBrowserConfig.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
var liveblocksBrowserConfig = (NodeIndex, createClientProps) => {
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
    ...customLiveHooksFactory(
      NodeIndex,
      useStorage,
      useMutation
    )
  };
};
export {
  liveblocksBrowserConfig
};
