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

// src/environments/shared/filesystem/configureLiveFilesystemStorage.tsx
import { LiveMap as LiveMap4, createClient as createClient2 } from "@liveblocks/client";
import { createRoomContext as createRoomContext2 } from "@liveblocks/react";
import { createContext, useContext, useEffect, useState } from "react";

// src/environments/shared/filesystem/UixNode/UixNode.ts
import { LiveMap as LiveMap2, LiveObject as LiveObject2 } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";

// src/environments/shared/filesystem/LiveObjects/LiveIndexNode.ts
import { LiveObject } from "@liveblocks/client";
var LiveIndexNode = class extends LiveObject {
  constructor(data) {
    super(data);
  }
};

// src/environments/shared/filesystem/UixNode/UixNode.ts
import { useSyncExternalStore } from "react";
import { produce } from "immer";
var UixNode = class {
  constructor(liveIndexRoom, liveNodeMap, parentNode, nodeId, nodeTemplate) {
    this.liveIndexRoom = liveIndexRoom;
    this.liveNodeMap = liveNodeMap;
    this.parentNode = parentNode;
    this.nodeTemplate = nodeTemplate;
    this.childTypeIsKey = (childType) => this.childTemplatesMap.has(childType);
    this.useChildNodeTypeMap = (childType) => useSyncExternalStore((callback) => {
      const unsubscribe = this.liveIndexRoom.subscribe(this.liveNodeMap.get(this.liveIndexNode.get("nodeId")), callback);
      return () => unsubscribe();
    }, () => {
      if (!this.childTypeIsKey(childType))
        throw new Error(`Child type ${childType} does not exist on node type ${this.nodeTemplate.customType}`);
      return produce(this.baseStateChildNodeTypeMaps.get(childType), (draft) => {
        const liveNodeIds = /* @__PURE__ */ new Set([...this.liveIndexNode.get("childNodeIds").keys()]);
        const draftNodeIds = new Set([...draft].map(([nodeId]) => nodeId));
        draftNodeIds.forEach((nodeId) => !liveNodeIds.has(nodeId) && draft.delete(nodeId));
        liveNodeIds.forEach(
          (liveNodeId) => !draftNodeIds.has(liveNodeId) && draft.set(liveNodeId, this.childNodeTypeMaps.get(childType).get(liveNodeId))
        );
      });
    });
    this.liveIndexNode = this.liveNodeMap.get(nodeId);
    this.childTemplatesMap = new Map(Object.entries(nodeTemplate.childTemplates));
    this.childNodeTypeMaps = new Map(
      [...this.childTemplatesMap].map(
        ([childType, childTemplate]) => [childType, new Map([...this.liveIndexNode.get("childNodeIds")].map(
          ([nodeId2]) => [nodeId2, new childTemplate.Constructor(
            liveIndexRoom,
            liveNodeMap,
            this,
            nodeId2,
            childTemplate
          )]
        ))]
      )
    );
    this.baseStateChildNodeTypeMaps = new Map(
      [...this.childNodeTypeMaps].map(
        ([childType, childNodeTypeMap]) => [childType, new Map([...childNodeTypeMap])]
      )
    );
  }
  get nodeId() {
    return this.liveIndexNode.get("nodeId");
  }
  get uixNodeType() {
    return this.liveIndexNode.get("uixNodeType");
  }
  // These should be type declared in the Subtype
  get state() {
    return this.liveIndexNode.get("state");
  }
  get customType() {
    return this.liveIndexNode.get("customType");
  }
  get metadata() {
    return this.liveIndexNode.get("metadata");
  }
  createChild(childType) {
    if (!this.childTypeIsKey(childType))
      throw new Error(`Child type ${childType} does not exist on node type ${this.nodeTemplate.customType}`);
    const childTemplate = this.childTemplatesMap.get(childType);
    const newLiveIndexNode = new LiveIndexNode({
      nodeId: uuidv4(),
      metadata: {
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      uixNodeType: childTemplate.Constructor.nodeType,
      customType: childType,
      parentNodeId: this.nodeId,
      parentType: this.customType,
      childNodeIds: new LiveMap2(),
      stateDisplayKey: "",
      // Deal with this later,
      state: new LiveObject2({
        ...childTemplate.initialState
      })
    });
    this.liveNodeMap.set(newLiveIndexNode.get("nodeId"), newLiveIndexNode);
    this.liveIndexNode.get("childNodeIds").set(newLiveIndexNode.get("nodeId"), null);
    const newUixNode = new childTemplate.Constructor(
      this.liveIndexRoom,
      this.liveNodeMap,
      this,
      newLiveIndexNode.get("nodeId"),
      childTemplate
    );
    this.childNodeTypeMaps.get(childType).set(newUixNode.nodeId, newUixNode);
    return newUixNode;
  }
  delete() {
    const deleteUixNode = (uixNode) => {
      this.liveNodeMap.delete(uixNode.nodeId);
      uixNode.childNodeTypeMaps.forEach((typeMap) => {
        typeMap.forEach((uixNode2) => {
          deleteUixNode(uixNode2);
        });
      });
      this.childTemplatesMap.forEach((template) => {
        uixNode.childNodeTypeMaps.get(template.customType).forEach((uixNode2) => {
          deleteUixNode(uixNode2);
        });
      });
    };
    deleteUixNode(this);
    this.parentNode && this.parentNode.childNodeTypeMaps.get(this.customType).delete(this.nodeId) && this.parentNode.liveIndexNode.get("childNodeIds").delete(this.nodeId);
  }
};

// src/environments/shared/filesystem/RootNode/RootNode.ts
var RootNode = class extends UixNode {
  constructor(liveIndexRoom, liveNodeMap, rootNodeTemplate) {
    super(
      liveIndexRoom,
      liveNodeMap,
      null,
      "root",
      rootNodeTemplate
    );
  }
  useStorage(key) {
    throw new Error("Method not implemented.");
  }
  mutateStorage(key, value) {
    throw new Error("Method not implemented.");
  }
};
RootNode.nodeType = "RootNode";

// src/environments/shared/filesystem/LiveObjects/LiveIndexRootNode.ts
import { LiveMap as LiveMap3, LiveObject as LiveObject3 } from "@liveblocks/client";
var LiveIndexRootNode = class extends LiveIndexNode {
  constructor() {
    super({
      nodeId: "root",
      metadata: {},
      uixNodeType: "Root",
      customType: "Root",
      parentNodeId: null,
      parentType: null,
      stateDisplayKey: "root",
      state: new LiveObject3({}),
      childNodeIds: new LiveMap3([])
    });
  }
};

// src/environments/shared/filesystem/configureLiveFilesystemStorage.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var configureLiveFilesystemStorage = (liveblocksPresence, createClientProps, rootNodeTemplate) => {
  const liveblocksClient = createClient2(createClientProps);
  const { suspense: liveblocks } = createRoomContext2(liveblocksClient);
  const FilesystemRootNodeContext = createContext(null);
  const useLiveFilesystemRootNode = () => useContext(FilesystemRootNodeContext);
  const LiveFilesystemRootNodeProvider = ({
    roomId,
    children
  }) => {
    const [filesystemRootNode, setFilesystemRootNode] = useState(null);
    useEffect(() => {
      (async () => {
        const room = liveblocksClient.enter(roomId, {
          initialPresence: liveblocksPresence,
          initialStorage: {
            liveNodeMap: new LiveMap4([[
              "root",
              new LiveIndexRootNode()
            ]])
          }
        });
        const nodeMap = (await room.getStorage()).root.get("liveNodeMap");
        setFilesystemRootNode(new RootNode(
          room,
          nodeMap,
          rootNodeTemplate
        ));
      })();
    }, []);
    return /* @__PURE__ */ jsx2(
      liveblocks.RoomProvider,
      {
        id: roomId,
        initialPresence: liveblocksPresence,
        initialStorage: { liveNodeMap: new LiveMap4([[
          "root",
          new LiveIndexRootNode()
        ]]) },
        children: filesystemRootNode && /* @__PURE__ */ jsx2(FilesystemRootNodeContext.Provider, { value: filesystemRootNode, children })
      }
    );
  };
  return {
    LiveFilesystemRootNodeProvider,
    useLiveFilesystemRootNode
  };
};

