// src/environments/shared/hooks/useCreateNodeFactory.ts
import { LiveList, LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
var useCreateNodeFactory = (NodeIndex, useMutation) => () => {
  return useMutation(({ storage }, parentNodeId, type, state) => {
    const nodeId = uuidv4();
    const node = new LiveObject({
      nodeId,
      parentNodeId,
      type,
      nodeMeta: {
        ...NodeIndex[type].nodeMeta,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      children: new LiveList([]),
      stateDisplayKey: NodeIndex[type].stateDisplayKey,
      state: new LiveObject({
        ...NodeIndex[type].state,
        ...state
      })
    });
    storage.get("nodeMap").set(nodeId, node);
    return nodeId;
  }, []);
};

// src/environments/shared/hooks/useNodeStateFactory.ts
var useNodeStateFactory = (useStorage, useMutation) => (nodeId, _nodeType, stateKey) => {
  const nodeState = useStorage((storage) => {
    return storage.nodeMap.get(nodeId).state[stateKey];
  });
  const mutation = useMutation(({ storage }, value) => {
    storage.get("nodeMap").get(nodeId).get("state").set(stateKey, value);
  }, []);
  return [nodeState, mutation];
};

// src/environments/shared/hooks/useDeleteNodeFactory.ts
var useDeleteNodeFactory = (useMutation) => {
  return useMutation(({ storage }, nodeId) => {
    storage.get("nodeMap").delete(nodeId);
  }, []);
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (NodeIndex, useStorage, useMutation) => {
  return {
    // Meta
    // useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    // Nodes -- Mutation
    useCreateNode: useCreateNodeFactory(
      NodeIndex,
      useMutation
    ),
    useNodeState: useNodeStateFactory(
      useStorage,
      useMutation
    ),
    useDeleteNode: useDeleteNodeFactory(
      useMutation
    )
  };
};

export {
  customLiveHooksFactory
};
