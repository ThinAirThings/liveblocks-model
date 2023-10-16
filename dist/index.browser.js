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

// src/environments/shared/oop/LiveTreeBrowserConfig.tsx
import { createContext, useContext, useEffect, useState } from "react";

// src/environments/shared/oop/initializeLiveTree.ts
import { LiveMap, createClient as createClient2 } from "@liveblocks/client";

// src/environments/shared/oop/ClassOfLiveTreeNodeFactory.ts
import { LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
var ClassOfLiveTreeNodeFactory = (NodeIndex, useStorage, liveNodeMap) => {
  var _a;
  return _a = class {
    //    ___             _               _           
    //   / __|___ _ _  __| |_ _ _ _  _ __| |_ ___ _ _ 
    //  | (__/ _ \ ' \(_-<  _| '_| || / _|  _/ _ \ '_|
    //   \___\___/_||_/__/\__|_|  \_,_\__|\__\___/_|  
    constructor(type, parentNode, liveDataNode) {
      this.childNodes = /* @__PURE__ */ new Set();
      //   __  __     _   _            _    
      //  |  \/  |___| |_| |_  ___  __| |___
      //  | |\/| / -_)  _| ' \/ _ \/ _` (_-<
      //  |_|  |_\___|\__|_||_\___/\__,_/__/
      this.update = (key, value) => {
        this.state.set(key, value);
      };
      this.useValue = (key) => useStorage(({ nodeMap }) => nodeMap.get(this.nodeId)?.state[key]);
      if (liveDataNode) {
        this.liveDataNode = liveDataNode;
      } else {
        this.liveDataNode = new LiveObject({
          nodeId: uuidv4(),
          parentNodeId: parentNode?.nodeId ?? null,
          type,
          metadata: { ...NodeIndex[type].metadata, createdAt: (/* @__PURE__ */ new Date()).toISOString() },
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
    get metadata() {
      return this.liveDataNode.get("metadata");
    }
    get parentType() {
      return this.liveDataNode.get("parentType");
    }
  }, //   ___ _        _   _    
  //  / __| |_ __ _| |_(_)__ 
  //  \__ \  _/ _` |  _| / _|
  //  |___/\__\__,_|\__|_\__|
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

// src/environments/shared/oop/initializeLiveTree.ts
import { createRoomContext as createRoomContext2 } from "@liveblocks/react";
var initializeLiveTree = async (roomId, NodeIndex, createClientProps, liveblocksPresence) => {
  const liveblocksClient = createClient2(createClientProps);
  const room = liveblocksClient.enter(roomId, {
    initialPresence: liveblocksPresence,
    initialStorage: { nodeMap: new LiveMap() }
  });
  const { suspense: liveblocks } = createRoomContext2(liveblocksClient);
  const { root } = await room.getStorage();
  const liveNodeMap = root.get("nodeMap");
  const LiveTreeNode = ClassOfLiveTreeNodeFactory(
    NodeIndex,
    liveblocks.useStorage,
    liveNodeMap
  );
  return LiveTreeNode;
};

// src/environments/shared/oop/LiveTreeBrowserConfig.tsx
import { Fragment, jsx as jsx2 } from "react/jsx-runtime";
var LiveTreeBrowserConfig = (NodeIndex, liveblocksPresence) => {
  const LiveTreeNodeRootContext = createContext(null);
  const useLiveTreeNodeRoot = () => useContext(LiveTreeNodeRootContext);
  const LiveTreeNodeRootProvider = ({
    roomId,
    createClientProps,
    children
  }) => {
    const [LiveTreeNodeRoot, setLiveTreeNodeRoot] = useState(null);
    useEffect(() => {
      (async () => {
        const LiveTreeNode = await initializeLiveTree(
          roomId,
          NodeIndex,
          createClientProps,
          liveblocksPresence
        );
        setLiveTreeNodeRoot(LiveTreeNode.root);
      })();
    }, []);
    return /* @__PURE__ */ jsx2(Fragment, { children: LiveTreeNodeRoot && /* @__PURE__ */ jsx2(LiveTreeNodeRootContext.Provider, { value: LiveTreeNodeRoot, children }) });
  };
  return {
    LiveTreeNodeRootProvider,
    useLiveTreeNodeRoot
  };
};
export {
  ClassOfLiveTreeNodeFactory,
  LiveTreeBrowserConfig,
  createNodeEntry,
  liveblocksBrowserConfig
};