// src/environments/shared/filesystem/UixNode/createUixNodeTemplate.ts
var createUixNodeTemplate = (customType, UixNodeConstructor, props, childTemplates) => {
  return {
    customType,
    Constructor: UixNodeConstructor,
    metadata: props.metadata,
    childTemplates: childTemplates ?? {}
  };
};

// src/environments/shared/filesystem/RootNode/createRootNodeTemplate.ts
var createRootNodeTemplate = (childTemplates) => createUixNodeTemplate("root", RootNode, {
  metadata: {}
}, childTemplates);

// src/environments/shared/filesystem/SimpleStateNode/SimpleStateNode.ts
import { useSyncExternalStore as useSyncExternalStore2 } from "react";
import isEqual from "lodash.isequal";
var SimpleStateNode = class extends UixNode {
  constructor(...args) {
    const [liveIndexRoom, liveNodeMap, parentNode, nodeId, nodeTemplate] = args;
    super(liveIndexRoom, liveNodeMap, parentNode, nodeId, {
      ...nodeTemplate
    });
    this.initialState = this.state.toImmutable();
    this.lastStorageValues = this.state.toImmutable();
  }
  mutateStorage(key, value) {
    this.liveIndexNode.get("state").set(key, value);
  }
  useStorage(key) {
    return useSyncExternalStore2((callback) => {
      const unsubscribe = this.liveIndexRoom.subscribe(this.liveIndexNode.get("state"), callback);
      return () => unsubscribe();
    }, () => {
      const newValue = this.liveIndexNode.get("state").toImmutable()[key];
      return isEqual(this.lastStorageValues[key], newValue) ? this.lastStorageValues[key] : this.lastStorageValues[key] = newValue;
    });
  }
};
SimpleStateNode.nodeType = "SimpleStateNode";

// src/environments/shared/filesystem/SimpleStateNode/createSimpleStateNodeTemplate.ts
var createSimpleStateNodeTemplate = (customType, config, childTemplates) => createUixNodeTemplate(customType, SimpleStateNode, {
  metadata: config.metadata,
  initialState: config.state
}, childTemplates ?? {});
export {
  UixNode,
  configureLiveFilesystemStorage,
  createNodeEntry,
  createRootNodeTemplate,
  createSimpleStateNodeTemplate,
  liveblocksBrowserConfig
};
