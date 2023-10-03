// src/environments/shared/createLiveAirNodeFactory.ts
import { LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
var createLiveAirNodeFactory = () => (type, {
  state,
  meta
}) => {
  return new LiveObject({
    nodeId: uuidv4(),
    type,
    meta: {
      ...meta,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    state: new LiveObject({
      ...state
    })
  });
};

// src/environments/shared/mutations/useMutationCreateNodeFactory.ts
var useMutationCreateNodeFactory = (useMutation, createLiveAirNode) => () => useMutation(({ storage }, type, { meta, state }) => {
  const node = createLiveAirNode(type, { meta, state });
  const nodeId = node.get("nodeId");
  storage.get("nodeMap").set(nodeId, node);
  return nodeId;
}, []);

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
var useMutationDeleteNodeFactory = (useMutation) => () => useMutation(({ storage }, nodeId) => {
  storage.get("nodeMap").delete(nodeId);
}, []);

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
import { useContext } from "react";
var useStorageGetNodeMapFactory = (NodeContext, useStorage) => (nodeFilter) => {
  const nodeContext = useContext(NodeContext);
  return useStorage((root) => {
    return nodeFilter ? new Map([...root.nodeMap].filter((p1, p2, p3) => nodeFilter(
      nodeContext[0],
      p1,
      p2,
      p3
    ))) : root.nodeMap;
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

// src/environments/shared/context/NodeContextFactory.tsx
import { createContext, useContext as useContext2, useMemo } from "react";
import { useImmer } from "use-immer";
import { jsx } from "react/jsx-runtime";
var NodeContextFactory = (useNodeState) => {
  const NodeContext = createContext([{}, () => {
  }]);
  return {
    NodeContext,
    NodeContextProvider: ({
      children
    }) => {
      const [contextValue] = useContext2(NodeContext);
      const nodeContext = useImmer(contextValue);
      return useMemo(() => /* @__PURE__ */ jsx(NodeContext.Provider, { value: nodeContext, children }), [contextValue, children]);
    },
    useNodeContext: (nodeType) => {
      const [nodeCtx, updateNodeCtx] = useContext2(NodeContext);
      return [
        nodeCtx[nodeType],
        (newNodeId) => {
          updateNodeCtx((draft) => {
            draft[nodeType] = newNodeId;
          });
        }
      ];
    },
    useNodeStateContext: (nodeType, stateKey) => {
      const nodeId = useContext2(NodeContext)[0][nodeType];
      return useNodeState(nodeId, stateKey);
    }
  };
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (useStorage, useMutation, createLiveAirNode) => {
  const useMutationUpdateNode = useMutationUpdateNodeFactory(useMutation);
  const useStorageGetNode = useStorageGetNodeFactory(useStorage);
  const useNodeState = useNodeStateFactory(useStorageGetNode, useMutationUpdateNode);
  const {
    NodeContext,
    useNodeStateContext,
    NodeContextProvider
  } = NodeContextFactory(useNodeState);
  return {
    // Meta
    useStorageGetMeta: useStorageGetMetaFactory(useStorage),
    useMutationUpdateMeta: useMutationUpdateMetaFactory(useMutation),
    // Nodes -- Storage
    useStorageGetNodeMap: useStorageGetNodeMapFactory(
      NodeContext,
      useStorage
    ),
    useStorageGetNode,
    // Nodes -- Mutation
    useMutationCreateNode: useMutationCreateNodeFactory(
      useMutation,
      createLiveAirNode
    ),
    useMutationUpdateNode,
    useMutationDeleteNode: useMutationDeleteNodeFactory(useMutation),
    // Nodes -- Combined
    useNodeState,
    // Context
    NodeContext,
    useNodeStateContext,
    NodeContextProvider
  };
};

export {
  createLiveAirNodeFactory,
  customLiveHooksFactory
};
