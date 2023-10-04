// src/environments/shared/mutations/useMutationCreateNodeFactory.ts
import { LiveMap, LiveObject } from "@liveblocks/client";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
var useMutationCreateNodeFactory = (NodeIndex, NodeContext, useMutation) => () => {
  const [nodeCtx, updateNodeCtx] = useContext(NodeContext);
  return useMutation(({ storage }, type, state) => {
    const node = new LiveObject({
      nodeId: uuidv4(),
      parentNodeId: NodeIndex[type].parentType ? nodeCtx[NodeIndex[type].parentType] : null,
      type,
      parentType: NodeIndex[type].parentType,
      meta: {
        ...NodeIndex[type].meta,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      links: new LiveMap([]),
      state: new LiveObject({
        ...NodeIndex[type].state,
        ...state
      })
    });
    const nodeId = node.get("nodeId");
    storage.get("nodeMap").set(nodeId, node);
    if (!!NodeIndex[type].parentType)
      return nodeId;
    const parentNode = storage.get("nodeMap").get(node.get("parentNodeId"));
    parentNode.get("links").set(type, [
      .../* @__PURE__ */ new Set([...parentNode.get("links").get(type), nodeId])
    ]);
    updateNodeCtx((nodeCtx2) => {
      nodeCtx2[type] = nodeId;
    });
    return nodeId;
  }, []);
};

// src/environments/shared/mutations/useMutationDeleteNodeFactory.ts
import { useContext as useContext2 } from "react";
var useMutationDeleteNodeFactory = (NodeContext, useMutation) => () => {
  const [nodeCtx, updateNodeCtx] = useContext2(NodeContext);
  return useMutation(({ storage }, nodeType) => {
    const nodeToDelete = storage.get("nodeMap").get(nodeCtx[nodeType]);
    const typesToClear = [...nodeToDelete.get("links").entries()].filter(([_, nodeIds]) => nodeIds.length > 0).map(([type, _]) => type);
    const deletionVisitor = (node) => {
      const links = node.get("links").toImmutable();
      [...links].forEach(([_, nodeIds]) => {
        nodeIds.forEach((nodeId) => {
          const linkNode = storage.get("nodeMap").get(nodeId);
          if (!linkNode)
            return;
          if (linkNode.get("links").toImmutable().size === 0) {
            storage.get("nodeMap").delete(nodeId);
            return;
          }
          deletionVisitor(linkNode);
          storage.get("nodeMap").delete(nodeId);
        });
      });
    };
    deletionVisitor(nodeToDelete);
    updateNodeCtx((nodeCtx2) => {
      nodeCtx2[nodeType] = null;
      typesToClear.forEach((type) => {
        nodeCtx2[type] = null;
      });
    });
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
import { useContext as useContext3 } from "react";
var useStorageGetNodeMapFactory = (NodeContext, useStorage) => (nodeFilter) => {
  const nodeContext = useContext3(NodeContext);
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
import { createContext, useContext as useContext4 } from "react";
import { useImmer } from "use-immer";
import { jsx } from "react/jsx-runtime";
var NodeContextFactory = (useNodeState) => {
  const NodeContext = createContext([{}, () => console.log("No initial context set!. This is the default context function running")]);
  return {
    NodeContext,
    NodeContextProvider: ({
      contextValue,
      children
    }) => {
      const nodeContext = useImmer(contextValue);
      return /* @__PURE__ */ jsx(NodeContext.Provider, { value: nodeContext, children });
    },
    useNodeContext: (nodeType) => {
      const [nodeCtx, updateNodeCtx] = useContext4(NodeContext);
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
      const nodeId = useContext4(NodeContext)[0][nodeType];
      return useNodeState(nodeId, stateKey);
    }
  };
};

// src/environments/shared/customLiveHooksFactory.ts
var customLiveHooksFactory = (NodeIndex, useStorage, useMutation) => {
  const useMutationUpdateNode = useMutationUpdateNodeFactory(useMutation);
  const useStorageGetNode = useStorageGetNodeFactory(useStorage);
  const useNodeState = useNodeStateFactory(useStorageGetNode, useMutationUpdateNode);
  const {
    NodeContext,
    NodeContextProvider,
    useNodeContext,
    useNodeStateContext
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
      NodeIndex,
      NodeContext,
      useMutation
    ),
    useMutationUpdateNode,
    useMutationDeleteNode: useMutationDeleteNodeFactory(
      NodeContext,
      useMutation
    ),
    // Nodes -- Combined
    useNodeState,
    // Context
    NodeContext,
    NodeContextProvider,
    useNodeContext,
    useNodeStateContext
  };
};

export {
  customLiveHooksFactory
};
