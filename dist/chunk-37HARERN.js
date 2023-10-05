// src/environments/shared/mutations/useMutationCreateNodeFactory.ts
import { LiveList, LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
var useMutationCreateNodeFactory = (NodeIndex, useMutation) => () => {
  return useMutation(({ storage }, nodePath, type, state) => {
    const parentNodeId = nodePath[nodePath.length - 1] ?? null;
    const node = new LiveObject({
      nodeId: uuidv4(),
      parentNodeId,
      type,
      meta: {
        ...NodeIndex[type].meta,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      children: new LiveList([]),
      stateDisplayKey: NodeIndex[type].stateDisplayKey,
      state: new LiveObject({
        ...NodeIndex[type].state,
        ...state
      })
    });
    const nodeId = node.get("nodeId");
    storage.get("nodeMap").set(nodeId, node);
    if (!parentNodeId)
      return nodeId;
    const parentNode = storage.get("nodeMap").get(parentNodeId);
    parentNode.get("children").push(nodeId);
    return nodeId;
  }, []);
};

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
var useMutationDeleteNodeFactory = (useMutation) => () => {
  return useMutation(({ storage }, nodeId) => {
    const liveNodeMap = storage.get("nodeMap");
    const nodeToDelete = liveNodeMap.get(nodeId);
    const deletionVisitor = (node) => {
      const children = node.get("children").toImmutable();
      children.forEach((childId) => {
        const child = liveNodeMap.get(childId);
        deletionVisitor(child);
        liveNodeMap.delete(childId);
      });
    };
    deletionVisitor(nodeToDelete);
    liveNodeMap.delete(nodeId);
  }, []);
};

// src/environments/shared/mutations/useMutationUpdateNodeFactory.ts
var useMutationUpdateNodeFactory = (useMutation) => () => useMutation(({ storage }, nodeId, updater) => {
  const nodeState = storage.get("nodeMap").get(nodeId).get("state");
  updater(nodeState);
}, []);

// src/environments/shared/storage/useStorageGetNodeFactory.ts
import isEqual from "lodash.isequal";
var useStorageGetNodeFactory = (useStorage) => (nodeId, selector) => {
  return useStorage(
    (root) => {
      const nodeState = root.nodeMap.get(nodeId)?.state;
      return nodeState ? selector(nodeState) : null;
    },
    (a, b) => isEqual(a, b)
  );
};

// src/environments/shared/storage/useStorageGetNodeMapFactory.ts
var useStorageGetNodeMapFactory = (useStorage) => (nodeFilter) => {
  return useStorage((root) => {
    return nodeFilter ? new Map([...root.nodeMap].filter(nodeFilter)) : root.nodeMap;
  });
};

// src/environments/shared/storage/useStorageGetMetaFactory.ts
var useStorageGetMetaFactory = (useStorage) => () => useStorage((root) => root.meta);

// src/environments/shared/mutations/useMutationUpdateMetaFactory.ts
var useMutationUpdateMetaFactory = (useMutation) => () => useMutation(({ storage }, updater) => {
  updater(storage.get("meta"));
}, []);

// src/environments/shared/combined/useNodeStateFactory.ts
var useNodeStateFactory = (useStorageGetNode, useMutationUpdateNode) => (nodeId, key) => {
  const nodeValue = useStorageGetNode(nodeId, (nodeState) => nodeState[key]);
  const updateNode = useMutationUpdateNode();
  return [
    nodeValue,
    (newValue) => updateNode(nodeId, (liveNodeState) => {
      liveNodeState.set(key, newValue);
    })
  ];
};

// src/environments/shared/combined/useNodePathStateFactory.ts
var useNodePathStateFactory = (useStorage, useNodeState) => (nodePath, nodeType, stateKey) => {
  const targetNodeId = useStorage((root) => {
    return nodePath.find((nodeId) => {
      return root.nodeMap.get(nodeId)?.type === nodeType;
    });
  });
  if (!targetNodeId)
    throw new Error(`No node of type ${nodeType} found in nodepath`);
  return useNodeState(targetNodeId, stateKey);
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (NodeIndex, useStorage, useMutation) => {
  const useMutationUpdateNode = useMutationUpdateNodeFactory(useMutation);
  const useStorageGetNode = useStorageGetNodeFactory(useStorage);
  const useNodeState = useNodeStateFactory(useStorageGetNode, useMutationUpdateNode);
  return {
    // Meta
    useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    useMutationUpdateMeta: useMutationUpdateMetaFactory(useMutation),
    // Nodes -- Storage
    useStorageGetNodeMap: useStorageGetNodeMapFactory(
      useStorage
    ),
    useStorageGetNode,
    // Nodes -- Mutation
    useMutationCreateNode: useMutationCreateNodeFactory(
      NodeIndex,
      useMutation
    ),
    useMutationUpdateNode,
    useMutationDeleteNode: useMutationDeleteNodeFactory(
      useMutation
    ),
    // Nodes -- Combined
    useNodeState,
    useNodePathState: useNodePathStateFactory(
      useStorage,
      useNodeState
    )
  };
};

export {
  customLiveHooksFactory
};
