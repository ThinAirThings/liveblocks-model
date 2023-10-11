// src/model/data-model.ts
var createNodeEntry = ({
  nodeMeta,
  state,
  stateDisplayKey
}) => ({
  nodeMeta,
  state,
  stateDisplayKey
});
var createNodeIndexFactory = (index) => Object.entries(index.map(([type, entry]) => [type, entry]));

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
    return storage.nodeMap.get(nodeId)?.state?.[stateKey];
  });
  const mutation = useMutation(({ storage }, value) => {
    storage.get("nodeMap").get(nodeId)?.get("state").set(stateKey, value);
  }, [nodeId, stateKey]);
  return [nodeState, mutation];
};

// src/environments/shared/hooks/useDeleteNodeFactory.ts
var useDeleteNodeFactory = (useMutation) => () => {
  return useMutation(({ storage }, nodeId) => {
    const liveNodeMap = storage.get("nodeMap");
    const nodeMap = liveNodeMap.toImmutable();
    const chainDelete = (targetNodeId) => {
      liveNodeMap.delete(targetNodeId);
      const next = [...nodeMap].filter(([_, node]) => node.parentNodeId === targetNodeId);
      next.forEach(([nodeId2]) => chainDelete(nodeId2));
    };
    chainDelete(nodeId);
  }, []);
};

// src/environments/shared/hooks/useNodeMapFactory.ts
import isEqual from "lodash.isequal";
var useNodeMapFactory = (useStorage) => (nodeFilter) => {
  return useStorage((root) => {
    return nodeFilter ? new Map([...root.nodeMap].filter(nodeFilter)) : root.nodeMap;
  }, (a, b) => isEqual(a, b));
};

// src/environments/shared/hooks/useNodeNameStateFactory.ts
var useNodeNameStateFactory = (useStorage, useMutation) => (nodeId) => {
  const nodeState = useStorage((storage) => {
    const node = storage.nodeMap.get(nodeId);
    return node.state[node.stateDisplayKey];
  });
  const mutation = useMutation(({ storage }, value) => {
    const node = storage.get("nodeMap").get(nodeId);
    node.get("state").set(node.get("stateDisplayKey"), value);
  }, []);
  return [nodeState, mutation];
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (NodeIndex, useStorage, useMutation) => {
  return {
    // Meta
    // useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    // Nodes -- Mutation
    useNodeMap: useNodeMapFactory(
      useStorage
    ),
    useCreateNode: useCreateNodeFactory(
      NodeIndex,
      useMutation
    ),
    useNodeState: useNodeStateFactory(
      useStorage,
      useMutation
    ),
    useNodeNameState: useNodeNameStateFactory(
      useStorage,
      useMutation
    ),
    useDeleteNode: useDeleteNodeFactory(
      useMutation
    )
  };
};

export {
  createNodeEntry,
  createNodeIndexFactory,
  customLiveHooksFactory
};
