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
    return {
      ...node.toImmutable(),
      state: void 0
    };
  }, []);
};

// src/environments/shared/hooks/useNodeStateFactory.ts
var useNodeStateFactory = (useStorage, useMutation, useNodeIdFromTreeClimb) => (nodeId, nodeType, stateKey) => {
  const targetNodeId = useNodeIdFromTreeClimb(nodeId, nodeType);
  const nodeState = useStorage((storage) => {
    return storage.nodeMap.get(targetNodeId)?.state?.[stateKey];
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

// src/environments/shared/hooks/useNodeIdFromTreeClimbFactory.ts
var useNodeIdFromTreeClimbFactory = (useStorage) => (nodeId, nodeType) => {
  const targetNodeId = useStorage(({ nodeMap }) => {
    const climbForTargetNode = (nodeId2) => {
      const node = nodeMap.get(nodeId2);
      if (!node)
        return null;
      if (node.type === nodeType) {
        return nodeId2;
      }
      if (node.parentNodeId === null) {
        return null;
      }
      return climbForTargetNode(node.parentNodeId);
    };
    return climbForTargetNode(nodeId);
  });
  if (!targetNodeId) {
    throw new Error(`Node of type ${nodeType} not found in tree climb`);
  }
  return targetNodeId;
};

// src/environments/shared/hooks/useStatelessNodeMapFactory.ts
import isEqual2 from "lodash.isequal";
var useStatelessNodeMapFactory = (useStorage) => (nodeFilter) => {
  return useStorage((root) => {
    return nodeFilter ? new Map(
      [...root.nodeMap].filter(nodeFilter).map(([nodeId, node]) => [nodeId, {
        nodeId: node.nodeId,
        parentNodeId: node.parentNodeId,
        type: node.type,
        nodeMeta: node.nodeMeta,
        stateDisplayKey: node.stateDisplayKey
      }])
    ) : new Map(
      [...root.nodeMap].map(([nodeId, node]) => [nodeId, {
        nodeId: node.nodeId,
        parentNodeId: node.parentNodeId,
        type: node.type,
        nodeMeta: node.nodeMeta,
        stateDisplayKey: node.stateDisplayKey
      }])
    );
  }, (a, b) => isEqual2(a, b));
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (NodeIndex, useStorage, useMutation) => {
  const useNodeIdFromTreeClimb = useNodeIdFromTreeClimbFactory(useStorage);
  return {
    // Meta
    // useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    // Nodes -- Mutation
    useNodeMap: useNodeMapFactory(
      useStorage
    ),
    useStatelessNodeMap: useStatelessNodeMapFactory(
      useStorage
    ),
    useNodeIdFromTreeClimb,
    useCreateNode: useCreateNodeFactory(
      NodeIndex,
      useMutation
    ),
    useNodeState: useNodeStateFactory(
      useStorage,
      useMutation,
      useNodeIdFromTreeClimb
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
  customLiveHooksFactory
};
