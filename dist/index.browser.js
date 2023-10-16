import {
  createNodeEntry,
  customLiveHooksFactory
} from "./chunk-MKIBA2KT.js";

// src/environments/browser/liveblocksBrowserConfig.tsx
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// src/environments/browser/LiveblocksBrowserProviderFactory.tsx
import { Suspense } from "react";
import { jsx } from "react/jsx-runtime";
var LiveblocksBrowserProviderFactory = (RoomProvider, initialLiveblocksPresence, initialLiveblocksStorage) => ({
  roomId,
  Loading,
  children
}) => {
  return /* @__PURE__ */ jsx(
    RoomProvider,
    {
      id: roomId,
      initialPresence: initialLiveblocksPresence,
      initialStorage: initialLiveblocksStorage,
      children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children })
    }
  );
};

// src/environments/browser/liveblocksBrowserConfig.tsx
var liveblocksBrowserConfig = (NodeIndex, createClientProps, initialLiveblocksPresence, initialLiveblocksStorage) => {
  const {
    suspense: liveblocks
  } = createRoomContext(createClient(createClientProps));
  return {
    ...customLiveHooksFactory(
      NodeIndex,
      liveblocks.useStorage,
      liveblocks.useMutation
    ),
    LiveblocksProvider: LiveblocksBrowserProviderFactory(
      liveblocks.RoomProvider,
      initialLiveblocksPresence,
      initialLiveblocksStorage
    ),
    ...liveblocks,
    NodeIndex
  };
};

// src/environments/shared/oop/initializeRuntimeGraph.ts
import { LiveMap, createClient as createClient2 } from "@liveblocks/client";

// src/environments/shared/oop/RuntimeNode.ts
import { LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
var defineRuntimeNode = (NodeIndex, liveNodeMap) => {
  var _a;
  return _a = class {
    constructor(type, parentNode, liveDataNode) {
      this.childNodes = /* @__PURE__ */ new Set();
      if (liveDataNode) {
        this.liveDataNode = liveDataNode;
      } else {
        this.liveDataNode = new LiveObject({
          nodeId: uuidv4(),
          parentNodeId: parentNode?.nodeId ?? null,
          type,
          state: new LiveObject({ ...NodeIndex[type].state }),
          parentType: NodeIndex[type].parentType,
          stateDisplayKey: NodeIndex[type].stateDisplayKey
        });
        if (type === "root") {
          this.liveDataNode.set("nodeId", null);
        } else {
          liveNodeMap.set(this.nodeId, this.liveDataNode);
        }
      }
      this.parentNode = parentNode;
      this.parentNode?.childNodes.add(this);
    }
    // Live Data Node Getters
    get nodeId() {
      return this.liveDataNode.get("nodeId");
    }
    get type() {
      return this.liveDataNode.get("type");
    }
    get state() {
      return this.liveDataNode.get("state");
    }
    get stateDisplayKey() {
      return this.liveDataNode.get("stateDisplayKey");
    }
  }, // Static
  _a.liveNodeMap = liveNodeMap, (() => {
    const buildTree = (node) => {
      liveNodeMap.forEach(
        (nextDataNode) => nextDataNode.get("parentNodeId") === node.nodeId && node.childNodes.add(
          buildTree(new _a(
            nextDataNode.get("type"),
            node,
            nextDataNode
          ))
        )
      );
      return node;
    };
    _a.root = buildTree(new _a("root", null));
  })(), _a;
};

// src/environments/shared/oop/initializeRuntimeGraph.ts
import { createRoomContext as createRoomContext2 } from "@liveblocks/react";
var initializeRuntimeGraph = async (roomId, NodeIndex, createClientProps, liveblocksPresence) => {
  const liveblocksClient = createClient2(createClientProps);
  const room = liveblocksClient.enter(roomId, {
    initialPresence: liveblocksPresence,
    initialStorage: { nodeMap: new LiveMap() }
  });
  const { suspense: liveblocks } = createRoomContext2(liveblocksClient);
  const { root } = await room.getStorage();
  const liveNodeMap = root.get("nodeMap");
  const RuntimeNode = defineRuntimeNode(
    NodeIndex,
    liveNodeMap
  );
  return RuntimeNode;
};
export {
  createNodeEntry,
  initializeRuntimeGraph,
  liveblocksBrowserConfig
};
